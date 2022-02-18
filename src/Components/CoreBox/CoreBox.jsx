import React from "react";
import styles from "./CoreBox.module.css"
import EmptyList from "./EmptyList"
import Uploader from "./Uploader";
import PopUp from "./PopUp";
import VideoGrid from "./VideoGrid";
import VIdeoItem from "./VIdeoItem";
import DeleteConfirmer from "./DeleteConfirmer";
import {
    Route,
    Routes,
    Navigate
} from "react-router-dom";
class CoreBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            popUp: false,
            videoList: [

            ]
        }
        this.onAddVideoClick = this.onAddVideoClick.bind(this)
        this.onPopUpClose = this.onPopUpClose.bind(this)
        this.popUpElement = <Uploader fileType="video" onClose={this.onPopUpClose} />
    }

    getPopUp() {
        return this.popUpElement
    }

    onAddVideoClick() {
        this.setState({ popUp: true })
    }

    onPopUpClose() {
        this.setState({ popUp: false })

    }

    myVideoList() {
        if (this.state.videoList.length != 0) {
            return <React.StrictMode>
                <div className={styles.title}>My Videos <button className={styles.button} onClick={this.onAddVideoClick} style={{ padding: "8px 25px" }}>Add video</button></div>
                <VideoGrid >
                    {this.state.videoList.map((value, index)=>(
                        <VIdeoItem thumbnail = {value.thumbnail} key = {index}/>
                    ))}
                </VideoGrid>
            </React.StrictMode>
        }else return <EmptyList onAddVideoClick = {this.onAddVideoClick} />

    }

    getList() {
        return <EmptyList onAddVideoClick = {this.onAddVideoClick} />
    }

    render() {
        return <div className={styles.coreBox}>
            {this.state.popUp ? <PopUp>
                {this.getPopUp()}
            </PopUp> : null}

            <Routes>
                <Route path="/login" element={<Navigate to='/myvideos' />} />
                <Route path="/myvideos" element={this.myVideoList()} />
                <Route path="/" element={<Navigate to='/myvideos' />} />
                <Route path="/videos" element={this.getList()} />
            </Routes>

        </div>
    }
}

export default CoreBox;

/*git 
        <PopUp>
            <DeleteConfirmer/>
        </PopUp>
        <PopUp>
            <Uploader fileType = "video"/>
        </PopUp>
        
        <PopUp>
            <DeleteConfirmer/>
        </PopUp>

                        {
                    thumbnail: "thumb.jpg"
                }
*/