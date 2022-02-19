import React from "react";
import styles from "./CoreBox.module.css"

class EmptyList extends React.Component{
    constructor(props){
        super(props)
    }   
    render(){
        return <div className={styles.EmtyBox}>
                <img className={styles.img} src="./empty.png" alt="" />
                <div className={styles.elipse}></div>
                <h1 className={styles.h1}>{this.props.title}</h1>
                <p className={styles.p}>{this.props.description}</p>
                {this.props.onAddVideoClick? <button className={styles.button} onClick = {this.props.onAddVideoClick}>Add video</button> : null}
        </div>
    }
}

export default EmptyList;