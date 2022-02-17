import React from "react";
import styles from "./Form.module.css"

class FormTextField extends React.Component{
    
    constructor(props){
        super(props)
    }

    render(){
        return <div className={styles.groupForm}>
        <label  htmlFor={this.props.id} className="form-label" >{this.props.label}</label>
        <input type={this.props.type} className="form-input" id={this.props.id} ref = {this.props.refence}/>
    </div>
    }
}


export default FormTextField