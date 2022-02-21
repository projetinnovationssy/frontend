import React from "react";
import VideoGalleryStyle from "./VideoGalleryStyle.module.css"
import VideoGrid from "./VideoGrid";
import VIdeoItem from "./VIdeoItem";
import PopUp from "../PopUp/PopUp";
import EmptyList from "../EmptyList";
import DeleteConfirmer from "../PopUp/DeleteConfirmer"
import Uploader from "../PopUp/Uploader";
import Spinner from "../Spinner";
import Player from "../Player/Player";
class MyVideoList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            popUp: null,
            videoList: null,
            currentVideoIndex: null,
            currentVideoId: null
        }
        this.onPopUpClose = this.onPopUpClose.bind(this)
        this.getPopUp = this.getPopUp.bind(this)
        this.onAddVideoClick = this.onAddVideoClick.bind(this)
        this.onVideoClick = this.onVideoClick.bind(this)
        this.onDeleteClick = this.onDeleteClick.bind(this)
        this.deleteFromState = this.deleteFromState.bind(this)
        this.delete =this.delete.bind(this)
        this.getId = this.getId.bind(this)
        this.getVideo =this.getVideo.bind(this)
        this.getList = this.getList.bind(this)
        this.httpclient = this.props.httpclient
    }



    onAddVideoClick() {
        this.setState({ popUp: "uploader" })
    }

    onVideoClick(currentVideoId) {
        this.setState({ popUp: "player", currentVideoId })
    }

    getId(index){
        let list = this.state.videoList
        return list[index].id
    }

    getVideo(index){
        let list = this.state.videoList
        return list[index]
    }

    getPopUp() {
        if (this.state.popUp == "uploader") {
            return <Uploader purpose = "upload" httpclient = {this.httpclient} fileType="video" onClose={this.onPopUpClose} onUpload = {this.getList}/>
        }
        if (this.state.popUp == "uploder-update") {
            return <Uploader purpose = "update" httpclient = {this.httpclient} video = {this.getVideo(this.state.currentVideoIndex)} onClose={this.onPopUpClose} onUpload = {this.getList }/>
        }
        if (this.state.popUp == "player") {
            let stremURL = this.httpclient.getVideoStreamURL(this.state.currentVideoId)
            return <Player src = {stremURL} onClose = {this.onPopUpClose}/>
        }
        if(this.state.popUp == "deleter"){
            let video = this.state.videoList[this.state.currentVideoIndex]
            return <DeleteConfirmer 
            title = {"Are you sure you want to delete this video?"}
            description = {video.name}
            onDelete = {this.delete}  currentVideo = {video} onCancel = {this.onPopUpClose}/>
        }
    }

    delete(){
        let id = this.getId(this.state.currentVideoIndex)
        let name = this.getVideo(this.state.currentVideoIndex).name
        this.httpclient.delete(id, name, ()=>this.deleteFromState() )
    }

    deleteFromState(){
        let index = this.state.currentVideoIndex
        let videoList = [... this.state.videoList]
        videoList.splice(index, 1)
        this.setState({videoList, currentVideoIndex: null, popUp: false})
    }

    

    onPopUpClose() {
        this.setState({ popUp: null })

    }



    onDeleteClick(currentVideoIndex){
        this.setState({popUp:"deleter", currentVideoIndex})
    }

    onUpdateDelete(currentVideoIndex){
        this.setState({popUp:"uploder-update", currentVideoIndex})
    }

    getList(){
        this.httpclient.getOwnList((videoList)=>this.setState({videoList}))
    }

    componentDidMount() {
        this.getList()
    }

    render() {
        if (this.state.videoList == null)
            return <div className={VideoGalleryStyle.spinnerContainer}>
                <Spinner />
            </div>
        if (this.state.videoList.length != 0) {
            return <React.StrictMode>
                {this.state.popUp ? <PopUp>
                    {this.getPopUp()}
                </PopUp> : null}
                <div className={VideoGalleryStyle.title}>My Videos <button className={VideoGalleryStyle.button} onClick={this.onAddVideoClick} style={{ padding: "8px 25px" }}>Add video</button></div>
                <VideoGrid >
                    {this.state.videoList.map((value, index) => (
                        <VIdeoItem videoObj = {value}
                            httpclient = {this.props.httpclient} 
                            key={index}
                            onClick={()=>this.onVideoClick(this.getId(index))}
                            edit={() =>this.onUpdateDelete(index) }
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