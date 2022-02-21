import React from "react";
import Upstyles from "./Uploader.module.css"

class PopUp extends React.Component{

    render(){
        return <div className={Upstyles.absoluteBox}>
                {this.props.children}
        </div>
    }
}

export default PopUp;