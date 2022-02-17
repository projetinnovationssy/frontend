import React from "react";
import FormTextField from "./FormTextField";
import {Link} from "react-router-dom"
import styles from "./Form.module.css"

class SignUpForm extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return <div className={styles.form}>
            <h1 className={styles.title} >Sign in to start uploading videos</h1>
            <FormTextField label="Name" type="text" id="text"/>
            <FormTextField label="Email" type="text" id="email"/>
            <FormTextField label="Password" type="text" id="password"/>
            <div className={styles.groupForm}>
                <button className={styles.button}>Reset password</button>
            </div>
            <div className={styles.groupForm2}>By signing up, you agree to our terms and privacy policy</div>
            <div className={styles.groupForm2}>Already have an account <Link to="/login" className={styles.link}>Sign in</Link></div>
        </div>
    }
}

export default SignUpForm;