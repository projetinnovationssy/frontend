import React from "react";
import { FaVideo } from 'react-icons/fa';
import { GrClose } from "react-icons/gr"
import Upstyles from "./Uploader.module.css"
import FormTextField from "../../Form/FormTextField";
import FormInputFIle from "../../Form/FormInputFIle";
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
        this.onUploadSuccess = this.onUploadSuccess.bind(this)
        this.uploadsubmit = this.uploadsubmit.bind(this)
        this.updatesubmit = this.updatesubmit.bind(this)
        this.httpclient = this.props.httpclient

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

    uploadsubmit(){
        this.setState({uploadStarting:true})
        let name = this.name.current.value
        let description = this.description.current.value
        let thumbnail = this.thumbnail.current.files
        if(name != null && description != null && thumbnail.length == 1){
            this.httpclient.upload(name, 
                    description, 
                    thumbnail[0], 
                    this.state.videoFile,
                    this.onUploadSuccess,
                    this.props.onClose)
        }
        else{
            alert("somes fields are Empty!")
        }
    }

    updatesubmit(){
        this.setState({uploadStarting:true})
        let name = this.name.current.value
        let description = this.description.current.value
        let id = this.props.video.id
        if(id != null && name != null && description != null){
            console.log(this)
            this.httpclient.update(id,name, 
                    description, 
                    this.onUploadSuccess,
                    this.props.onClose)
        }
        else{
            alert("somes fields are Empty!")
        }
    }

    handleSubmit(){
        if(this.props.purpose == "upload"){
            this.uploadsubmit()
        }
        else if (this.props.purpose == "update"){
            this.updatesubmit()
        }
    }
    onUploadSuccess(){
        alert("Video has been uploaded successfully!")
        this.props.onClose()
        this.props.onUpload()
    }
    uploaderForm(purpose){
        if(this.state.uploadStarting){
            return <div className={Upstyles.spinnerContainer}>
                    <Spinner/>
                </div>
        }else{
            return <div className={Upstyles.form}>
                <FormTextField label = "Video name" refence={this.name}/>
                <FormTextField label = "Video description" refence={this.description}/>
                {purpose == "upload" ? <FormInputFIle refence = {this.thumbnail} label = "Choose a thumbnail" id = "thmbnailId"/> : null}
                <button className={Upstyles.button} onClick={this.handleSubmit}>Confirm the {purpose}</button>
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

    renderByPurpose(purpose){
        if(purpose == "upload"){
            if(this.state.videoFile == null)
                return this.upLoadDragSelect()
            else   
                return this.uploaderForm(purpose)
        }else if (purpose == "update"){
            return this.uploaderForm(purpose)
        }
    }

    render() {
        let purpose = this.props.purpose
        let title
        if (purpose == "upload"){
            title = "Upload new " + this.props.fileType
        }else if (purpose == "update"){
            title = "Update the video: " + this.props.video.name
        }
        return <div className={Upstyles.uploader}>
        <div className={Upstyles.Uphead}>
            <h1 className={Upstyles.h2}>{title}</h1>
            <button className={Upstyles.closebutton} onClick={this.props.onClose} ><GrClose /></button>
        </div>
            {this.renderByPurpose(purpose)}
    </div>

    }
}

export default Uploader;