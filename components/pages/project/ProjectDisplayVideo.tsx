'use client'
import React, { useContext, useRef } from 'react'
import ReactPlayer from 'react-player'
import {
  MainContextWrapperType,
  ContextMain,
} from '@/components/global/ContextWrapper'
import { Plus } from 'lucide-react'
import { urlForImage } from '@/sanity/lib/utils'

function ProjectDisplayVideo(props: {
  url: string
  videoTitle: string
  projectName: string
  placeHolderImage: any
}) {
  /* Props */
  const { url, videoTitle, projectName } = props
  /* End */

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

  const placeHolderUrl = props.placeHolderImage
    ? urlForImage(props.placeHolderImage)?.quality(100)?.url()
    : ''

  return (
    <div
      className="overflow-hidden w-full  ROUNDED-PRJ sm:HOME-PRJ-ROUNDED flex  relative items-center justify-center"
      onClick={() => {
        handleOverlay({
          ...overlay,
          open: true,
          isVideo: true,
          item: url,
          videoTitle: videoTitle,
        })
      }}
    >
      <button className="PLAY-BTN group">
        PLAY {projectName}{' '}
        <span className="group-hover:rotate-[180deg] flex items-center  justify-center ml-2 group-hover:scale-[1.5] duration-300 h-[10px]">
          <Plus className="PLUS 2xl:w-[0.7vw] 2xl:h-[0.7vw] " size={10}></Plus>
        </span>
      </button>
      <ReactPlayer
        height={'100%'}
        width={'100%'}
        light={placeHolderUrl}
        style={{
          zIndex: 0,
          position: 'relative',
          height: 'auto !important',
          aspectRatio: '16/9',
          borderRadius: 3,
        }}
        url={url}
        onStart={beginningHandler}
        ref={videoRef}
      ></ReactPlayer>
    </div>
  )
}

export default ProjectDisplayVideo
