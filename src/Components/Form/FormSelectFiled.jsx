import React from "react";
import styles from "./Form.module.css"

class FormSelectFiled extends React.Component{
    
    constructor(props){
        super(props)
    }

    render(){
        return <div className={this.props.customStyles ? this.props.customStyles.formGroup : styles.groupForm}>
        <label  htmlFor={this.props.id} className={this.props.customStyles? this.props.customStyles.label :"form-label"} >{this.props.label}</label>
        <select  className={this.props.customStyles? this.props.customStyles.input :"form-input"} id={this.props.id} ref = {this.props.refence}>
            {this.props.children}
        </select>
    </div>
    }
}


export default FormSelectFiled