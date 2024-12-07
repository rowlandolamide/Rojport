import React, {useContext, useRef} from 'react';
import ReactPlayer from 'react-player';
import { MainContextWrapperType, ContextMain } from '@/components/global/ContextWrapper';

function ProjectDisplayVideo(props: {
    url: string, 
}) {

    /* Props */
    const {url} = props
    /* End */

    /* Video Ref*/
    const videoRef = useRef<ReactPlayer>(null!)
    /*  End */

        /* Main Context */
        const {overlay, handleOverlay} = useContext(ContextMain) as MainContextWrapperType
        /* End */

       /* Correct Width of Video */
       const beginningHandler = () => {
        const videoTag = videoRef.current.getInternalPlayer() as HTMLVideoElement;
        videoTag.style.objectFit = 'cover';
      }
       /* End */

    return (
        <div onClick={()=>{
            handleOverlay({...overlay, open: true, isVideo: true, item: url })
          }}>
            <ReactPlayer url={url} onStart={beginningHandler}ref={videoRef}></ReactPlayer>
            
        </div>
    );
}

export default ProjectDisplayVideo;