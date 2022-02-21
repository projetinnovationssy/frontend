import React from "react";
import VideoGalleryStyle from "./VideoGalleryStyle.module.css"
import VideoGrid from "./VideoGrid";
import VIdeoItem from "./VIdeoItem";
import EmptyList from "../EmptyList"
import Spinner from "../Spinner";
import Player from "../Player/Player";
import PopUp from "../PopUp/PopUp";



class PublicVideoList extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            videoList: null,
            popUp: false,
            currentVideoId: null
        }
        
        this.onPopUpClose = this.onPopUpClose.bind(this)
        this.onVideoClick = this.onVideoClick.bind(this)
        this.getId = this.getId.bind(this)
        this.httpclient = this.props.httpclient

    }
    getId(index){
        let list = this.state.videoList
        return list[index].id
    }
    onPopUpClose() {
        this.setState({ popUp: false })

    }

    onVideoClick(currentVideoId) {
        this.setState({ popUp: true, currentVideoId })
    }

    componentDidMount(){
        this.httpclient.getPublicList((videoList)=>this.setState({videoList}))
    }

    render(){
        if(this.state.videoList == null)
            return <div className={VideoGalleryStyle.spinnerContainer}>
                    <Spinner/>
                </div>
        if (this.state.videoList.length != 0) {
            return <React.StrictMode>
                {this.state.popUp ? <PopUp>
                    <Player src = {this.httpclient.getVideoStreamURL(this.state.currentVideoId)} onClose = {this.onPopUpClose}/>
                </PopUp> : null}
                <div className={VideoGalleryStyle.title}>Public Videos</div>
                <VideoGrid >
                    {this.state.videoList.map((value, index)=>(
                        <VIdeoItem 
                            videoObj = {value} 
                            key = {index} 
                            onClick={()=>this.onVideoClick(this.getId(index))}
                            httpclient = {this.props.httpclient} />
                    ))}
                </VideoGrid>
            </React.StrictMode>
        }else return <EmptyList 
                title = "There is no public videos!"
                description = "public videos are not available at the moment!" />
    }

}


export default PublicVideoList;