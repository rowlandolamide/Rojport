import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import Link from 'next/link'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import AboutUsTitle from '../../../app/public/Images/AboutUsTitle.svg'
import AboutImageBox from '@/components/shared/AboutImageBox'
import { CustomPortableText } from '@/components/shared/CustomPortableText'
import type { AboutPayload } from '@/types'
import RojIconSvg from '../../../app/public/Icons/Roj Icon Svg.svg'

import ProfilePicture from '../../../app/public/Images/Profile Image.png'

export interface AboutPageProps {
  data: AboutPayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

const ListContainer = ({ data, name }: { data: any; name: string }) => {
  return (
    <div>
      <div className="MONO-LO mb-[23px]">{name}</div>
      {data && (
        <div>
          {data.map((item: any, index: number) => {
            return (
              <div className="DISCI-TEXT-PRJ leading-[40px]" key={index}>
                {item}
              </div>
            )
          })}
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

  const TechnicalAbilities = {
    name: 'Technical Abilities',
    data: technicalAbilities,
  }
  const PressAndAwards = { name: 'Press and Awards', data: pressAndAwards }
  const Services = { name: 'Services', data: services }

  console.log('data', PressAndAwards, data)

  return (
    <div className=" xl:pb-[10.65vw] pb-[230px] xl:pt-[11.4vw] pt-[246px] flex flex-col items-center">
      <div className="w-full flex flex-col items-center">
        <Image
          src={AboutUsTitle.src}
          width={100}
          height={100}
          alt="Roj the goat"
          className={cn('w-[65vw] ')}
        ></Image>
        <div className="w-full flex flex-col items-center">
          <div className=" py-[180px] xl:py-[8.3vw] flex flex-col items-center gap-y-[39px] xl:gap-y-[1.8vw]">
            {/* About image */}
            {aboutImage && (
              <AboutImageBox
                image={aboutImage}
                alt={`About image`}
                classesWrapper="relative"
              />
            )}{' '}
            <div>Photo Credit by Felix Ezema </div>
          </div>
          <div className="flex gap-x-[100px] xl:gap-x-[4.63vw] items-start ">
            <Image
              src={RojIconSvg.src}
              width={100}
              height={100}
              alt="Roj the goat Icon"
              className={cn('w-[94px] xl:w-[4.35vw]')}
            ></Image>
            {overview && (
              <div className=" w-[42vw] TEXT-CNT-ABT leading-[32px]  ">
                <CustomPortableText value={overview}></CustomPortableText>
              </div>
            )}
            <div className="space-y-[2.78vw]">
              <ListContainer {...TechnicalAbilities}></ListContainer>

              <ListContainer {...Services}></ListContainer>
            </div>
            <div>
              <ListContainer {...PressAndAwards}></ListContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
