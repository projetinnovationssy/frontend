import React from "react";
import styles from "./Form.module.css"

class FormInputFIle extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            file : null
        }
        this.onChange = this.onChange.bind(this)
    }

    onChange(){
        if(this.props.refence.current.files.length > 1){
            alert("You have to choose a single file")
        }
        else{
            let file = this.props.refence.current.files[0]
            this.setState({file})
        }
    }

    render(){
        return <div className={this.props.customStyles ? this.props.customStyles.formGroup : styles.groupForm}>
        <label  htmlFor={this.props.id} className={styles.fileLabel} ><div className={styles.fileb}>{this.props.label}</div> {this.state.file ?this.state.file.name : null}</label>
        <input  type = "file"  className={styles.hiden} id={this.props.id} onChange = {this.onChange} ref = {this.props.refence}/>
    </div>
    }
}


export default FormInputFIle