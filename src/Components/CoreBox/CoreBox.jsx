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
                <Route path="/videos" element={<PublicVideoList/>} />
                <Route path="/settings" element={<Settings logoutCallback = {this.props.logoutCallback}/>} />

            </Routes>

        </div>
    }
}

export default CoreBox;