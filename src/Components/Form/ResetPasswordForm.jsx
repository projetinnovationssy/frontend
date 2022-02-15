import React from "react";
import FormTextField from "./FormTextField";
import styles from "./Form.module.css"
class ResetPasswordForm extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return <div className={styles.form}>
            <h1 className={styles.title} >Reset your password</h1>
            <FormTextField label="Password" type="password" id="password1"/>
            <FormTextField label="Password" type="password" id="password2"/>
            <div className={styles.groupForm}>
                <button className={styles.button}>Submit</button>
            </div>
        </div>
    }
}

export default ResetPasswordForm;