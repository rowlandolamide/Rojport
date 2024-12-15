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
            <button className='xl:text-[0.7vw] xl:w-[12.5vw] xl:h-[1.8vw] xl:p-0 px-8 py-2 text-[12px] flex items-center justify-center bg-bl text-white absolute z-20 rounded-[2px] group' >PLAY ALPHA {" "} <span className='group-hover:rotate-[180deg] ml-2 group-hover:scale-[1.5] duration-300'>+</span></button>
            <ReactPlayer height={"100%"} width={"100%"} style={{zIndex: 0, position: "relative", height: "auto !important", aspectRatio: "16/9", borderRadius: 3}} url={url} onStart={beginningHandler}ref={videoRef}></ReactPlayer>
            
        </div>
    );
}

export default ProjectDisplayVideo;