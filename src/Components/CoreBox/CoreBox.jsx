import React from "react";
import styles from "./CoreBox.module.css"
import EmptyList from "./EmptyList" 
import Uploader from "./Uploader";
import PopUp from "./PopUp";
import VideoGrid from "./VideoGrid";
import VIdeoItem from "./VIdeoItem";
import DeleteConfirmer from "./DeleteConfirmer";
class CoreBox extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return <div className={styles.coreBox}>
                <div className={styles.title}>My Videos <button className={styles.button} style = {{padding: "8px 25px"}}>Add video</button></div>
                <VideoGrid >
                    <VIdeoItem thumbnail = "./thumb.jpg"/>
                    <VIdeoItem thumbnail = "./thumb.jpg"/>
                    <VIdeoItem thumbnail = "./thumb.jpg"/>
                    <VIdeoItem thumbnail = "./thumb.jpg"/>
                    <VIdeoItem thumbnail = "./thumb.jpg"/>
                    <VIdeoItem thumbnail = "./thumb.jpg"/>
                    <VIdeoItem thumbnail = "./thumb.jpg"/>
                    <VIdeoItem thumbnail = "./thumb.jpg"/>
                    <VIdeoItem thumbnail = "./thumb.jpg"/>
                    <VIdeoItem thumbnail = "./thumb.jpg"/>
                    <VIdeoItem thumbnail = "./thumb.jpg"/>
                    <VIdeoItem thumbnail = "./thumb.jpg"/>
                    <VIdeoItem thumbnail = "./thumb.jpg"/>
                    <VIdeoItem thumbnail = "./thumb.jpg"/>
                    <VIdeoItem thumbnail = "./thumb.jpg"/>
                    <VIdeoItem thumbnail = "./thumb.jpg"/>
                    <VIdeoItem thumbnail = "./thumb.jpg"/>
                    <VIdeoItem thumbnail = "./thumb.jpg"/>
                    <VIdeoItem thumbnail = "./thumb.jpg"/>
                    <VIdeoItem thumbnail = "./thumb.jpg"/>
                </VideoGrid>

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
        <EmptyList/>
        <PopUp>
            <DeleteConfirmer/>
        </PopUp>
*/