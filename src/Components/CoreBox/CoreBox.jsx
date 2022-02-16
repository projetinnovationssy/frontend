import React from "react";
import styles from "./CoreBox.module.css"
import EmptyList from "./EmptyList" 
import Uploader from "./Uploader";  
class CoreBox extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return <div className={styles.coreBox}>
                <Uploader fileType = "video"/>
                <EmptyList/>
        </div>
    }
}

export default CoreBox;