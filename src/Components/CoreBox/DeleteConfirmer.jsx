import React from "react";
import styles from "./DeleteConfirmer.module.css"

class DeleteConfirmer extends React.Component{

    render(){
        return  <div className={styles.deleter}>
                    <h1 className={styles.h2}>Are you sure you want to delete this video?</h1>
                    <div className={styles.container}>
                        <button className={styles.button} onClick = {this.props.onCancel}>Cancel</button>
                        <button className={styles.button+" "+styles.delete} onClick = {this.props.onDelete}>Yes, delete it</button>
                    </div>
                </div>
    }
}

export default DeleteConfirmer;