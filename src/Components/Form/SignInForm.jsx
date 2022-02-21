import React from "react";
import FormTextField from "./FormTextField";
import styles from "./Form.module.css"
import {Link} from "react-router-dom"
import axios from "axios";

class SignInForm extends React.Component{
    constructor(props){
        super(props)
        this.email = React.createRef()
        this.password = React.createRef()
        this.handleSubmit = this.handleSubmit.bind(this)
        this.url = "http://127.0.0.1:8080/signin"
    }
    getTokenAndLogin(userData){
        axios.post(this.url, userData)
            .then((response)=>{
                if(response.data.token != null){
                    console.log(response.data.token)
                    this.props.onLogin(response.data.token)
                }
            }).catch((error)=>{
                if (error.response.status == 403){
                    alert("incorrect credentials")
                }
            })
    }

    handleSubmit(){
        let email = this.email.current.value
        let password = this.password.current.value
        if(email != null && password!= null && email != "" && password != ""){
            let userData = {
                username: email,
                password
            }
            this.getTokenAndLogin(userData)
        }
    }

    render(){
        return <div className={styles.form}>
            <h1 className={styles.title} >Welcome back to FastCat</h1>
            <FormTextField label="Email" type="text" id="email" refence = {this.email} />
            <FormTextField label="Password" type="password" id="passord" refence = {this.password}/>
            <div className={styles.groupForm}>
                <button className={styles.button} onClick = {this.handleSubmit}>Log in</button>
            </div>
            <div className={styles.groupForm2}>Don't have an account <Link to="/signup" className={styles.link}>Sign up</Link></div>
        </div>
    }
}

export default SignInForm;