import React from "react";
import CoreBoxstyles from "./CoreBox.module.css"
import axios from "axios";
import VideoGrid from "./VideoGrid";
import VIdeoItem from "./VIdeoItem";
import EmptyList from "./EmptyList"
import Spinner from "./Spinner";
import Player from "./Player/Player";
import PopUp from "./PopUp";

class PublicVideoList extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            videoList: null,
            popUp: false,
            videoId: null
        }
        this.url = "http://localhost:8080/api/video/get/public/all"
        this.getPublicList = this.getPublicList.bind(this)
        this.onPopUpClose = this.onPopUpClose.bind(this)

    }

    onPopUpClose() {
        this.setState({ popUp: false })

    }

    onVideoClick(videoId) {
        this.setState({ popUp: true, videoId })
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
            return <div className={CoreBoxstyles.spinnerContainer}>
                    <Spinner/>
                </div>
        if (this.state.videoList.length != 0) {
            return <React.StrictMode>
                {this.state.popUp ? <PopUp>
                    <Player src ="video.mp4" onClose = {this.onPopUpClose}/>
                </PopUp> : null}
                <div className={CoreBoxstyles.title}>Public Videos</div>
                <VideoGrid >
                    {this.state.videoList.map((value, index)=>(
                        <VIdeoItem videoObj = {value} key = {index} onClick={()=>this.onVideoClick(1)}/>
                    ))}
                </VideoGrid>
            </React.StrictMode>
        }else return <EmptyList 
                title = "There is no public videos!"
                description = "public videos are not available at the moment!" />
    }

}


export default PublicVideoList;