import React from "react";
import styles from "./CoreBox.module.css"
import EmptyList from "./EmptyList"   
class CoreBox extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return <div className={styles.coreBox}>
                <EmptyList/>
        </div>
    }
}

export default CoreBox;