'use client'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function InfiniteCarousel({
  imageNodes,
}: {
  imageNodes?: ReactNode[]
}) {
  const carouselRef: any = useRef(null)
  const [itemWidth, setItemWidth] = useState(0)
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']

  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        setItemWidth(carouselRef.current.offsetWidth)
      }
    }

    updateWidth()
    window.addEventListener('resize', updateWidth)

    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  useEffect(() => {
    if (itemWidth === 0) return // Ensure item width is set

    const tl = gsap.timeline({ repeat: -1 })

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
  }, [itemWidth])

  return (
    <div className="relative w-[200px]  overflow-hidden">
      <div ref={carouselRef} className="flex ">
        {imageNodes?.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 flex items-center justify-center bg-blue-500 text-white"
            style={{ width: itemWidth, height: '200px' }} // Full width item
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
