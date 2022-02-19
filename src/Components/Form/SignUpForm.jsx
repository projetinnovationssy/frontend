import React from "react";
import FormTextField from "./FormTextField";
import { Link, Navigate } from "react-router-dom"
import styles from "./Form.module.css"
import axios from "axios"

class SignUpForm extends React.Component {
    constructor(props) {
        super(props)
        this.fname = React.createRef()
        this.lname = React.createRef()
        this.email = React.createRef()
        this.password = React.createRef()
        this.password2 = React.createRef()
        this.handleSignUp = this.handleSignUp.bind(this)
        this.signUp = this.signUp.bind(this)
        this.state = {
            redirect: null
        }
        this.url = "http://127.0.0.1:8080/signup"
    }

    signUp(userData) {
        axios.post(this.url, userData)
            .then((response) => {
                if (response.data.description == "User is Created Successfully") {
                    alert("We have registered you!! you will be redirected to the login page")
                    this.setState({ redirect: true })
                } else {
                    alert("We can't register you, verify your information and try again!")
                }
            })
            .catch((error) => {
                console.log(error)
                alert("We can't register you, verify your information and try again!")
            })

    }

    handleSignUp() {
        let fname = this.fname.current.value
        let lname = this.lname.current.value
        let email = this.email.current.value
        let password = this.password.current.value
        let password2 = this.password2.current.value
        if (email != null && password != null && password2 != null && fname != null && lname != null &&
            email != "" && password != "" && password2 != "" && fname != "" && lname != "") {
            if (password == password2) {
                let bodyFormData = new FormData();
                bodyFormData.append("fname", fname)
                bodyFormData.append("lname", lname)
                bodyFormData.append("email", email)
                bodyFormData.append("pass", password)
                bodyFormData.append("cpass", password2)
                this.signUp(bodyFormData)
            } else {
                alert("confirm password and password doesn't match!")
            }
        } else {
            alert("some fields are empty!")
        }

    }

    render() {
        return <div className={styles.form}>
            {this.state.redirect ? <Navigate to="/login" /> : null}
            <h1 className={styles.title} >Sign in to start uploading videos</h1>
            <FormTextField label="First name" type="text" id="fname" refence={this.fname} />
            <FormTextField label="Last name" type="text" id="lname" refence={this.lname} />
            <FormTextField label="Email" type="text" id="email" refence={this.email} />
            <FormTextField label="Password" type="password" id="password" refence={this.password} />
            <FormTextField label="Confirm Password" type="password" id="password2" refence={this.password2} />
            <div className={styles.groupForm}>
                <button className={styles.button} onClick={this.handleSignUp}>Sign up</button>
            </div>
            <div className={styles.groupForm2}>By signing up, you agree to our terms and privacy policy</div>
            <div className={styles.groupForm2}>Already have an account <Link to="/login" className={styles.link}>Sign in</Link></div>
        </div>
    }
}

export default SignUpForm;