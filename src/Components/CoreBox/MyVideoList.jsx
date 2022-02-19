import React from "react";
import CoreBoxstyles from "./CoreBox.module.css"
import axios from "axios";
import VideoGrid from "./VideoGrid";
import VIdeoItem from "./VIdeoItem";
import {GrClose} from "react-icons/gr"
import PopUp from "./PopUp";
import EmptyList from "./EmptyList"
import DeleteConfirmer from "./DeleteConfirmer";
import Uploader from "./Uploader";
import Spinner from "./Spinner";
import Plyr from 'plyr-react'
import 'plyr-react/dist/plyr.css'
import plyrStyle from './plyrStyle.module.css'
class MyVideoList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            popUp: null,
            videoList: null,
        }
        this.onPopUpClose = this.onPopUpClose.bind(this)
        this.url = "http://localhost:8080/api/video/get/user"
        this.getOwnList = this.getOwnList.bind(this)
        this.getPopUp = this.getPopUp.bind(this)
        this.onAddVideoClick = this.onAddVideoClick.bind(this)
        this.onVideoClick = this.onVideoClick.bind(this)

    }



    onAddVideoClick() {
        this.setState({ popUp: "uploader" })
    }

    onVideoClick() {
        this.setState({ popUp: "player" })
    }

    getPopUp() {
        if (this.state.popUp == "uploader") {
            return <Uploader fileType="video" onClose={this.onPopUpClose} />
        }
        if (this.state.popUp == "player") {
            return <div className={plyrStyle.plyr}>
                <button className={plyrStyle.closebutton} onClick={this.onPopUpClose} ><GrClose /></button>
                <Plyr
                    source={
                        {
                            type: 'video',
                            sources: [
                                {
                                    src: 'video.mp4',
                                    type: 'video/mp4',
                                    size: 720
                                }]
                        }
                    }
                />
            </div>
        }
    }

    onPopUpClose() {
        this.setState({ popUp: null })

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
                            onClick={this.onVideoClick}
                            edit={() => { }}
                            delete={() => { }} />
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

/*git 
        <PopUp>
            <DeleteConfirmer/>
        </PopUp>
        <PopUp>
            <Uploader fileType = "video"/>
        </PopUp>
        
        <PopUp>
            <DeleteConfirmer/>
        </PopUp>

                        {
                    thumbnail: "thumb.jpg"
                }
*/