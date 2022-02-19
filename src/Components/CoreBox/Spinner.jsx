import React from "react";
import SpinerStyle from "./spinner.module.css";

class Spinner extends React.Component {
    render(){
        return <div className={SpinerStyle.loader} style = {this.props.style }></div>
    }
}


  export default Spinner;