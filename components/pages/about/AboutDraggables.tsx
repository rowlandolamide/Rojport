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
 newStyle?: string
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
  newStyle
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
      className={cn( newStyle,'z-0  w-fit ')}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={0}
        unoptimized
        className={cn('max-w-[35vw]   sm:max-w-[10vw] ')}
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
          newStyle={i.newStyle}
          y={i.y}
          rotation={i.rotation}
        ></DraggableImage>
      ))}
    </div>
  )
}

export default AboutDraggables
