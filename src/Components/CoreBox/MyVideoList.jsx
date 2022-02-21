import React from "react";
import CoreBoxstyles from "./CoreBox.module.css"
import axios from "axios";
import VideoGrid from "./VideoGrid";
import VIdeoItem from "./VIdeoItem";
import PopUp from "./PopUp";
import EmptyList from "./EmptyList"
import DeleteConfirmer from "./DeleteConfirmer";
import Uploader from "./Uploader";
import Spinner from "./Spinner";
import Player from "./Player/Player";
class MyVideoList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            popUp: null,
            videoList: null,
            currentVideoIndex: null
        }
        this.onPopUpClose = this.onPopUpClose.bind(this)
        this.url = "http://localhost:8080/api/video/get/user"
        this.getOwnList = this.getOwnList.bind(this)
        this.getPopUp = this.getPopUp.bind(this)
        this.onAddVideoClick = this.onAddVideoClick.bind(this)
        this.onVideoClick = this.onVideoClick.bind(this)
        this.onDeleteClick = this.onDeleteClick.bind(this)
        this.deleteFromState = this.deleteFromState.bind(this)
    }



    onAddVideoClick() {
        this.setState({ popUp: "uploader" })
    }

    onVideoClick(currentVideoId) {
        this.setState({ popUp: "player", currentVideoId })
    }

    getPopUp() {
        if (this.state.popUp == "uploader") {
            return <Uploader fileType="video" onClose={this.onPopUpClose} onUpload = {this.getOwnList }/>
        }
        if (this.state.popUp == "player") {
            return <Player src ="http://127.0.0.1:8080/api/video/stream?video_id=5" onClose = {this.onPopUpClose}/>
        }
        if(this.state.popUp == "deleter"){
            let video = this.state.videoList[this.state.currentVideoIndex]
            return <DeleteConfirmer onDelete = {this.deleteFromState}  currentVideo = {video} onCancel = {this.onPopUpClose}/>
        }
    }

    deleteFromState(){
        let index = this.state.currentVideoIndex
        let videoList = [... this.state.videoList]
        videoList.pop(index)
        this.setState({videoList, currentVideoIndex: null, popUp: false})
    }

    onPopUpClose() {
        this.setState({ popUp: null })

    }

    onDeleteClick(currentVideoIndex){
        this.setState({popUp:"deleter", currentVideoIndex})
    }

    componentDidMount() {
        this.getOwnList()
    }

    getOwnList() {
        const token = localStorage.getItem("token");
        let conf = {
            headers: {
                'Authorization': "Bearer " + token
            }
        }
        axios.get(this.url, conf)
            .then((response) => {
                if (response.data != null) {
                    let videoList = response.data.obj
                    this.setState({ videoList })
                }
            })
            .catch((err) => {
                if (err.response.status == 403){
                    console.log("ok")
                }
            })
    }

    render() {
        if (this.state.videoList == null)
            return <div className={CoreBoxstyles.spinnerContainer}>
                <Spinner />
            </div>
        if (this.state.videoList.length != 0) {
            return <React.StrictMode>
                {this.state.popUp ? <PopUp>
                    {this.getPopUp()}
                </PopUp> : null}
                <div className={CoreBoxstyles.title}>My Videos <button className={CoreBoxstyles.button} onClick={this.onAddVideoClick} style={{ padding: "8px 25px" }}>Add video</button></div>
                <VideoGrid >
                    {this.state.videoList.map((value, index) => (
                        <VIdeoItem videoObj = {value}
                            key={index}
                            onClick={()=>this.onVideoClick(1)}
                            edit={() => { console.log("ok") }}
                            delete={ ()=>this.onDeleteClick(index) } />
                    ))}
                </VideoGrid>
            </React.StrictMode>
        } else return <React.StrictMode>
            {this.state.popUp ? <PopUp>
                {this.getPopUp()}
            </PopUp> : null}
            <EmptyList
                title="You have no video!"
                onAddVideoClick={this.onAddVideoClick}
                description="Sorry! there are no videos in your list, but you can download some! please go ahead and click add video below." />
        </React.StrictMode>
    }

}


export default MyVideoList;