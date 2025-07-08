'use client'
import React, { useEffect } from 'react'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function GsapInfintiteWrapper(props: { children: React.ReactNode }) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      let maxWidth = 0
      const getMaxWidth = () => {
        maxWidth = 0
        maxWidth = 1000
      }
      ScrollTrigger.addEventListener('refreshInit', getMaxWidth)
      ScrollTrigger.create({
        start: 0.1,
        end: () => {
          return ScrollTrigger.maxScroll(window) - 1
        },
        refreshPriority: -100,
        onLeave: (self) => {
          self.scroll(self.start + 1)

          ScrollTrigger.update()
        },
        onLeaveBack: (self) => {
          self.scroll(self.end - 1)

          ScrollTrigger.update()
        },
      })
    })

    return () => ctx.revert()
  }, [])
  return <div>{props.children}</div>
}

export default GsapInfintiteWrapper
