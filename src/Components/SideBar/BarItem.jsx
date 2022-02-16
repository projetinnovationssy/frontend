import React from "react"
import styles from "./SideBar.module.css"


class BarItem extends React.Component{

    render(){
        return <div className= {styles.bareItem + " " + this.props.className}>
            {this.props.children}
        </div>
    }

}

export default BarItem