import React from "react";
import styles from "./VideoGrid.module.css"
import CoreBoxstyles from "./CoreBox.module.css"
import axios from "axios";
import VideoGrid from "./VideoGrid";
import VIdeoItem from "./VIdeoItem";
import PopUp from "./PopUp";
import EmptyList from "./EmptyList"
import DeleteConfirmer from "./DeleteConfirmer";
import Uploader from "./Uploader";
class MyVideoList extends React.Component{

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

    componentDidMount(){
        this.getOwnList()
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

    render(){
        if (this.state.videoList.length != 0) {
            return <React.StrictMode>
                {this.state.popUp ? <PopUp>
                {this.getPopUp()}
                </PopUp> : null}
                <div className={CoreBoxstyles.title}>My Videos <button className={CoreBoxstyles.button} onClick={this.onAddVideoClick} style={{ padding: "8px 25px" }}>Add video</button></div>
                <VideoGrid >
                    {this.state.videoList.map((value, index)=>(
                        <VIdeoItem thumbnail = {value.thumbnail} key = {index}/>
                    ))}
                </VideoGrid>
            </React.StrictMode>
        }else return <EmptyList onAddVideoClick = {this.onAddVideoClick} />
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