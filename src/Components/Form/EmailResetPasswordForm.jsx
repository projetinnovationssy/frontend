import React from "react";
import FormTextField from "./FormTextField";
import styles from "./Form.module.css"
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
            <div className={styles.groupForm2}>Oh whait! remembred! <div className={styles.newLine}>Back to <a href="#" className={styles.link}>Sign up</a></div></div>
        </div>
    }
}

export default EmailResetPasswordForm;