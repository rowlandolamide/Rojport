'use client'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import Image from 'next/image'
import useMediaQuery from '@/components/hooks/useMediaQuery'

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
  const { x: bigX } = useMediaQuery()

  return (
    <motion.div
      drag={bigX > 760}
      dragMomentum={false}
      whileTap={{ cursor: 'grabbing' }}
      style={{
        position: 'absolute',
        cursor: 'grab',
        width: 'fit',
        rotate: rotation,
      }}
      className={cn(style, 'z-0')}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={0}
        unoptimized
        className={cn('max-w-[27vw] sm:max-w-[250px]')}
      />
    </motion.div>
  )
}

function AboutDraggables(props: { dragArr: DraggableImageProps[] }) {
  return (
    <div className="h-[22vw] w-[100vw] relative   ">
      {props.dragArr.map((i, index) => (
        <DraggableImage
          src={i.src}
          key={index}
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
