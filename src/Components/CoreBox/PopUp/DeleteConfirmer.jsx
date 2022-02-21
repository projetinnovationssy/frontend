import React from "react";
import styles from "./DeleteConfirmer.module.css"
import axios from "axios";
class DeleteConfirmer extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return  <div className={styles.deleter}>
                    <h1 className={styles.h2}>{this.props.title}</h1>
                    <p className={styles.description}>{this.props.description}</p>
                    <div className={styles.container}>
                        <button className={styles.button} onClick = {this.props.onCancel}>Cancel</button>
                        <button className={styles.button+" "+styles.delete} onClick = {this.props.onDelete}>Yes, delete it</button>
                    </div>
                </div>
    }
}

export default DeleteConfirmer;