'use client'
import type { HomePagePayload, SettingsPayload } from '@/types'
import { Time } from '@/components/hooks/useCurrentTime'
import ArrowRT from '../../../app/public/Icons/ARROW-RT.svg'

import { ArrowUpRight } from 'lucide-react'
import { useContext } from 'react'
import {
  ContextMain,
  MainContextWrapperType,
} from '@/components/global/ContextWrapper'

interface FooterProps {
  data: SettingsPayload
  title: string | null
  homepage: HomePagePayload | null
}

export const FooterLinsk = [
  { name: 'Instagram', link: process.env.NEXT_PUBLIC_INSTA_LINK || '/' },
  { name: 'Twitter', link: process.env.NEXT_PUBLIC_TWITTER_LINK || '/' },
  { name: 'Behance', link: process.env.NEXT_PUBLIC_BEHANCE_LINK || '/' },
  { name: 'Linkedin', link: process.env.NEXT_PUBLIC_ROJ_LINKEDIN || '/' },
  { name: 'Email', link: process.env.NEXT_PUBLIC_ROJ_EMAIL || '/' },
]

export const MobileFooter = ({ isMenuLinks }: { isMenuLinks?: boolean }) => {
  return (
    <div className="MONO-NAV-PASSAGE text-[#a1a1aa] flex flex-col items-center gap-y-[25px] z-0">
      <a
        href={`mailto:${process.env.NEXT_PUBLIC_ROJ_EMAIL || '/'}`}
        target="_blank"
      >
        OLAMIDE@ROJTHEGOAT.COM
      </a>
      <div className="flex items-center gap-x-[4vw]">
        {FooterLinsk.slice(0, 4).map((item, i) => {
          return (
            <a target="_blank" className="flex" key={i} href={item.link}>
              <ArrowUpRight
                className="text-[#a1a1aa]"
                width={13}
                height={13}
              ></ArrowUpRight>
              {item.name}
            </a>
          )
        })}
      </div>
      <div>© 2025 ROJ THE GOAT</div>
    </div>
  )
}

export default function Footer(props: FooterProps) {
  const { handleMouseStateChange } = useContext(
    ContextMain,
  ) as MainContextWrapperType

  const handleHoverLink = () => {
    handleMouseStateChange(null, 3)
  }
  const handleLeaveLink = () => {
    handleMouseStateChange(null, 0)
  }
  return (
    <footer className="xl:fixed w-full mb-[60px] xl:mb-0 xl:bottom-[30px] xl:text-base mix-blend-difference items-center   ">
      <div className="w-full relative GEN-PAD ">
        <div className=" w-full sm:flex justify-between hidden  flex-col xl:flex-row xl:gap-y-0 gap-y-[10px]">
          <div className="MONO-NAV-PASSAGE-NEW xl:block hidden text-[#a1a1aa]">
            © 2025 ROJ THE GOAT
          </div>
          <div className="MONO-EX hidden">
            <span>LAGOS, NIGERIA |</span> <Time></Time> WAT
          </div>
          {/*  <div className="flex flex-row space-x-[10px]  ">
            <div className="MONO-NAV-PASSAGE ">2025 © ROJ THE GOAT</div>
          </div> */}
          <div className="text-[#a1a1aa] hover:bg-gray-100/[0.2] MONO-NAV-PASSAGE-NEW  w-fit">
            <a
              onMouseLeave={handleLeaveLink}
              onMouseOver={handleHoverLink}
              href={`mailto:${process.env.NEXT_PUBLIC_ROJ_EMAIL || '/'}`}
              target="_blank"
            >
              CRAFT THE UNEXPECTED + OLAMIDE@ROJTHEGOAT.COM
            </a>
          </div>

          <div className=" space-x-[10px] 2xl:space-x-[0.46vw] flex text-[#a1a1aa]">
            {FooterLinsk.map((ite, i) => {
              return ite.name != 'Email' ? (
                <a
                  onMouseLeave={handleLeaveLink}
                  onMouseOver={handleHoverLink}
                  href={`${ite.link}`}
                  target="_blank"
                  className="MONO-NAV-PASSAGE-NEW flex hover:bg-gray-100/[0.2] items-center"
                  key={i}
                >
                  <ArrowUpRight
                    className="text-[#a1a1aa] w-[1.1vw]"
                    strokeWidth={2}
                    width={24}
                    height={24}
                  ></ArrowUpRight>
                  {ite.name}
                </a>
              ) : (
                <a
                  onMouseLeave={handleLeaveLink}
                  onMouseOver={handleHoverLink}
                  target="_blank"
                  className="MONO-NAV-PASSAGE-NEW flex items-center hover:bg-gray-100/[0.2]"
                  key={i}
                  href={`mailto:${ite.link}`}
                >
                  <ArrowUpRight
                    className="text-[#a1a1aa] w-[1.1vw]"
                    strokeWidth={2}
                    width={24}
                    height={24}
                  ></ArrowUpRight>
                  {ite.name}
                </a>
              )
            })}
          </div>
        </div>
        <div className="sm:hidden">
          <MobileFooter></MobileFooter>
        </div>
      </div>
    </footer>
  )
}
