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
    <div className="relative">
      <h1 className="MONO-NAV-PASSAGE mb-[23px] w-fit text-bl">{name}</h1>
      {data && (
        <div>
          {data.map((item: any, index: number) => {
            return (
              <h2 className="DISCI-TEXT-PRJ-ABOUT leading-[40px]" key={index}>
                {links ? (
                  <a
                    target="_blank"
                    className="hover:underline hover:text-bl duration-300"
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

  const baseDraggables: DraggableImageProps[] = [
    {
      /* Silverball  */
      src: dragOne.src,
      width: 300,
      x: 30,
      y: 30,
      rotation: 0,
      imgStyles: 'w-[11.57vw]',
      alt: 'vl',
      style: 'right-[24.13vw] sm:right-[27vw]  top-[6.43vw] absolute',
    },
    {
      /* Silver Car */
      src: dragTwo.src,
      width: 300,
      x: 30,
      y: 30,
      rotation: 0,
      imgStyles: 'w-[16.2vw]',
      alt: 'vl',
      style: 'left-[18.43vw] z-20 top-[1.25vw] w-[16.2vw] absolute',
    },
    {
      /* Made With Love Light */
      src: dragThree.src,
      width: 300,
      x: 30,
      y: 30,
      rotation: 20,
      alt: 'vl',
      imgStyles: 'w-[11.57vw]',
      style:
        ' left-[-15vw] sm:left-[12.45vw] top-[-9.26vw] w-[11.57vw] absolute',
    },

    {
      /* Red BG "R" */
      src: dragFour.src,
      width: 300,
      x: 30,
      y: 30,
      rotation: -15,
      alt: 'vl',
      imgStyles: 'w-[11.57vw]',
      style:
        'top-[70px] sm:top-[1.25vw] absolute sm:left-[31.48vw] left-[4.23vw] w-[11.57vw]',
    },
    {
      /* Purple BG "R" */
      src: dragFive.src,
      width: 300,
      x: 30,
      y: 30,
      rotation: 0,
      imgStyles: 'w-[11.57vw]',
      alt: 'vl',
      style:
        ' top-[-7.87vw]  absolute right-[-14vw] sm:right-[4.26vw] w-[11.57vw]',
    },
    {
      /* Made with Coffee and Love Dark*/
      src: dragSix.src,
      width: 300,
      x: 30,
      y: 30,
      rotation: 0,
      imgStyles: 'w-[11.57vw]',
      alt: 'vl',
      style:
        ' top-[0.65vw]  absolute right-[1.74vw] sm:right-[15.14vw] w-[11.57vw]',
    },
    {
      /* Be Kind Sticker*/
      src: dragSeven.src,
      width: 300,
      x: 30,
      y: 30,
      rotation: 0,
      imgStyles: 'w-[11.57vw]',
      alt: 'vl',
      style:
        ' sm:top-[1.67vw] top-[10vw]  absolute right-[42.04vw] sm:right-[30.51vw] w-[37.06vw] sm:w-[11.57vw]',
    },
  ]
  const draggables: DraggableImageProps[] = baseDraggables.map(
    (item, index) => {
      const draggableImage: any = aboutImageDraggables
        ? aboutImageDraggables[index]
        : ''

      const src = draggableImage
        ? urlForImage(draggableImage)?.width(1000)?.url()
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
          className="absolute z-20 "
        >
          {Array.from({ length: 3 }).map((i, index) => (
            <Image
              src={AboutMarquee.src}
              width={100}
              height={100}
              key={index}
              alt="Roj the goat"
              className={cn(
                'sm:w-[145vw] w-[259vw] mx-[14px] sm:mx-[20px] xl:mx-[1.5vw]',
              )}
            ></Image>
          ))}
        </Marquee>

        <div className="w-full flex flex-col items-center GEN-PAD">
          <div
            onMouseLeave={() => {
              handleLeaveLink()
            }}
            onMouseOver={() => {
              handleHoverLink()
            }}
            onClick={() => {
              setGenFace(true)
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
          </div>
          <div className="flex w-full justify-center  2xl:gap-x-[4.63vw]  md:gap-x-[100px]  ">
            {overview && (
              <h2 className=" md:w-[42vw] 2xl:w-[32.7vw] w-full  max-w-[555px]  TEXT-CNT-ABT leading-[24px] sm:leading-[32px]   ">
                <h1 className="MONO-NAV-PASSAGE mb-[23px] w-fit text-bl">
                  ABOUT ME
                </h1>
                <>
                  <CustomPortableText value={overview}></CustomPortableText>
                  <a
                    onMouseOver={() => {
                      handleHoverLink()
                    }}
                    onMouseLeave={() => {
                      handleLeaveLink()
                    }}
                    className="sm:mt-[57px] mt-[25.19px]  flex gap-x-[0.3vw] sm:gap-x-[0.15vw] items-center  hover:text-bl duration-300 TEXT-DOWNLOAD-RESUME"
                    href={
                      pdfFile
                        ? `/api/download?url=${pdfFile.asset.url}&filename="ROWLAND OLAMIDE'S RESUME"`
                        : '/'
                    }
                    download="ROWLAND OLAMIDE'S RESUME.pdf "
                  >
                    <ArrowUpRight
                      className="2xl:w-[0.8vw] lg:w-[0.7vw] w-[13px] "
                      strokeWidth={'1'}
                    ></ArrowUpRight>{' '}
                    <span> DOWNLOAD RESUME [PDF]</span>
                  </a>
                </>
              </h2>
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
          <div className=" w-full sm:items-start sm:justify-center flex md:gap-x-[100px] flex-col md:flex-row xl:gap-x-[4.63vw]  ">
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
        <div className="xl:text-[2.96vw] sm:text-[32px] md:text-[48px] text-[5.88vw] flex flex-col md:mt-[180px] mt-[60px] xl:mt-[8.3vw] sm:pb-0 pb-[30px] justify-center items-center font-Ingram leading-[1] group">
          <a
            onMouseOver={() => {
              handleHoverLink()
            }}
            onMouseLeave={() => {
              handleLeaveLink()
            }}
            className="text-center"
            href={`mailto:${process.env.NEXT_PUBLIC_ROJ_EMAIL || '/'}`}
            target="_blank"
          >
            {' '}
            CRAFT THE UNEXPECTED
            <div className="group-hover:text-bl duration-300 flex gap-x-[2vw] md:gap-x-[1vw] items-center">
              <Image
                alt="Star"
                width={400}
                height={400}
                className=" w-[3vw] h-[3vw] origin-center transition-transform
           group-hover:animate-magic-spin "
                src={starIcon.src}
              ></Image>
              <span className="">OLAMIDE@ROJTHEGOAT.COM</span>
            </div>
          </a>
        </div>
        <div className="mt-[40px]">
          <AboutDraggables dragArr={draggables}></AboutDraggables>
        </div>
        <div className="w-full flex justify-center items-center absolute bottom-[250px] md:bottom-[11vw]">
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
      </div>
    </div>
  )
}

export default AboutPage
