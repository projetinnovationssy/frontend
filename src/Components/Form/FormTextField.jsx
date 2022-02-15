import React from "react";


class FormTextField extends React.Component{
    
    constructor(props){
        super(props)
    }

    render(){
        return <div className="form-group">
        <label  htmlFor={this.props.id} className="form-label">{this.props.label}</label>
        <input type={this.props.type} className="form-input" id={this.props.id}/>
    </div>
    }
}


export default FormTextField