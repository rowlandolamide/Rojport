'use client'

import { useContext, useEffect } from 'react'

import { useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import React from 'react'
import useMediaQuery from '@/components/hooks/useMediaQuery'
import { Draggable } from 'gsap/Draggable'
import { gsap } from 'gsap'
import { FastForward, Pause, Play, X } from 'lucide-react'

import {
  MainContextWrapperType,
  ContextMain,
} from '@/components/global/ContextWrapper'

gsap.registerPlugin(Draggable)

const RewindFastFoward = (props: {
  handlePausePlay: () => void
  isPlaying: boolean
  handleRewind: () => void
  handleFastForward: () => void
}) => {
  return (
    <div className=" flex gap-x-4 duration-300 ">
      <button
        className=""
        onClick={() => {
          props.handleRewind()
        }}
      >
        <FastForward className="rotate-[180deg] hover:text-bl 2xl:h-8 2xl:w-8 cursor-pointer"></FastForward>
      </button>
      <button
        onClick={() => {
          props.handlePausePlay()
        }}
      >
        {props.isPlaying ? (
          <Pause className="hover:text-bl 2xl:h-8 2xl:w-8 cursor-pointer"></Pause>
        ) : (
          <Play className="hover:text-bl 2xl:h-8 2xl:w-8 cursor-pointer"></Play>
        )}
      </button>
      <button
        onClick={() => {
          props.handleFastForward()
        }}
      >
        <FastForward className="hover:text-bl 2xl:h-8 2xl:w-8 cursor-pointer"></FastForward>
      </button>
    </div>
  )
}

const Seek = (props: {
  ref: any
  width: number
  draggableWidth: number
  videoRef: any
}) => {
  const mainSeekContRef: any = useRef(null)
  const { mouseStates } = useContext(ContextMain) as MainContextWrapperType

  const handleOnClick = (e) => {
    if (mainSeekContRef && props.videoRef) {
      const duration = props.videoRef.current.getDuration()
      if (!duration) return
      const distanceFromX = mainSeekContRef.current.getBoundingClientRect().x
      const calulatedDistance =
        mouseStates.x - distanceFromX ? mouseStates.x - distanceFromX : 0

      props.videoRef.current.seekTo(
        duration * (calulatedDistance / props.width),
      )
    }
  }

  return (
    <div className="w-full relative flex items-center ">
      <div
        ref={props.ref}
        className="absolute  h-[14px] 2xl:h-[0.4vw]  rounded-[2px] shadow-md w-4 bg-blue-500 z-20"
      ></div>
      <div
        onClick={handleOnClick}
        ref={mainSeekContRef}
        style={{ width: props.width }}
        className={`cursor-pointer overflow-x-hidden group hover:scale-y-150 duration-300 bg-white/[0.37] h-[3px] 2xl:h-[0.2vw] relative items-center flex seek`}
      >
        <div
          style={{ width: props.width, marginLeft: -props.width }}
          className={`h-[3px] 2xl:h-[0.2vw] progress-indicator group-hover:scale-y-150  cursor-pointer  z-10 bg-bl`}
        ></div>
      </div>
    </div>
  )
}

export default function ProjectMainVideo({
  url,
  title,
}: {
  url: string
  title: string
}) {
  /* Main Context */
  const { closeOverlay, overlay } = useContext(
    ContextMain,
  ) as MainContextWrapperType
  /* End */

  /* On Hover */
  const [isHovered, setIsHovered] = useState(false)
  /* End */

  const { x } = useMediaQuery()

  /* Is Video Playing */
  const [isPlaying, setIsPlaying] = useState(true)
  /* Set is Video Playing */

  /* Current Second */
  const [played, setPlayed] = useState(0)
  /* End */

  /* Seek Draggable */
  const seekDraggable: any = useRef(null)
  const seekDragInstance: any = useRef(null)
  /* End */

  /* Video Container Ref */
  const videoContainerRef: any = useRef(null)
  /* End */

  const videoRef = useRef<ReactPlayer>(null!)

  /* Width of Seeking Draggable */
  const widthOfSeekingDraggable = 16
  /* End */

  const videoContainerWidth = videoContainerRef.current
    ? (Math.floor(videoContainerRef.current.getBoundingClientRect().width) *
        80) /
      100
    : 300

  useEffect(() => {
    if (!videoContainerRef.current) return

    seekDragInstance.current = Draggable.create(seekDraggable.current, {
      type: 'x',
      bounds: { minX: 0, maxX: videoContainerWidth - 16 },
      inertia: false,
      allowEventDefault: true,
      edgeResistance: 0.65,

      onDragEnd: () => {
        videoRef.current.seekTo(
          seekDragInstance.current[0].x / seekDragInstance.current[0].maxX,
        )
      },
    })
  }, [
    seekDragInstance,
    seekDraggable,
    videoContainerRef,
    x,
    videoContainerWidth,
  ])

  useEffect(() => {
    let ctx = gsap.context(() => {
      const draggableCurrent = seekDragInstance.current[0]
      /* 
    if(draggableCurrent.isPressed) return */

      const gsapTime = gsap.timeline({})

      const durationSeconds = videoRef.current.getDuration()
      const playedSeconds = videoRef.current.getCurrentTime()

      if (draggableCurrent.isPressed) {
        gsapTime.to('.progress-indicator', { x: draggableCurrent.x }, 0)
      } else {
        gsapTime
          .to(
            seekDraggable.current,
            {
              x: ((videoContainerWidth - 16) * playedSeconds) / durationSeconds,
              overwrite: true,
            },
            0,
          )
          .to(
            '.progress-indicator',
            {
              x: ((videoContainerWidth - 16) * playedSeconds) / durationSeconds,
              overwrite: true,
            },
            0,
          )
      }
    }, '.seek')

    return () => {
      ctx.clear()
    }
  }, [played, videoContainerWidth, x])

  /* const {handleOverlay,overlay } = useContext(ContextMain) as MainContextWrapperType */

  const [videoStates, setVideoStates] = useState({
    isPlaying: false,
    volume: 0.5,
  })

  const beginningHandler = () => {
    const videoTag = videoRef.current.getInternalPlayer() as HTMLVideoElement

    videoTag.style.objectFit = 'cover'
  }

  const RewindFunction = () => {
    if (videoRef.current) {
      videoRef.current.seekTo(videoRef.current.getCurrentTime() - 5)
    }
  }
  const FastForwardFunction = () => {
    if (videoRef.current) {
      videoRef.current.seekTo(videoRef.current.getCurrentTime() + 5)
    }
  }

  useEffect(() => {
    setInterval(() => {
      setIsHovered(false)
    }, 6000)
  }, [])

  return (
    <div
      onMouseMove={() => {
        setIsHovered(true)
      }}
      onMouseLeave={() => {
        setIsHovered(false)
      }}
      onMouseEnter={() => {
        setIsHovered(true)
      }}
      ref={videoContainerRef}
      className="z-0 items-center relative 2xl:p-[0.2vw] 2xl:pt-0 pt-0 p-[2px] bg-bl justify-center flex-col flex w-full border border-black rounded-[3px] overflow-hidden"
    >
      <div className="text-white bg-bl text-[10px] md:text-[0.7vw] 2xl:text-[0.65vw] 3xl:text-[0.75vw] flex justify-between w-full px-2 items-center ">
        <div className=" self-center ">{overlay.videoTitle}</div>
        <button
          onClick={() => {
            closeOverlay()
          }}
          className="self-center text-[#72FF41] hover:text-red-500 duration-300 cursor-pointer"
        >
          <X className="md:h-[0.8vw] cursor-pointer md:w-[0.8vw]  h-[12px] w-[12px] 3xl:h-[1.1vw] 3xl:w-[1.1vw] "></X>
        </button>
      </div>

      <div
        className={`${!isHovered ? 'opacity-0' : 'opacity-1'} duration-300 absolute z-20`}
      >
        <RewindFastFoward
          handleFastForward={FastForwardFunction}
          handleRewind={RewindFunction}
          isPlaying={isPlaying}
          handlePausePlay={() => {
            setIsPlaying((prev) => !prev)
          }}
        ></RewindFastFoward>
      </div>
      <div
        className={`${!isHovered ? 'opacity-0' : 'opacity-1'} duration-300 absolute bottom-[40px] z-20`}
      >
        <Seek
          videoRef={videoRef}
          draggableWidth={widthOfSeekingDraggable}
          width={videoContainerWidth}
          ref={seekDraggable}
        ></Seek>
      </div>

      <div className="rounded-[3px] overflow-hidden w-full">
        {
          <ReactPlayer
            onEnded={() => {
              setIsPlaying(false)
            }}
            onProgress={(state) => {
              setPlayed(state.played)
            }}
            playing={isPlaying}
            playsinline={true}
            ref={videoRef}
            controls={false}
            onStart={beginningHandler}
            height={'100%'}
            width={'100%'}
            style={{
              zIndex: 0,
              position: 'relative',
              height: 'auto !important',
              aspectRatio: '16/9',
              borderRadius: 3,
            }}
            volume={videoStates.volume}
            url={url}
          ></ReactPlayer>
        }
      </div>
    </div>
  )
}
