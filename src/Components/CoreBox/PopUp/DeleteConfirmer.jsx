import React from "react";
import styles from "./DeleteConfirmer.module.css"
import axios from "axios";
class DeleteConfirmer extends React.Component{
    constructor(props){
        super(props)
        this.detete = this.detete.bind(this)
        this.url = "http://localhost:8080/api/video/delete"
    }
    detete() {
        const token = localStorage.getItem("token");
        let conf = {
            headers: {
                'Authorization': "Bearer " + token
            }
        }
        let data = new FormData()
        data.append("video_id", this.props.currentVideo.id)
        axios.post(this.url,data, conf)
            .then((response) => {
                if (response.data.obj == true) {
                    alert(response.data.description + "! video: " + this.props.currentVideo.name)
                    this.props.onDelete()
                }
            })
            .catch((err) => {
                if (err.response.status == 403){
                    console.log("ok")
                }
            })
    }
    render(){
        return  <div className={styles.deleter}>
                    <h1 className={styles.h2}>{this.props.title}</h1>
                    <p className={styles.description}>{this.props.description}</p>
                    <div className={styles.container}>
                        <button className={styles.button} onClick = {this.props.onCancel}>Cancel</button>
                        <button className={styles.button+" "+styles.delete} onClick = {this.detete}>Yes, delete it</button>
                    </div>
                </div>
    }
}

export default DeleteConfirmer;