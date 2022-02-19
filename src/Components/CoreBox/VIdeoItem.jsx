import React from "react";
import styles from "./VideoGrid.module.css"

class VIdeoItem extends React.Component{

    render(){
        return <div className={styles.videoItem}>
            <img className={styles.thumbnail} src={this.props.thumbnail}/>
            <div className={styles.container}>
                <p className={styles.videoTitle}>Maher Zain - Qalbi Sajad | Vocals Only ماهر زين - قلبي سجد |</p>
                <div className={styles.controle}>
                    {this.props.edit ? <button className={styles.button}>Edit</button> : null}
                    {this.props.delete ? <button className={styles.delete}>Delete</button> : null}
                </div>
            </div>
        </div> 
    }

}


export default VIdeoItem;