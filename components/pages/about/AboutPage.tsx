'use client'
import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import starIcon from '../../../app/public/Images/star-single.svg'
import { useContext } from 'react'
import { MainContextWrapperType } from '@/components/global/ContextWrapper'
import { ContextMain } from '@/components/global/ContextWrapper'
import AboutPageFaceGen from './AboutPageFaceGen'
import Marquee from 'react-fast-marquee'
import FloatingHead from '../../../app/public/Roj About Floating Head.svg'
import FloatingHeadMobile from '../../../app/public/head-mobile.png'
import AboutMarquee from '../../../app/public/About Marquee.svg'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import AboutUsTitle from '../../../app/public/Images/AboutUsTitle.svg'
import useMediaQuery from '@/components/hooks/useMediaQuery'
import { CustomPortableText } from '@/components/shared/CustomPortableText'
import type { AboutPayload } from '@/types'
import RojIconSvg from '../../../app/public/Icons/Roj Icon Svg.svg'
import { DraggableImageProps } from './AboutDraggables'
import { urlForImage } from '@/sanity/lib/utils'
import {motion} from "framer-motion"

import AboutDraggables from './AboutDraggables'
import dragOne from '../../../app/public/Images/About Draggables/drag-ab-1.png'
import dragTwo from '../../../app/public/Images/About Draggables/drag-ab-2.png'
import dragThree from '../../../app/public/Images/About Draggables/drag-ab-3.png'
import dragFour from '../../../app/public/Images/About Draggables/drag-ab-4.png'
import dragFive from '../../../app/public/Images/About Draggables/drag-ab-5.svg'
import dragSix from '../../../app/public/Images/About Draggables/drag-ab-6.png'
import dragSeven from '../../../app/public/Images/About Draggables/drag-ab-7.png'
import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

