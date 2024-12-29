'use client'
import React, { useContext, useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { Plus } from 'lucide-react'
import {
  MainContextWrapperType,
  ContextMain,
} from '@/components/global/ContextWrapper'

function ReelVideo(props: { url: string }) {
  /* Props */
  const { url } = props
  /* End */

  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    setIsPlaying(true)
  }, [])

  /* Video Ref*/
  const videoRef = useRef<ReactPlayer>(null!)
  /*  End */

  /* Main Context */
  const { overlay, handleOverlay } = useContext(
    ContextMain,
  ) as MainContextWrapperType
  /* End */

  /* Correct Width of Video */
  const beginningHandler = () => {
    const videoTag = videoRef.current.getInternalPlayer() as HTMLVideoElement

    videoTag.style.objectFit = 'cover'
  }
  /* End */

  return (
    <div
      className="overflow-hidden w-full overflow-hidden h-[47vw] sm:h-[20vw] xl:h-full xl:min-h-[198px] bg-[#FDFEC0] 3xl:p-[8px] p-[4px]  border border-black rounded-[5px] border border-black rounded-[4px] flex  relative items-center justify-center"
      onClick={() => {
        handleOverlay({
          ...overlay,
          open: true,
          isVideo: true,
          item: process.env.NEXT_PUBLIC_REEL_VIDEO || '',
          videoTitle: 'Reel Video',
        })
      }}
    >
      <button className="TN xl:w-[12.5vw] xl:h-[1.8vw] xl:p-0 px-4 sm:px-8 sm:py-2  flex items-center justify-center bg-bl text-white absolute z-20 rounded-[2px] group">
        PLAY REEL{' '}
        <span className="group-hover:rotate-[180deg] flex items-center  justify-center ml-2 group-hover:scale-[1.5] duration-300 h-[10px]">
          <Plus
            className="PLUS 2xl:w-[0.7vw] 2xl:h-[0.7vw] cursor-pointer"
            size={10}
          ></Plus>
        </span>
      </button>
      <ReactPlayer
        muted={true}
        playing={true}
        height={'100%'}
        playsinline={true}
        width={'100%'}
        loop
        style={{
          zIndex: 0,
          position: 'relative',
          height: 'auto !important',
          aspectRatio: '16/9',
          borderRadius: 4,
          border: '1px black solid',
        }}
        url={url}
        onReady={beginningHandler}
        onStart={beginningHandler}
        ref={videoRef}
      ></ReactPlayer>
    </div>
  )
}

export default ReelVideo
