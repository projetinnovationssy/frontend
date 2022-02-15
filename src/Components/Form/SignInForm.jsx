import React from "react";
import FormTextField from "./FormTextField";
import styles from "./Form.module.css"
class SignInForm extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return <div className={styles.form}>
            <h1 className={styles.title} >Welcome back to FastCat</h1>
            <FormTextField label="Email" type="text" id="email"/>
            <FormTextField label="Password" type="password" id="email"/>
            <div className={styles.groupForm}>
                <a href="#" className={styles.link}>Forgot your password?</a>
            </div>
            <div className={styles.groupForm}>
                <button className={styles.button}>Log in</button>
            </div>
            <div className={styles.groupForm2}>Don't have an account <a href="#" className={styles.link}>Sign up</a></div>
        </div>
    }
}

export default SignInForm;