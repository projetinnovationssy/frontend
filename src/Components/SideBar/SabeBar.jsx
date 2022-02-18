import React from "react"
import BarItem from "./BarItem"
import {FaVideo, FaUserLock}  from 'react-icons/fa';
import {IoMdSettings} from "react-icons/io";
import {IoLogIn} from "react-icons/io5";
import styles from "./SideBar.module.css"

class SideBar extends React.Component{

    constructor(props){
        super(props)
        if(window.location.pathname == "/login"){
            this.Currentsection = "/myvideos"
        }
        else this.Currentsection = window.location.pathname
        
    }
    setCurrent(){
        this.Currentsection = window.location.pathname
    }
    render(){
        return <div className={styles.sideBar}>
           <div>
               <h1 className={styles.siteTitle}>FASTcast</h1>
                <BarItem to ="/myvideos" 
                         className={  this.Currentsection == "/myvideos" ? styles.bareItemOn : null}
                         onClick = {this.setCurrent}>
                    <FaUserLock className={styles.icon}/> My videos
                </BarItem>
                <BarItem to ="/videos" 
                        className={  this.Currentsection == "/videos" ? styles.bareItemOn : null}
                        onClick = {this.setCurrent}>
                    <FaVideo className={styles.icon}/> public videos
                </BarItem>
                <BarItem to ="/settings" 
                        className={  this.Currentsection == "/settings" ? styles.bareItemOn : null}
                        onClick = {this.setCurrent}>
                    <IoMdSettings className={styles.icon}/> Settings
                </BarItem>
           </div>
            <BarItem onClick = {this.props.logoutCallback}>
                <IoLogIn className={styles.icon}/> Log out
            </BarItem>
        </div>
    }

}

export default SideBar