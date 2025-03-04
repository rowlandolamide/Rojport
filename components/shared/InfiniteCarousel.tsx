'use client'
import { ReactNode, useEffect, useRef, useState, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import useMediaQuery from '../hooks/useMediaQuery'

export default function InfiniteCarousel({
  imageNodes,
}: {
  imageNodes?: ReactNode[]
}) {
  const carouselRef: any = useRef(null)
  const [itemWidth, setItemWidth] = useState(0)
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']
  const { x } = useMediaQuery()
  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        setItemWidth(carouselRef.current.offsetWidth)
      }
    }

    updateWidth()
    window.addEventListener('resize', updateWidth)

    return () => window.removeEventListener('resize', updateWidth)
  }, [x])

  useLayoutEffect(() => {
    if (!carouselRef.current || itemWidth === 0) return // Ensure item width is set

    const tl = gsap.timeline({ repeat: -1 })
    tl.clear()

    tl.to(carouselRef.current, {
      x: `-${itemWidth}px`, // Shift by one full width
      duration: 1, // Time for each transition
      ease: 'power2.inOut',
      onComplete: () => {
        // Move first item to the end for seamless looping

        carouselRef.current.appendChild(carouselRef.current.children[0])
        gsap.set(carouselRef.current, { x: 0 }).duration(1) // Reset position instantly
      },
    }).repeatDelay(1) // Pause before the next move

    return () => {
      tl.kill()
    }
  }, [itemWidth, x])

  return (
    <div className="relative sm:w-[38vw] w-full aspect-[1/1.1] sm:aspect-[1.1/1] overflow-hidden rounded-[13px]">
      <div ref={carouselRef} className="flex ">
        {imageNodes?.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 flex items-center justify-center sm:w-[38vw]  text-white"
            style={{ width: '100%' }} // Full width item
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
