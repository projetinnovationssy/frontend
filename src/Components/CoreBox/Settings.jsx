import React from "react"
import styles from "./Settings.module.css"
import FormTextField from "../Form/FormTextField";
import axios from "axios";
import DeleteConfirmer from "./PopUp/DeleteConfirmer";
import PopUp from "./PopUp/PopUp";
class Settings extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            popUp: false
        }
        this.oldpassword = React.createRef()
        this.newpassword = React.createRef()
        this.cpassword = React.createRef()
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onPopUpClose = this.onPopUpClose.bind(this)
        this.ConfirmDelet = this.ConfirmDelet.bind(this)
        this.url = "http://localhost:8080/api/user/changepass"
    }
    handleSubmit() {
        const token = localStorage.getItem("token");
        let conf = {
            headers: {
                'Authorization': "Bearer " + token
            }
        }
        let oldpassword = this.oldpassword.current.value
        let newpassword = this.newpassword.current.value
        let cpassword = this.cpassword.current.value
        if (oldpassword != null && newpassword != null && cpassword != null &&
            oldpassword != "" && newpassword != "" && cpassword != "") {
            if (newpassword == cpassword) {
                let userData = new FormData()
                userData.append("opass", oldpassword)
                userData.append("npass", newpassword)
                userData.append("cpass", cpassword)
                axios.post(this.url, userData, conf)
                    .then((response) => {
                        if (response.data.obj == false) {
                            alert(response.data.description)
                        }
                        else {
                            alert(response.data.description + "! you will be redirected to the login page")
                            this.props.logoutCallback()
                        }
                    })
                    .catch((err) => { console.log(err.response) })
            }
            else alert("New possword and confirm new password do not match!")
        }
    }

    onPopUpClose(){
        this.setState({ popUp: false })
    }

    ConfirmDelet(){
        this.setState({ popUp: true })
    }

    render() {
        return <div className={styles.container}>
            {this.state.popUp ? <PopUp>
                <DeleteConfirmer
                    title = "Want you really delet your account"
                    description = "By confirming delete, your account will be deleted and your videos either"
                    onDelete = {()=>{}}  
                    onCancel = {this.onPopUpClose}/>
            </PopUp> : null}
            <h1 className={styles.title}>Settings</h1>
            <section className={styles.section}>
                <h2 className={styles.sectionTile}>Password update</h2>
                <div className="sectionContent">
                    <FormTextField customStyles={styles} label="Old password" type="password" id="password1" refence={this.oldpassword} />
                    <FormTextField customStyles={styles} label="New password" type="password" id="password2" refence={this.newpassword} />
                    <FormTextField customStyles={styles} label="Confirm your Password" type="password" id="password3" refence={this.cpassword} />
                    <div className={styles.groupForm}>
                        <button className={styles.button} onClick={this.handleSubmit}>Submit</button>
                    </div>
                </div>
            </section>
            <section className={styles.section}>
                <h2 className={styles.sectionTile}>Delete account</h2>
                <div className="sectionContent">
                    <div className={styles.groupForm}>
                        <button className={styles.button} style={{ backgroundColor: "#f06f6f" }} onClick={this.ConfirmDelet}>Delete my account</button>
                    </div>
                </div>
            </section>
        </div>
    }

}

export default Settings