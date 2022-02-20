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
            videoId: null
        }
        this.onPopUpClose = this.onPopUpClose.bind(this)
        this.url = "http://localhost:8080/api/video/get/user"
        this.getOwnList = this.getOwnList.bind(this)
        this.getPopUp = this.getPopUp.bind(this)
        this.onAddVideoClick = this.onAddVideoClick.bind(this)
        this.onVideoClick = this.onVideoClick.bind(this)
        this.onDeleteClick = this.onDeleteClick.bind(this)
        this.delete = this.delete.bind(this)
    }



    onAddVideoClick() {
        this.setState({ popUp: "uploader" })
    }

    onVideoClick(videoId) {
        this.setState({ popUp: "player", videoId })
    }

    getPopUp() {
        if (this.state.popUp == "uploader") {
            return <Uploader fileType="video" onClose={this.onPopUpClose} />
        }
        if (this.state.popUp == "player") {
            return <Player src ="video.mp4" onClose = {this.onPopUpClose}/>
        }
        if(this.state.popUp == "deleter"){
            return <DeleteConfirmer onDelete = {()=>this.delete(this.state.videoId)} onCancel = {this.onPopUpClose}/>
        }
    }

    delete(videoId){
        console.log("delete "+videoId)
    }

    onPopUpClose() {
        this.setState({ popUp: null })

    }

    onDeleteClick(videoId){
        this.setState({popUp:"deleter", videoId})
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
                        <VIdeoItem thumbnail={value.thumbnail}
                            key={index}
                            onClick={()=>this.onVideoClick(1)}
                            edit={() => { console.log("ok") }}
                            delete={ ()=>this.onDeleteClick(2) } />
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