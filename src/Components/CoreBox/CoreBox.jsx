import React from "react";
import styles from "./CoreBox.module.css"
import EmptyList from "./EmptyList"
import {
    Route,
    Routes,
    Navigate
} from "react-router-dom";

import MyVideoList from "./MyVideoList";
import Settings from "./Settings";

// Add a request interceptor

class CoreBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }


    getList() {
        return <EmptyList onAddVideoClick = {this.onAddVideoClick} />
    }
    render() {
        return <div className={styles.coreBox}>
            <Routes>
                <Route path="/" element={<Navigate to='/myvideos' />} />
                <Route path="/login" element={<Navigate to='/myvideos' />} />
                <Route path="/myvideos" element={<MyVideoList/>} />
                <Route path="/videos" element={this.getList()} />
                <Route path="/settings" element={<Settings/>} />

            </Routes>

        </div>
    }
}

export default CoreBox;