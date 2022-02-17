import React from "react";
import styles from "./CoreBox.module.css"
import {FaVideo}  from 'react-icons/fa';
import {GrClose} from "react-icons/gr"
import Upstyles from "./Uploader.module.css"

class Uploader extends React.Component{

    render(){
        return  <div className={Upstyles.uploader}>
                    <div className={Upstyles.Uphead}>
                        <h1 className={Upstyles.h2}>Upload new {this.props.fileType}</h1>
                        <button className={Upstyles.closebutton} onClick = {this.props.onClose} ><GrClose /></button>
                    </div>
                    <div className={Upstyles.drag}>
                        <FaVideo className={Upstyles.icon}/>
                        <h2 className={Upstyles.h2}>Drag and drop your {this.props.fileType} file to upload</h2>
                        <p className={Upstyles.p}>Choose a mp3 file from your device</p>
                        <button className={styles.button}>Select a file</button>
                    </div>
                </div>
    }
}

export default Uploader;