import React from "react"
import styles from "./SideBar.module.css"


class BarItem extends React.Component{

    render(){
        return <button onClick = {this.props.logoutCallback} className= {styles.bareItem + " " + this.props.className}>
            {this.props.children}
        </button>
    }

}

export default BarItem