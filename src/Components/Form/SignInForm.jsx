import React from "react";
import FormTextField from "./FormTextField";

class SignInForm extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return <div className="">
            <title>Welcome back to FastCat</title>
            <FormTextField label="Email" type="text" id="email"/>
            <FormTextField label="Password" type="password" id="email"/>
            <div className="form-group"><a href="#">Forgot your password?</a></div>
            <button>Log in</button>
            <div className="form-group">Don't have an account<a href="#">Sign up</a></div>
        </div>
    }
}

export default SignInForm;