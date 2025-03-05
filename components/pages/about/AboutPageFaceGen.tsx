'use client'
import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import useMediaQuery from '@/components/hooks/useMediaQuery'
import Image from 'next/image'
import headImage from '../../../app/head - compressed.png'

const AboutPageFaceGen = () => {
  const { x, y } = useMediaQuery()
  const floatRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<gsap.core.Tween | null>(null)

  const generate = (max: number) => Math.random() * max

  useLayoutEffect(() => {
    if (!floatRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(floatRef.current, {
        rotate: 360,
        repeat: -1,
        duration: 4,
      })
      const moveBall = () => {
        const startFromLeft = Math.random() > 0.5 // 50% chance to start left or right
        const moveUp = Math.random() > 0.5 // 50% chance to move up or down

        const offsetWidth = floatRef.current?.clientWidth
          ? floatRef.current?.clientWidth
          : 400
        const offsetHeight = floatRef.current?.clientHeight
          ? floatRef.current?.clientHeight
          : 400
        // Generate new random positions

        const startX = startFromLeft ? -offsetWidth * 1.5 : x // Start at left or right edge
        const startY = generate(y) // Random vertical start position

        // Set the end position OFF-SCREEN
        const moveDown = startY < y / 2
        const endX = startFromLeft ? x + offsetWidth * 1.5 : -offsetWidth * 1.5 // Move past the viewport
        const endY = !moveDown ? -offsetHeight : offsetHeight + 100 // Move above or below viewport

        // Instantly set the ball to the new start position
        gsap.set(floatRef.current, { x: startX, y: startY })

        // Kill previous animation before starting a new one
        if (animationRef.current) animationRef.current.kill()

        // Create a new animation
        animationRef.current = gsap.to(floatRef.current, {
          x: endX,
          y: endY,
          duration: 6,
          ease: 'power1.inOut',
          onComplete: () => {
            setTimeout(moveBall, 2000) // Restart animation after 2s delay
          },
        })
      }

      moveBall() // Start animation
    }, floatRef)

    return () => ctx.revert() // Cleanup GSAP animations on unmount
  }, [x, y])

  return (
    <div
      ref={floatRef}
      className=" fixed z-30  w-[25vw] rounded-full top-0 left-0 lg:block hidden"
    >
      <Image
        width={300}
        height={300}
        className="w-full h-fit"
        alt="head-img"
        src={headImage.src}
      ></Image>
    </div>
  )
}

export default AboutPageFaceGen
