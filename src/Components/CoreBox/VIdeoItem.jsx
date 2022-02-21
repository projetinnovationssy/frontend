import axios from "axios";
import React from "react";
import styles from "./VideoGrid.module.css"

class VIdeoItem extends React.Component{
    constructor(props){
        super(props)
        this.state = {thumbnail: null}
        
    }
    componentDidMount(){
        this.getTumbnail()
    }
    getTumbnail(){
        const token = localStorage.getItem("token");
        let conf = {
            headers: {
                'Authorization': "Bearer " + token
            },
            responseType: "blob"
        }
        axios.get("http://127.0.0.1:8080/api/video/thumb?video_id="+this.props.videoObj.id, conf)
        .then((response, )=>{
            if(response != null){
                let thumbnail = URL.createObjectURL(response.data)
                this.setState({thumbnail})
            }
        })
    }
    render(){
        return <div className={styles.videoItem} >
            <div className="img" onClick={this.props.onClick}>
                <img className={styles.thumbnail}  src={this.state.thumbnail}/>
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