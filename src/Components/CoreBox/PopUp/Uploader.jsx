import React from "react";
import { FaVideo } from 'react-icons/fa';
import { GrClose } from "react-icons/gr"
import Upstyles from "./Uploader.module.css"
import FormTextField from "../../Form/FormTextField";
import FormInputFIle from "../../Form/FormInputFIle";
import axios from "axios";
import Spinner from "../Spinner";

class Uploader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            videoFile: null,
            onDrag : false,
            uploadStarting: false,
        }
        this.couter = 0
        this.thumbnail = React.createRef()
        this.videoFileRef = React.createRef()
        this.name = React.createRef()
        this.description = React.createRef()
        this.onVideoSelect = this.onVideoSelect.bind(this)
        this.handleEnterDragging = this.handleEnterDragging.bind(this)
        this.handleLeaveDragging = this.handleLeaveDragging.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }
    onVideoSelect(e) {
        if(this.videoFileRef .current.files.length > 1){
            alert("You have to choose a single file")
        }
        else{
            let videoFile = this.videoFileRef .current.files[0]
            this.setState({videoFile})
        }
    }    

    handleEnterDragging(e){
        this.couter++
        let onDrag = true
        this.setState({onDrag})
        
    }

    handleLeaveDragging(e){
        this.couter--
        if(this.couter == 0) {
            let onDrag = false
            this.setState({onDrag})
        }
    }

    handleSubmit(){
        this.setState({uploadStarting:true})
        const token = localStorage.getItem("token");
        let conf = {
            headers: {
                'Authorization': "Bearer " + token
            }
        }
        let videoForm = new FormData()
        let name = this.name.current.value
        let description = this.description.current.value
        
        let thumbnail = this.thumbnail.current.files
        if(name != null && description != null && thumbnail.length == 1){
            console.log("ok")
            videoForm.append("name", name)
            videoForm.append("description", description)
            videoForm.append("visibility", true)
            videoForm.append("thumbnail", thumbnail[0])
            videoForm.append("video", this.state.videoFile)

            let url = "http://127.0.0.1:8080/api/video/upload"

            axios.post(url, videoForm,conf)
            .then((response)=>{
                console.log(response)
                if(response.data.obj == true){
                    this.onUploadSuccess()
                }
            }).catch((error)=>{
                console.log(error)
            })
        }
        else{
            alert("somes fields are Empty!")
        }

    }
    onUploadSuccess(){
        alert("Video has been uploaded successfully!")
        this.props.onClose()
        this.props.onUpload()
    }
    uploadForm(){
        if(this.state.uploadStarting){
            return <div className={Upstyles.spinnerContainer}>
                    <Spinner/>
                </div>
        }else{
            return <div className={Upstyles.form}>
                <FormTextField label = "Video name" refence={this.name}/>
                <FormTextField label = "Video description" refence={this.description}/>
                <FormInputFIle refence = {this.thumbnail} label = "Choose a thumbnail" id = "thmbnailId"/>
                <button className={Upstyles.button} onClick={this.handleSubmit}>Confirm the upload</button>
            </div>
        }
    }



    upLoadDragSelect() {
        let dragState = this.state.onDrag ? Upstyles.dragOn : null
        return <div className={Upstyles.drag + " " + dragState} draggable 
                onDragEnter = {this.handleEnterDragging}
                onDragLeave = {this.handleLeaveDragging}>
            <FaVideo className={Upstyles.icon} />
            <h2 className={Upstyles.h2}>Drag and drop your {this.props.fileType} file to upload</h2>
            <p className={Upstyles.p}>Choose a mp3 file from your device</p>
            <label className={Upstyles.button} htmlFor="videoFile" >Select a file</label>
            <input type="file" onChange={this.onVideoSelect} ref = {this.videoFileRef} className={Upstyles.videoFile} id="videoFile" />
        </div>
    }

    render() {
        return <div className={Upstyles.uploader}>
            <div className={Upstyles.Uphead}>
                <h1 className={Upstyles.h2}>Upload new {this.props.fileType}</h1>
                <button className={Upstyles.closebutton} onClick={this.props.onClose} ><GrClose /></button>
            </div>
            {this.state.videoFile == null? 
            this.upLoadDragSelect():
            this.uploadForm()}
        </div>
    }
}

export default Uploader;