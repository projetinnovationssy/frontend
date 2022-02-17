import React from "react"
import BarItem from "./BarItem"
import {FaVideo, FaUserLock}  from 'react-icons/fa';
import {IoMdSettings} from "react-icons/io";
import {IoLogIn} from "react-icons/io5";
import styles from "./SideBar.module.css"

class SideBar extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            Currentsection :"myVideos"
        }
    }

    render(){
        return <div className={styles.sideBar}>
           <div>
               <h1 className={styles.siteTitle}>FASTcast</h1>
                <BarItem to ="#" className={  this.state.Currentsection == "myVideos" ? styles.bareItemOn : null}>
                    <FaUserLock className={styles.icon}/> My videos
                </BarItem>
                <BarItem>
                    <FaVideo className={styles.icon}/> public videos
                </BarItem>
                <BarItem>
                    <IoMdSettings className={styles.icon}/> Settings
                </BarItem>
           </div>
            <BarItem logoutCallback = {this.props.logoutCallback}>
                <IoLogIn className={styles.icon}/> Log out
            </BarItem>
        </div>
    }

}

export default SideBar