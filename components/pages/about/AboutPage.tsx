'use client'
import type { EncodeDataAttributeCallback } from '@sanity/react-loader'

import AboutPageFaceGen from './AboutPageFaceGen'
import Marquee from 'react-fast-marquee'
import FloatingHead from '../../../app/public/Roj About Floating Head.svg'
import AboutMarquee from '../../../app/public/About Marquee.svg'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import AboutUsTitle from '../../../app/public/Images/AboutUsTitle.svg'
import useMediaQuery from '@/components/hooks/useMediaQuery'
import { CustomPortableText } from '@/components/shared/CustomPortableText'
import type { AboutPayload } from '@/types'
import RojIconSvg from '../../../app/public/Icons/Roj Icon Svg.svg'
import { DraggableImageProps } from './AboutDraggables'

import AboutDraggables from './AboutDraggables'
import dragOne from '../../../app/public/Images/About Draggables/drag-ab-1.png'
import dragTwo from '../../../app/public/Images/About Draggables/drag-ab-2.png'
import dragThree from '../../../app/public/Images/About Draggables/drag-ab-3.png'
import dragFour from '../../../app/public/Images/About Draggables/drag-ab-4.png'
import dragFive from '../../../app/public/Images/About Draggables/drag-ab-5.svg'
import dragSix from '../../../app/public/Images/About Draggables/drag-ab-6.png'
import dragSeven from '../../../app/public/Images/About Draggables/drag-ab-7.png'
import { useState } from 'react'

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
                    className="underline hover:text-bl duration-300"
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
              isMoreDetailSection ? '' : 'hidden',
            )}
          >
            Reach out to{' '}
            <a
              target="_blank"
              className="underline hover:text-bl"
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
  } = data ?? {}

  const draggables: DraggableImageProps[] = [
    {
      /* Silverball  */
      src: dragOne.src,
      width: 300,
      x: 30,
      y: 30,
      rotation: 0,
      imgStyles: 'w-[11.57vw]',
      alt: 'vl',
      style: 'right-[27vw]  top-[6.43vw] absolute',
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
      style: 'left-[12.45vw] top-[-9.26vw] w-[11.57vw] absolute',
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
      style: ' top-[1.25vw] absolute left-[31.48vw] w-[11.57vw]',
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
      style: ' top-[-7.87vw]  absolute right-[4.26vw] w-[11.57vw]',
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
      style: ' top-[0.65vw]  absolute right-[15.14vw] w-[11.57vw]',
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
      style: ' top-[1.67vw]  absolute right-[30.51vw] w-[11.57vw]',
    },
  ]

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

  return (
    <div className="w-full  xl:pt-[11.4vw] lg:pt-[246px] md:pt-[150px] pt-[20px] pb-[120px] flex flex-col items-center">
      {genFace && <AboutPageFaceGen></AboutPageFaceGen>}

      <div className="w-full flex flex-col items-center">
        <Image
          src={AboutUsTitle.src}
          width={100}
          height={100}
          alt="Roj the goat"
          className={cn('sm:w-[65vw] w-full hidden')}
        ></Image>
        <Marquee speed={x > 1460 ? 200 : 100} className="absolute z-40 ">
          {Array.from({ length: 3 }).map((i) => (
            <Image
              src={AboutMarquee.src}
              width={100}
              height={100}
              alt="Roj the goat"
              className={cn(
                'sm:w-[145vw] w-[259vw] mx-[14px] sm:mx-[20px] xl:mx-[1.5vw]',
              )}
            ></Image>
          ))}
        </Marquee>

        <div className="w-full flex flex-col items-center GEN-PAD">
          <div
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
              className="w-full object-top h-full object-cover "
              alt="about page"
              src={FloatingHead.src}
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
          <div className=" w-full sm:items-start sm:justify-center flex md:gap-x-[100px] flex-col md:flex-row xl:gap-x-[4.63vw]  ">
            <Image
              src={RojIconSvg.src}
              width={100}
              height={100}
              alt="Roj the goat Icon"
              className={cn('w-[56px] sm:w-[94px] xl:w-[4.35vw] mb-[40px]')}
            ></Image>
            {overview && (
              <h2 className=" md:w-[42vw] 2xl:w-[32.7vw]  TEXT-CNT-ABT leading-[32px]   ">
                <CustomPortableText value={overview}></CustomPortableText>
              </h2>
            )}
            <div className="md:block hidden">
              <ListContainer
                isMoreDetailSection={true}
                {...Services}
              ></ListContainer>
            </div>
            <div className="space-y-[2.78vw] md:block hidden">
              <ListContainer {...PressAndAwards}></ListContainer>
              <ListContainer {...TechnicalAbilities}></ListContainer>
            </div>

            <div>
              <div className="flex md:hidden justify-between w-full  mt-[80px]">
                <ListContainer {...Services}></ListContainer>
                <div className="space-y-[53px]">
                  <ListContainer {...PressAndAwards}></ListContainer>
                  <ListContainer {...TechnicalAbilities}></ListContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="xl:text-[2.96vw] sm:text-[32px] md:text-[48px] text-[24px] flex flex-col md:pt-[180px] pt-[60px] xl:pt-[8.3vw] justify-center items-center font-Ingram leading-[1]">
          <div> CRAFT THE UNEXPECTED</div>
          <div>✨OLAMIDE@ROJTHEGOAT.COM</div>
        </div>
        <div className="">
          <AboutDraggables dragArr={draggables}></AboutDraggables>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
