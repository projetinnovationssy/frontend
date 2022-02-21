import React from "react";
import styles from "./CoreBox.module.css"
import EmptyList from "./EmptyList"
import {
    Route,
    Routes,
    Navigate
} from "react-router-dom";

import MyVideoList from "./VideoGallery/MyVideoList";
import PublicVideoList from "./VideoGallery/PublicVideoList";
import Settings from "./Settings";

class CoreBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            popUp: null,
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
                <Route path="/myvideos" element={<MyVideoList httpclient = {this.props.httpclient}/>} />
                <Route path="/videos" element={<PublicVideoList httpclient = {this.props.httpclient}/>} />
                <Route path="/settings" element={<Settings logoutCallback = {this.props.logoutCallback} httpclient = {this.props.httpclient}/>} />

            </Routes>

        </div>
    }
}

export default CoreBox;