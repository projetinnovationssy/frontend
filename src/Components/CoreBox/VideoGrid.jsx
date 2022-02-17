import React from "react";
import styles from "./VideoGrid.module.css"

class VideoGrid extends React.Component{

    render(){
        return <div className={styles.coreBox}>
            {this.props.children}
    </div>  
    }

}


export default VideoGrid;