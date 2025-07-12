'use client'
import type { EncodeDataAttributeCallback } from '@sanity/react-loader'

import AboutPageFaceGen from './AboutPageFaceGen'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import AboutUsTitle from '../../../app/public/Images/AboutUsTitle.svg'

import { CustomPortableText } from '@/components/shared/CustomPortableText'
import type { AboutPayload } from '@/types'
import RojIconSvg from '../../../app/public/Icons/Roj Icon Svg.svg'
import InfiniteCarousel from '@/components/shared/InfiniteCarousel'
import { urlForImage } from '@/sanity/lib/utils'
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
              <h2 className="DISCI-TEXT-PRJ leading-[40px]" key={index}>
                {links ? (
                  <a
                    target="_blank"
                    className="hover:underline duration-300"
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
  console.log('sdsd', technicalAbilities)
  const TechnicalAbilities = {
    name: 'Awards',
    data: technicalAbilities?.map((item: any) => item.name),
  }
  const [genFace, setGenFace] = useState(false)
  const PressAndAwards = {
    name: 'Press and Speaking',
    data: pressAndAwards?.map((item: any) => item.title),
    links: pressAndAwards?.map((item) => item.link),
  }
  const Services = { name: 'Services', data: services }

  return (
    <div className="w-full xl:pb-[10.65vw] md:pb-[230px] xl:pt-[11.4vw] md:pt-[246px] pt-[90px] pb-[120px] flex flex-col items-center">
      {genFace && <AboutPageFaceGen></AboutPageFaceGen>}
      <div className="w-full flex flex-col items-center">
        <Image
          src={AboutUsTitle.src}
          width={100}
          height={100}
          alt="Roj the goat"
          className={cn('sm:w-[65vw] w-full')}
        ></Image>
        <div className="w-full flex flex-col items-center">
          <div
            onClick={() => {
              setGenFace(true)
            }}
            className=" md:py-[180px] py-[60px] xl:py-[8.3vw] flex flex-col md:items-center gap-y-[20px] md:gap-y-[39px] xl:gap-y-[1.8vw]"
          >
            {/* About image */}
            <InfiniteCarousel
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
            ></InfiniteCarousel>

            <div className="flex justify-center ">
              {' '}
              <div className=" MONO-LO w-fit">Portrait by DANIELLA ALMONA </div>
            </div>
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
              <h2 className=" md:w-[42vw] 2xl:w-[32.7vw]  TEXT-CNT-ABT leading-[32px]  ">
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
      </div>
    </div>
  )
}

export default AboutPage
