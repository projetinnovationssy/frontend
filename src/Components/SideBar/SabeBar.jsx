import React from "react"
import BarItem from "./BarItem"
import {FaVideo, FaUserLock}  from 'react-icons/fa';
import {IoMdSettings} from "react-icons/io";
import {IoLogIn} from "react-icons/io5";
import styles from "./SideBar.module.css"

class SideBar extends React.Component{

    constructor(props){
        super(props)
        this.state = {Currentsection : ""}
        if(window.location.pathname == "/login" || window.location.pathname == "/"){
            this.state.Currentsection = "/myvideos"
        }
        else this.state.Currentsection = window.location.pathname
        this.setCurrent = this.setCurrent.bind(this)
    }
    setCurrent(location){
        this.setState({Currentsection:location })
    }
    render(){
        return <div className={styles.sideBar}>
           <div>
               <h1 className={styles.siteTitle}>FASTcast</h1>
                <BarItem to ="/myvideos" 
                         className={  this.state.Currentsection == "/myvideos" ? styles.bareItemOn : null}
                         onClick = {()=>this.setCurrent("/myvideos")}>
                    <FaUserLock className={styles.icon}/> My videos
                </BarItem>
                <BarItem to ="/videos" 
                        className={  this.state.Currentsection == "/videos" ? styles.bareItemOn : null}
                        onClick = {()=>this.setCurrent("/videos")}>
                    <FaVideo className={styles.icon}/> public videos
                </BarItem>
                <BarItem to ="/settings" 
                        className={  this.state.Currentsection == "/settings" ? styles.bareItemOn : null}
                        onClick = {()=>this.setCurrent("/settings")}>
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