import React from "react"
import { FaVideo, FaUserLock } from 'react-icons/fa';
import styles from "./Settings.module.css"
import FormTextField from "../Form/FormTextField";
class Settings extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return <div className={styles.container}>
            <h1 className={styles.title}>Settings</h1>
            <section className={styles.section}>
                <h2 className={styles.sectionTile}>Password update</h2>
                <div className="sectionContent">
                    <FormTextField customStyles={styles} label="Old password" type="password" id="password1" />
                    <FormTextField customStyles={styles} label="New password" type="password" id="password2" />
                    <FormTextField customStyles={styles} label="Confirm your Password" type="password" id="password3" />
                    <div className={styles.groupForm}>
                        <button className={styles.button}>Submit</button>
                    </div>
                </div>
            </section>
        </div>
    }

}

export default Settings