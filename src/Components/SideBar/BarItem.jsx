import React from "react"
import styles from "./SideBar.module.css"
import {
    Link
  } from "react-router-dom";

class BarItem extends React.Component{

    render(){
        if (this.props.to != null){
            return <Link to = {this.props.to} onClick = {this.props.onClick} className= {styles.bareItem + " " + this.props.className}>
            {this.props.children}
        </Link>
        }
        return <button onClick = {this.props.onClick} className= {styles.bareItem + " " + this.props.className}>
        {this.props.children}
    </button>
    }

}

export default BarItem