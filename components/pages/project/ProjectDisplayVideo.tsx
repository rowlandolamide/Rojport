"use client"
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
        <div className='overflow-hidden w-full border border-black rounded-[4px] flex  relative items-center justify-center' onClick={()=>{
            handleOverlay({...overlay, open: true, isVideo: true, item: url })
          }}>
            <button className='text-[0.7vw] w-[180px] h-[26px] flex items-center justify-center bg-bl text-white absolute z-20 rounded-[2px]'>PLAY ALPHA +</button>
            <ReactPlayer height={"100%"} width={"100%"} style={{zIndex: 0, position: "relative", height: "auto !important", aspectRatio: "16/9", borderRadius: 3}} url={url} onStart={beginningHandler}ref={videoRef}></ReactPlayer>
            
        </div>
    );
}

export default ProjectDisplayVideo;