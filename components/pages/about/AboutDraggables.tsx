'use client'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import Image from 'next/image'

export interface DraggableImageProps {
  src: string
  width: number
  x: number
  y: number
  rotation: number
  alt?: string
  style: string
  imgStyles: string
}

const DraggableImage = ({
  src,
  width,
  style,
  x = 0,
  y = 0,
  imgStyles,
  rotation = 0,
  alt = 'draggable image',
}: DraggableImageProps) => {
  return (
    <motion.div
      drag
      dragMomentum={false}
      whileTap={{ cursor: 'grabbing' }}
      style={{
        position: 'absolute',
        cursor: 'grab',
        width: 250,
        rotate: rotation,
      }}
      className={style}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={0}
        unoptimized
        className={cn('max-w-[250px] ')}
      />
    </motion.div>
  )
}

function AboutDraggables(props: { dragArr: DraggableImageProps[] }) {
  return (
    <div className="h-[22vw] w-[100vw] relative ">
      {props.dragArr.map((i) => (
        <DraggableImage
          src={i.src}
          style={i.style}
          imgStyles={i.imgStyles}
          width={i.width}
          x={i.x}
          y={i.y}
          rotation={i.rotation}
        ></DraggableImage>
      ))}
    </div>
  )
}

export default AboutDraggables
