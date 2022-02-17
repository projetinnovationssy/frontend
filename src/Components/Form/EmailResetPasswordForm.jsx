import React from "react";
import FormTextField from "./FormTextField";
import styles from "./Form.module.css"
import {Link} from "react-router-dom"
class EmailResetPasswordForm extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return <div className={styles.form}>
            <h1 className={styles.title} >Forgot your password?</h1>
            <p className={styles.titleComment}>It's okay, we got you! What's your email address?</p>
            <FormTextField label="Email" type="text" id="email"/>
            <div className={styles.groupForm}>
                <button className={styles.button}>Reset password</button>
            </div>
            <div className={styles.groupForm2}>Oh whait! remembred! <div className={styles.newLine}>Back to <Link to="/login" className={styles.link}>Sign up</Link></div></div>
        </div>
    }
}

export default EmailResetPasswordForm;