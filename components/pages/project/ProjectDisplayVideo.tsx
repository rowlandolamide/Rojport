'use client'
import React, { useContext, useRef } from 'react'
import ReactPlayer from 'react-player'
import playIcon from '../../../public/play-icon.svg'
import Image from 'next/image'
import {
  MainContextWrapperType,
  ContextMain,
} from '@/components/global/ContextWrapper'

import { urlForImage } from '@/sanity/lib/utils'

function ProjectDisplayVideo(props: {
  url: string
  videoTitle: string
  projectName: string
  placeHolderImage?: any
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
      <button className="PLAY-BTN group sm:flex hidden gap-x-[10px]  ">
        <Image
          className="2xl:w-[0.75vw] duration-300 group-hover:sm:scale-[1.05]"
          src={playIcon.src}
          alt={'play button'}
          width={14}
          height={14}
        ></Image>{' '}
        {projectName}{' '}
      </button>
      <button className="PLAY-BTN flex group bottom-[14px] left-[16px] gap-x-[10px] sm:hidden ">
        <Image
          className="2xl:w-[0.75vw] duration-300 group-hover:sm:scale-[1.05]"
          src={playIcon.src}
          alt={'play button'}
          width={14}
          height={14}
        ></Image>{' '}
        {projectName}{' '}
      </button>
    {/*   <Vimeo video={"https://vimeo.com/1023347832?fl=pl&fe=sh"}></Vimeo> */}
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
        playIcon={<></>}
        url={url}
        onStart={beginningHandler}
        ref={videoRef}
      ></ReactPlayer> 
    </div>
  )
}

export default ProjectDisplayVideo
