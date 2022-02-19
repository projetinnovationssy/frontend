import React from "react";
import styles from "./CoreBox.module.css"
import EmptyList from "./EmptyList"
import Uploader from "./Uploader";
import PopUp from "./PopUp";
import VideoGrid from "./VideoGrid";
import VIdeoItem from "./VIdeoItem";
import DeleteConfirmer from "./DeleteConfirmer";
import {
    Route,
    Routes,
    Navigate
} from "react-router-dom";
import Settings from "./Settings";
import axios from "axios";

// Add a request interceptor

class CoreBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            popUp: false,
            videoList: [
            ]
        }
        this.onAddVideoClick = this.onAddVideoClick.bind(this)
        this.onPopUpClose = this.onPopUpClose.bind(this)
        this.popUpElement = <Uploader fileType="video" onClose={this.onPopUpClose} />
        this.url = "http://localhost:8080/api/video/get/user"
        this.getOwnList = this.getOwnList.bind(this)

    }

    getPopUp() {
        return this.popUpElement
    }

    onAddVideoClick() {
        this.setState({ popUp: true })
    }

    onPopUpClose() {
        this.setState({ popUp: false })

    }

    getOwnList(){
        const token = localStorage.getItem("token");
        let conf = {
            headers:{
                'Authorization' : "Bearer " + token
            }
        }
        axios.get(this.url, conf)
        .then((response)=>{
            if (response.data != null){
                let videoList = response.data.obj
                this.setState({videoList})
            }
        })
        .catch((err)=>{
        })
    }

    myVideoList() {
        if (this.state.videoList.length != 0) {
            return <React.StrictMode>
                <div className={styles.title}>My Videos <button className={styles.button} onClick={this.onAddVideoClick} style={{ padding: "8px 25px" }}>Add video</button></div>
                <VideoGrid >
                    {this.state.videoList.map((value, index)=>(
                        <VIdeoItem thumbnail = {value.thumbnail} key = {index}/>
                    ))}
                </VideoGrid>
            </React.StrictMode>
        }else return <EmptyList onAddVideoClick = {this.onAddVideoClick} />

    }

    getList() {
        return <EmptyList onAddVideoClick = {this.onAddVideoClick} />
    }

    /////
    componentDidMount(){
        this.getOwnList()
    }

    render() {
        return <div className={styles.coreBox}>
            {this.state.popUp ? <PopUp>
                {this.getPopUp()}
            </PopUp> : null}

            <Routes>
                <Route path="/" element={<Navigate to='/myvideos' />} />
                <Route path="/login" element={<Navigate to='/myvideos' />} />
                <Route path="/myvideos" element={this.myVideoList()} />
                <Route path="/videos" element={this.getList()} />
                <Route path="/settings" element={<Settings/>} />

            </Routes>

        </div>
    }
}

export default CoreBox;

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