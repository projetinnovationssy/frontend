import React from "react";
import styles from "./DeleteConfirmer.module.css"

class DeleteConfirmer extends React.Component{
    constructor(props){
        super(props)
        this.detete = this.detete.bind(this)
    }
    detete() {
        /*const token = localStorage.getItem("token");
        let conf = {
            headers: {
                'Authorization': "Bearer " + token
            }
        }
        axios.get(this.url, conf)
            .then((response) => {
                if (response.data != null) {
                    let videoList = response.data.obj
                    this.setState({ videoList })
                }
            })
            .catch((err) => {
                if (err.response.status == 403){
                    console.log("ok")
                }
            })*/
        this.props.onDelete()
    }
    render(){
        return  <div className={styles.deleter}>
                    <h1 className={styles.h2}>Are you sure you want to delete this video?</h1>
                    <div className={styles.container}>
                        <button className={styles.button} onClick = {this.props.onCancel}>Cancel</button>
                        <button className={styles.button+" "+styles.delete} onClick = {this.detete}>Yes, delete it</button>
                    </div>
                </div>
    }
}

export default DeleteConfirmer;