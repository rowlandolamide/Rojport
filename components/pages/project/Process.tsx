'use client'
import React from 'react'
import ProjectImage from './ProjectImage'
import ProjectDisplayVideo from './ProjectDisplayVideo'

function Process(props: {
  processSingleImageSrc?: string[]
  projectTitle: string
  processTwoImageSrcs?: { left: string; right: string }[]
  processVideoSrc?: string
}) {
  const {
    processSingleImageSrc,
    processTwoImageSrcs,
    processVideoSrc,
    projectTitle,
  } = props
  console.log(processSingleImageSrc[0])
  return (
    <div>
      {processVideoSrc && (
        <ProjectDisplayVideo
          videoTitle={`process - ${projectTitle}`}
          url={processVideoSrc}
        ></ProjectDisplayVideo>
      )}
      {processTwoImageSrcs &&
        processTwoImageSrcs?.map((item, i) => {
          return (
            <div className={`TWO-IMGS-PRJ  `} key={i}>
              <ProjectImage img={item.left}></ProjectImage>
              <ProjectImage img={item.right}></ProjectImage>
            </div>
          )
        })}
      {processSingleImageSrc &&
        processSingleImageSrc?.map((item, i) => {
          return (
            <div key={i} className="IMG-PRJ">
              <ProjectImage
                highRes={item}
                key={i}
                img={item || ''}
              ></ProjectImage>
            </div>
          )
        })}
    </div>
  )
}

export default Process
