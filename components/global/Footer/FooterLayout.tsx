'use client'
import type { HomePagePayload, SettingsPayload } from '@/types'
import { Time } from '@/components/hooks/useCurrentTime'

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
    <div className="MONO-NAV-PASSAGE text-white flex flex-col items-center gap-y-[25px]">
      <a
        href={`mailto:${process.env.NEXT_PUBLIC_ROJ_EMAIL || '/'}`}
        target="_blank"
      >
        OLAMIDE@ROJTHEGOAT.COM
      </a>
      <div className="flex items-center gap-x-[1vw]">
        {FooterLinsk.slice(0, 4).map((item, i) => {
          return (
            <a target="_blank" key={i} href={item.link}>
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
          <div className="MONO-EX xl:block hidden">2025 © ROJ THE GOAT</div>
          <div className="MONO-EX xl:block hidden">
            <span>LAGOS, NIGERIA |</span> <Time></Time> WAT
          </div>
          <div className="flex flex-row space-x-[10px] xl:hidden ">
            <div className="MONO-EX">2025 © ROJ THE GOAT</div>
            <div className="MONO-EX">
              <span>LAGOS, NIGERIA |</span> <Time></Time> WAT
            </div>
          </div>
          <div className="MONO-EX w-fit">
            LET’S MAKE SOMETHING COOL -{' '}
            <a
              href={`mailto:${process.env.NEXT_PUBLIC_ROJ_EMAIL || '/'}`}
              target="_blank"
            >
              OLAMIDE@ROJTHEGOAT.COM
            </a>
          </div>

          <div className=" space-x-[10px] 2xl:space-x-[0.46vw]">
            {FooterLinsk.map((ite, i) => {
              return ite.name != 'Email' ? (
                <a
                  onMouseLeave={handleLeaveLink}
                  onMouseOver={handleHoverLink}
                  href={`${ite.link}`}
                  target="_blank"
                  className="MONO-EX"
                  key={i}
                >
                  {ite.name}
                </a>
              ) : (
                <a
                  onMouseLeave={handleLeaveLink}
                  onMouseOver={handleHoverLink}
                  target="_blank"
                  className="MONO-EX"
                  key={i}
                  href={`mailto:${ite.link}`}
                >
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
