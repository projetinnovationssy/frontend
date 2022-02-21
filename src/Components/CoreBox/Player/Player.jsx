import Plyr from 'plyr-react'
import 'plyr-react/dist/plyr.css'
import plyrStyle from './plyrStyle.module.css'
import React from 'react'
import {GrClose} from "react-icons/gr"
import VideoPlayer from './VideoPlayer'
class Player extends React.Component{
    render(){
        
          
        return <div className={plyrStyle.plyr}>
                <div className={plyrStyle.butonBox}>
                    <button className={plyrStyle.closebutton} onClick={this.props.onClose} ><GrClose /></button>
                </div>
                <Plyr
                    autoPlay
                    source={
                        {
                            type: 'video',
                            sources: [
                                {
                                    src: this.props.src,
                                    type: 'video/mp4',
                                    size: 720
                                }]
                        }
                    }
                />
            </div>
    }
}

export default Player

/**
 * const videoJsOptions = {
            controls: true,
            autoplay: true,
            height: "500px",
            responsive: true,
                
            sources: [{
              src: this.props.src,
              withCredentials: true
            }]
          }
    <VideoPlayer className ={plyrStyle.player} { ...videoJsOptions } />
 * 
 */