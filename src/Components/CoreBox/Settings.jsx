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
        this.httpclient = this.props.httpclient
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onPopUpClose = this.onPopUpClose.bind(this)
        this.ConfirmDelet = this.ConfirmDelet.bind(this)
        this.deleteaccount = this.deleteaccount.bind(this)
        
    }

    handleSubmit() {
        let oldpassword = this.oldpassword.current.value
        let newpassword = this.newpassword.current.value
        let cpassword = this.cpassword.current.value
        if (oldpassword != null && newpassword != null && cpassword != null &&
            oldpassword != "" && newpassword != "" && cpassword != "") {
            if (newpassword == cpassword) {
                this.httpclient.changepass(oldpassword, newpassword, cpassword)
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

    deleteaccount(){
        this.httpclient.deleteaccount()
    }

    render() {
        return <div className={styles.container}>
            {this.state.popUp ? <PopUp>
                <DeleteConfirmer
                    title = "Want you really delet your account"
                    description = "By confirming the delete, your account will be deleted and neither will your videos."
                    onDelete = {this.deleteaccount}  
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
                <div className="p">By confirming the delete, your account will be deleted and neither will your videos.</div>
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