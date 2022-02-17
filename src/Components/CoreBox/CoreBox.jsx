import React from "react";
import styles from "./CoreBox.module.css"
import EmptyList from "./EmptyList" 
import Uploader from "./Uploader";
import PopUp from "./PopUp";

class CoreBox extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return <div className={styles.coreBox}>
                <PopUp>
                    <Uploader fileType = "video"/>
                </PopUp>
                <EmptyList/>
        </div>
    }
}

export default CoreBox;