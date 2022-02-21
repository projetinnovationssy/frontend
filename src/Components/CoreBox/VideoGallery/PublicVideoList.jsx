import React from "react";
import VideoGalleryStyle from "./VideoGalleryStyle.module.css"
import axios from "axios";
import VideoGrid from "../VideoGrid";
import VIdeoItem from "../VIdeoItem";
import EmptyList from "../EmptyList"
import Spinner from "../Spinner";
import Player from "../Player/Player";
import PopUp from "../PopUp";

class PublicVideoList extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            videoList: null,
            popUp: false,
            currentVideoId: null
        }
        this.url = "http://localhost:8080/api/video/get/public/all"
        this.getPublicList = this.getPublicList.bind(this)
        this.onPopUpClose = this.onPopUpClose.bind(this)
        this.onVideoClick = this.onVideoClick.bind(this)
        this.getId = this.getId.bind(this)


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
        this.getPublicList()
    }


    getPublicList(){
        const token = localStorage.getItem("token");
        let conf = {
            headers:{
                'Authorization' : "Bearer " + token
            }
        }
        axios.post(this.url, conf)
        .then((response)=>{
            if (response.data != null){
                let videoList = response.data.obj
                this.setState({videoList})
            }
        })
        .catch((err)=>{
        })
    }

    render(){
        if(this.state.videoList == null)
            return <div className={VideoGalleryStyle.spinnerContainer}>
                    <Spinner/>
                </div>
        if (this.state.videoList.length != 0) {
            return <React.StrictMode>
                {this.state.popUp ? <PopUp>
                    <Player src = {"http://127.0.0.1:8080/api/video/stream?video_id=" + this.state.currentVideoId} onClose = {this.onPopUpClose}/>
                </PopUp> : null}
                <div className={VideoGalleryStyle.title}>Public Videos</div>
                <VideoGrid >
                    {this.state.videoList.map((value, index)=>(
                        <VIdeoItem videoObj = {value} key = {index} onClick={()=>this.onVideoClick(this.getId(index))}/>
                    ))}
                </VideoGrid>
            </React.StrictMode>
        }else return <EmptyList 
                title = "There is no public videos!"
                description = "public videos are not available at the moment!" />
    }

}


export default PublicVideoList;