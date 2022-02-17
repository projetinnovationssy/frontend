import React from "react";
import styles from "./VideoGrid.module.css"

class VIdeoItem extends React.Component{

    render(){
        return <div className={styles.videoItem}>
            <img className={styles.thumbnail} src={this.props.thumbnail}/>
            <div className={styles.container}>
                <p className={styles.videoTitle}>Maher Zain - Qalbi Sajad | Vocals Only ماهر زين - قلبي سجد |</p>
                <div className={styles.controle}>
                    <button className={styles.button}>Edit</button>
                    <button className={styles.delete}>Delete</button>
                </div>
            </div>
        </div> 
    }

}


export default VIdeoItem;