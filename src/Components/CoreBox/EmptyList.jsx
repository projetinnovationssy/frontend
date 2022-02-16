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
                <h1 className={styles.h1}>You have no video!</h1>
                <p className={styles.p}>Sorry! there are no videos in your list, but you can download some! please go ahead and click add video below.</p>
                <button className={styles.button}>Add video</button>
        </div>
    }
}

export default EmptyList;