export interface AboutPageProps {
  data: AboutPayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

const ListContainer = ({
  data,
  name,
  links,
  isMoreDetailSection,
}: {
  data: any
  name: string
  links?: string[]
  isMoreDetailSection?: boolean
}) => {

  return (
    <div className="relative sm:max-w-none max-w-[150px] ">
      <div className="MONO-NAV-PASSAGE mb-[23px] w-fit text-bl">{name}</div>
      {data && (
        <div>
          {data.map((item: any, index: number) => {
            return (
              <h2 className="DISCI-TEXT-PRJ-ABOUT leading-[40px]" key={index}>
                {links ? (
                  <a
                    target="_blank"
                    className="text-blue-600 underline hover:text-blue-800 cursor-pointer  duration-300"
                    href={links[index]}
                  >
                    {item}
                  </a>
                ) : (
                  item
                )}
              </h2>
            )
          })}
          <div
            className={cn(
              'TEXT-MORE-DETAILS  w-full md:w-[19.58vw] mt-[80px]',
              isMoreDetailSection ? 'hidden' : 'hidden',
            )}
          >
            Reach out to{' '}
            <a
              target="_blank"
              className="hover:underline hover:text-bl"
              href="mailto:olamide@rojthegoat.com"
            >
              olamide@rojthegoat.com
            </a>{' '}
            for licensing. Imagery on this website may be available for
            exclusive or non exclusive licensing.
          </div>
        </div>
      )}
    </div>
  )
}

export function AboutPage({ data }: AboutPageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const {
    title,
    overview,
    aboutImage,
    pressAndAwards,
    services,
    technicalAbilities,
    aboutImageDraggables,
    pdfFile,
    aboutImageBouncingImage,
    aboutImageMainFace,
    aboutImageMainMobileFace,
  } = data ?? {}

  const baseDraggables: DraggableImageProps[] =[
  {
    /* Silverball - Circle 5 */
    src: dragOne.src,
    width: 300,
    x: 30,
    y: 30,
    rotation: 0,
    imgStyles: 'w-[11.57vw]',
    alt: 'vl',
    style: 'right-[24.13vw] sm:right-[27vw]  top-[6.43vw] absolute',
    newStyle: 'top-[25.87vw] left-[86vw] absolute -translate-x-1/2 -translate-y-1/2',
  },
  {
    /* Silver Car - Circle 2 */
    src: dragTwo.src,
    width: 300,
    x: 30,
    y: 30,
    rotation: 0,
    imgStyles: 'w-[16.2vw]',
    alt: 'vl',
    style: 'left-[18.43vw] z-20 top-[1.25vw] w-[16.2vw] absolute',
    newStyle: 'top-[37vw] left-[9vw] absolute -translate-x-1/2 -translate-y-1/2',
  },
  {
    /* Made With Love Light - Circle 1 */
    src: dragThree.src,
    width: 300,
    x: 30,
    y: 30,
    rotation: 20,
    alt: 'vl',
    imgStyles: 'w-[11.57vw]',
    style: ' left-[-15vw] sm:left-[12.45vw] top-[-9.26vw] w-[11.57vw] absolute',
    newStyle: 'top-[14.06vw] left-[10vw] absolute -translate-x-1/2 -translate-y-1/2',
  },
  {
    /* Red BG "R" - Circle 3 */
    src: dragFour.src,
    width: 300,
    x: 30,
    y: 30,
    rotation: -15,
    alt: 'vl',
    imgStyles: 'w-[11.57vw]',
    style: 'top-[70px] sm:top-[1.25vw] absolute sm:left-[31.48vw] left-[4.23vw] w-[11.57vw]',
    newStyle: 'top-[22.5vw] left-[37vw] absolute -translate-x-1/2 -translate-y-1/2',
  },
  {
    /* Purple BG "R" - Circle 7 */
    src: dragFive.src,
    width: 300,
    x: 30,
    y: 30,
    rotation: 0,
    imgStyles: 'w-[11.57vw]',
    alt: 'vl',
    style: ' top-[-7.87vw]  absolute right-[-14vw] sm:right-[4.26vw] w-[11.57vw]',
    newStyle: 'top-[50.06vw] left-[80vw] absolute -translate-x-1/2 -translate-y-1/2',
  },
  {
    /* Made with Coffee and Love - Circle 6 */
    src: dragSix.src,
    width: 300,
    x: 30,
    y: 30,
    rotation: 0,
    imgStyles: 'w-[11.57vw]',
    alt: 'vl',
    style: ' top-[0.65vw]  absolute right-[1.74vw] sm:right-[15.14vw] w-[11.57vw]',
    newStyle: 'top-[6.18vw] left-[80vw] absolute -translate-x-1/2 -translate-y-1/2',
  },
  {
    /* Be Kind Sticker - Circle 4 */
    src: dragSeven.src,
    width: 300,
    x: 30,
    y: 30,
    rotation: 0,
    imgStyles: 'w-[11.57vw]',
    alt: 'vl',
    style: ' sm:top-[1.67vw] top-[10vw]  absolute right-[42.04vw] sm:right-[30.51vw] w-[37.06vw] sm:w-[11.57vw]',
    newStyle: 'top-[20vw] left-[58vw] absolute -translate-x-1/2 -translate-y-1/2  w-[37.06vw] sm:w-[11.57vw]',
  },
]


  
  const draggables: DraggableImageProps[] = baseDraggables.map(
    (item, index) => {
      const draggableImage: any = aboutImageDraggables
        ? aboutImageDraggables[index]
        : ''

      const src = draggableImage
        ? urlForImage(draggableImage)?.width(1500).quality(100)?.url()
        : ''

      return {
        ...item,
        src: draggableImage ? (src ? src : '') : item.src, // fallback to existing src
        alt: item.alt,
      }
    },
  )

  const TechnicalAbilities = {
    name: 'Awards',
    data: technicalAbilities?.map((item: any) => item.name),
    links: technicalAbilities?.map((item: any) => item.link.current),
  }
  const [genFace, setGenFace] = useState(false)
  const PressAndAwards = {
    name: 'Press and Speaking',
    data: pressAndAwards?.map((item: any) => item.title),
    links: pressAndAwards?.map((item) => item.link),
  }
  const Services = {
    name: 'Services',
    data: services,
  }

  const { x } = useMediaQuery()

  const { handleMouseStateChange } = useContext(
    ContextMain,
  ) as MainContextWrapperType

  const handleHoverLink = () => {
    handleMouseStateChange(null, 3)
  }
  const handleHoverFace = () => {
    handleMouseStateChange(null, 2)
  }
  const handleLeaveLink = () => {
    handleMouseStateChange(null, 0)
  }

  const AboutImage = aboutImageMainFace
    ? urlForImage(aboutImageMainFace)?.url()
    : ''
  const AboutImageMobile = aboutImageMainFace
    ? urlForImage(aboutImageMainMobileFace)?.url()
    : ''
  const AboutImageBounce = aboutImageMainFace
    ? urlForImage(aboutImageBouncingImage)?.url()
    : ''

  return (
    <div className="w-full overflow-hidden  xl:pt-[11.4vw] lg:pt-[246px] md:pt-[150px] pt-[20px] pb-[120px] flex flex-col items-center">
      {genFace && (
        <AboutPageFaceGen
          bouncingImageUrl={AboutImageBounce || ''}
        ></AboutPageFaceGen>
      )}

      

      <div className="w-full flex flex-col items-center">
        <Image
          src={AboutUsTitle.src}
          width={100}
          height={100}
          alt="Roj the goat"
          className={cn('sm:w-[65vw] w-full hidden')}
        ></Image>
        <Marquee
          direction="right"
          speed={x > 1460 ? 200 : 100}
          className=" z-20 h-fit"
        >
          {Array.from({ length: 3 }).map((i, index) => (
            <Image
              src={AboutMarquee.src}
              width={100}
              height={100}
              key={index}
              alt="Roj the goat"
              className={cn(
                'sm:w-[145vw] h-[45px] sm:h-fit w-[259vw] mx-[14px] sm:mx-[20px] xl:mx-[1.5vw]',
              )}
            ></Image>
          ))}
        </Marquee>

        <div className="w-full flex flex-col items-center GEN-PAD">
          <motion.div
            onMouseLeave={() => {
              handleLeaveLink()
            }}
            onMouseOver={() => {
              handleHoverLink()
            }}
            onClick={() => {
              setGenFace(true)
            }}
              whileTap={{
    scale: 0.98,
  }}
  transition={{
    type: "spring",
    stiffness: 400,
    damping: 30,
  }}
            className=" md:py-[180px] py-[60px] xl:py-[8.3vw] flex flex-col md:items-center gap-y-[20px] md:gap-y-[39px] xl:gap-y-[1.8vw]"
          >
            {/* About image */}
            <Image
              width={500}
              height={300}
              unoptimized
              className="sm:w-full max-w-[494px] m w-[55vw] hidden sm:block object-top h-full object-cover "
              alt="about page"
              src={AboutImage ? AboutImage : FloatingHead.src}
            ></Image>
            <Image
              width={500}
              height={300}
              unoptimized
              className="sm:w-full w-[55vw] sm:hidden object-top h-full object-cover max-w-[228px]"
              alt="about page"
              src={AboutImageMobile ? AboutImageMobile : FloatingHeadMobile.src}
            ></Image>
            {/*       <InfiniteCarousel
              imageNodes={aboutImage?.map((item: any, i) => {
                const imageUrl = item && urlForImage(item)?.quality(100)?.url()
                return (
                  <Image
                    key={i}
                    width={500}
                    height={300}
                    unoptimized
                    className="w-full object-top h-full object-cover "
                    alt="about page"
                    src={imageUrl}
                  ></Image>
                )
              })}
            ></InfiniteCarousel> */}
          </motion.div>
          <div className="flex w-full justify-center  2xl:gap-x-[4.63vw]  md:gap-x-[100px]  ">
            {overview && (
              <h1 className=" md:w-[42vw] 2xl:w-[32.7vw] w-full  max-w-[555px]  TEXT-CNT-ABT leading-[24px] sm:leading-[32px]   ">
                <h1 className="MONO-NAV-PASSAGE mb-[23px] w-fit text-bl">
                  ABOUT ME
                </h1>
                <>
                  <CustomPortableText  value={overview}></CustomPortableText>
                  <a
                    onMouseOver={() => {
                      handleHoverLink()
                    }}
                    onMouseLeave={() => {
                      handleLeaveLink()
                    }}
                    className="sm:mt-[57px] mt-[25.19px]  flex gap-x-[0.3vw] sm:gap-x-[0.15vw] items-center cursor-pointer  hover:text-bl duration-300 TEXT-DOWNLOAD-RESUME"
                  href={
  pdfFile
    ? `/api/download?url=${encodeURIComponent(
        pdfFile.asset.url
      )}&filename=${encodeURIComponent("ROWLAND_OLAMIDE_RESUME.pdf")}`
    : "/"
}
                    download="ROWLAND OLAMIDE'S RESUME.pdf"
                  >
                    <ArrowUpRight
                      className="2xl:w-[1.1vw] w-[20px] cursor-pointer "
                      strokeWidth={'1'}
                    ></ArrowUpRight>{' '}
                    <span className='cursor-pointer'> DOWNLOAD RESUME [PDF]</span>
                  </a>
                </>
              </h1>
            )}
            <div className="lg:block hidden">
              <ListContainer
                isMoreDetailSection={true}
                {...Services}
              ></ListContainer>
            </div>
            <div className="space-y-[2.78vw] lg:block hidden">
              <ListContainer {...PressAndAwards}></ListContainer>
              <ListContainer {...TechnicalAbilities}></ListContainer>
            </div>
          </div>
          <div className=" w-full  sm:items-start sm:justify-center flex md:gap-x-[100px] flex-col md:flex-row xl:gap-x-[4.63vw]  ">
            <div className="w-full ">
              <div className="flex lg:hidden justify-between w-full sm:px-[10vw]  mt-[80px]">
                <ListContainer {...Services}></ListContainer>
                <div className="space-y-[53px]">
                  <ListContainer {...PressAndAwards}></ListContainer>
                  <ListContainer {...TechnicalAbilities}></ListContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
       <div className='md:mt-[180px] mt-[60px] xl:mt-[8.3vw] sm:pb-0 pb-[30px]'>
            <div className="w-full flex justify-center items-center  ">
          <Image
            src={RojIconSvg.src}
            width={100}
            height={100}
            alt="Roj the goat Icon"
            className={cn(
              'min-w-[45px] w-[14vw] sm:w-[94px] xl:w-[4.35vw] mb-[40px] ',
            )}
          ></Image>
        </div>
         <div className="xl:text-[2.96vw] sm:text-[32px] md:text-[48px] text-[5.88vw] flex flex-col  justify-center items-center font-Ingram leading-[1] group">
          <a
            onMouseOver={() => {
              handleHoverLink()
            }}
            onMouseLeave={() => {
              handleLeaveLink()
            }}
            className="text-center cursor-pointer"
            href={`mailto:${process.env.NEXT_PUBLIC_ROJ_EMAIL || '/'}`}
            target="_blank"
          >
            {' '}
            CRAFT THE UNEXPECTED
            <div className="group-hover:text-bl duration-300 flex gap-x-[2vw] md:gap-x-[1vw] items-center cursor-pointer">
              <Image
                alt="Star"
                width={400}
                height={400}
                className="sm:min-w-[40px] sm:min-h-[40px] w-[3vw] h-[3vw] origin-center transition-transform
           group-hover:animate-magic-spin "
                src={starIcon.src}
              ></Image>
              <span className="cursor-pointer">OLAMIDE@ROJTHEGOAT.COM</span>
            </div>
          </a>
        </div>
       </div>
        <div className="sm:fixed z-10 mt-[40px]  sm:top-[-8.5vh] bottom-0">
          <AboutDraggables dragArr={draggables}></AboutDraggables>
        </div>
    
      </div>
    </div>
  )
}

export default AboutPage
