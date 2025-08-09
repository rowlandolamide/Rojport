'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ReactPlayer from 'react-player'
import { useRef, useState } from 'react'
import { useContext } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ContextMain,
  MainContextWrapperType,
} from '@/components/global/ContextWrapper'
import useMediaQuery from '@/components/hooks/useMediaQuery'
import { cn } from '@/lib/utils'

function RedesignProjectCard(props: {
  img: string
  title: string
  nextProjectItem?: boolean
  slug: string
  tag: any
  video?: string
  mobileVideo?: string
}) {
  const { x } = useMediaQuery()
  const isMobile = 460 > x
  const videoRef = useRef<ReactPlayer>(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const { img, title, tag, slug, nextProjectItem } = props
  const { handleMouseStateChange } = useContext(
    ContextMain,
  ) as MainContextWrapperType
  useEffect(() => {
    if (videoRef.current) {
      setTimeout(() => {
        setIsVideoPlaying(true)
      }, 1000)
    }
  }, [isVideoPlaying, videoRef])
  return (
    <Link
      onMouseLeave={() => {
        handleMouseStateChange(null, 0)
      }}
      onMouseOver={() => {
        handleMouseStateChange(title, 2)
      }}
      className="group relative overflow-hidden"
      href={nextProjectItem ? slug : `projects/${slug}`}
    >
      <div className="w-full h-full">
        <div className="HOME-CNT-PRJ w-full h-full">
          {isVideoPlaying}
          <div
            className={cn(
              'w-full  overflow-hidden HOME-PRJ-ROUNDED group',
              nextProjectItem ? 'h-full' : 'h-full',
            )}
          >
            <div
              className={cn(
                'w-full h-full  hidden',
                nextProjectItem && 'hidden',
                props.video ? 'block' : 'hidden',
              )}
            >
              {/* This element should be ontop before Video renders */}
              <AnimatePresence>
                {!isVideoReady && (
                  <motion.div
                    key="video-placeholder"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    className="absolute top-0 left-0 w-full h-fit z-30 overflow-hidden rounded-[15px]"
                  >
                    <Image
                      className={cn(
                        'w-full h-[60vw] object-cover md:h-[34vw] group-hover:scale-[1.02] duration-500 ease ',
                      )}
                      src={img}
                      width={600}
                      height={500}
                      alt={title}
                      priority
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <ReactPlayer
                height={'100%'}
                ref={videoRef}
                width={'100%'}
                style={{
                  zIndex: 0,
                  position: 'relative',

                  borderRadius: 3,
                  objectFit: 'cover',
                  objectPosition: 'center',
                  height: 'auto !important',
                  scale: '1.4',
                  aspectRatio: '4.3/3',
                }}
                playing={isVideoPlaying}
                url={isMobile ? props.mobileVideo : props.video}
                playIcon={<></>}
                onReady={() => setIsVideoReady(true)}
                loop={true}
                muted={true}
                playsinline={true}
              ></ReactPlayer>
            </div>
            <Image
              className={cn(
                ' w-full   h-[60vw] object-cover sm:object-fit sm:h-[34vw] group-hover:scale-[1.02] duration-500 ease',
                nextProjectItem &&
                  'h-full aspect-3/2 object-cover sm:h-full sm:object-cover',
                props.video && 'hidden',
              )}
              src={img}
              width={600}
              unoptimized
              height={500}
              alt={title}
            ></Image>
          </div>
          {/*  <div className="HOME-CNT-TEXT-PRJ justify-between hidden">
            <span className="HOME-TXT-TITLE "> {title}</span>{' '}
            {tag.slice(0, 1).map((item: any, index: number) => {
              return (
                <span
                  key={index}
                  className="MONO-NAV-PASSAGE text-[15px] 2xl:text-[0.7rem]"
                >
                  {item}
                </span>
              )
            })}
          </div> */}
        </div>
      </div>
    </Link>
  )
}

export default RedesignProjectCard
