import React from "react";
import styles from "./VideoGrid.module.css"

class VIdeoItem extends React.Component{

    render(){
        return <div className={styles.videoItem} >
            <div className="img" onClick={this.props.onClick}>
                <img className={styles.thumbnail}  src={this.props.videoObj.thumbnail}/>
            </div>
            <div className={styles.container}>
                <p className={styles.videoTitle}>{this.props.videoObj.name}</p>
                <p className={styles.videoDescription}>{this.props.videoObj.description}</p>
                <div className={styles.controle}>
                    {this.props.edit ? <button className={styles.button} onClick ={this.props.edit}>Edit</button> : null}
                    {this.props.delete ? <button className={styles.delete} onClick ={this.props.delete}>Delete</button> : null}
                </div>
            </div>
        </div> 
    }

}


export default VIdeoItem;