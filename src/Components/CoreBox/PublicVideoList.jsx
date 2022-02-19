import React from "react";
import CoreBoxstyles from "./CoreBox.module.css"
import axios from "axios";
import VideoGrid from "./VideoGrid";
import VIdeoItem from "./VIdeoItem";
import EmptyList from "./EmptyList"
import Spinner from "./Spinner";
class PublicVideoList extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            videoList: null,
        }
        this.url = "http://localhost:8080/api/video/get/public/all"
        this.getPublicList = this.getPublicList.bind(this)

    }


    onAddVideoClick() {
        this.setState({ popUp: true })
    }

    onPopUpClose() {
        this.setState({ popUp: false })

    }

    componentDidMount(){
        this.getPublicList()
    }

    getPublicList(){
        const token = localStorage.getItem("token");
        let conf = {
            headers:{
                'Authorization' : "Bearer " + token
            }
        }
        axios.get(this.url, conf)
        .then((response)=>{
            if (response.data != null){
                let videoList = response.data.obj
                this.setState({videoList})
            }
        })
        .catch((err)=>{
        })
    }

    render(){
        if(this.state.videoList == null)
            return <div className={CoreBoxstyles.spinnerContainer}>
                    <Spinner/>
                </div>
        if (this.state.videoList.length != 0) {
            return <React.StrictMode>
                <div className={CoreBoxstyles.title}>Public Videos</div>
                <VideoGrid >
                    {this.state.videoList.map((value, index)=>(
                        <VIdeoItem thumbnail = {value.thumbnail} key = {index}/>
                    ))}
                </VideoGrid>
            </React.StrictMode>
        }else return <EmptyList 
                title = "There is no public videos!"
                description = "public videos are not available at the moment!" />
    }

}


export default PublicVideoList;

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