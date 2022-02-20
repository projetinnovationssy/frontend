import Plyr from 'plyr-react'
import 'plyr-react/dist/plyr.css'
import plyrStyle from './plyrStyle.module.css'
import React from 'react'
import {GrClose} from "react-icons/gr"

class Player extends React.Component{
    render(){
        return <div className={plyrStyle.plyr}>
                <button className={plyrStyle.closebutton} onClick={this.props.onClose} ><GrClose /></button>
                <Plyr
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