'use client'
import type { HomePagePayload, SettingsPayload } from '@/types'
import { Time } from '@/components/hooks/useCurrentTime'

import { ArrowUpRight } from 'lucide-react'
import { useContext } from 'react'
import {
  ContextMain,
  MainContextWrapperType,
} from '@/components/global/ContextWrapper'
import { cn } from '@/lib/utils'

interface FooterProps {
  data: SettingsPayload
  title: string | null
  homepage: HomePagePayload | null
}

const FooterLinsk = ({
  behance,
  email,
  instagram,
  linkedin,
  twitter,
}: {
  behance?: string
  email?: string
  instagram?: string
  linkedin?: string
  twitter?: string
}) => {
  return [
    { name: 'Instagram', link: instagram || '/' },
    { name: 'Twitter', link: twitter || '/' },
    { name: 'Behance', link: behance || '/' },
    { name: 'Linkedin', link: linkedin || '/' },
    { name: 'Email', link: email || '/' },
  ]
}

export const MobileFooter = ({
  isMenuLinks,
  isSideBarOpen,
  soialLinks,
}: {
  isMenuLinks?: boolean
  isSideBarOpen: boolean
  soialLinks: {
    behance?: string
    email?: string
    instagram?: string
    linkedin?: string
    twitter?: string
  }
}) => {
  const { behance, email, instagram, linkedin, twitter } = soialLinks || {}
  return (
    <div
      className={cn(
        'MONO-NAV-PASSAGE  flex flex-col items-center gap-y-[25px] z-0',
        isSideBarOpen ? 'text-white' : 'text-[#a1a1aa]',
      )}
    >
      <a
        href={`mailto:${process.env.NEXT_PUBLIC_ROJ_EMAIL || '/'}`}
        target="_blank"
      >
        OLAMIDE@ROJTHEGOAT.COM
      </a>
      <div className="flex items-center gap-x-[4vw]">
        {FooterLinsk({ behance, email, instagram, linkedin, twitter })
          .slice(0, 4)
          .map((item, i) => {
            return (
              <a target="_blank" className="flex" key={i} href={item.link}>
                <ArrowUpRight
                  className={cn(
                    isSideBarOpen ? 'text-white' : 'text-[#a1a1aa]',
                  )}
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
  const { handleMouseStateChange, setIsSideBarOpen, isSideBarOpen } =
    useContext(ContextMain) as MainContextWrapperType

  const handleHoverLink = () => {
    handleMouseStateChange(null, 3)
  }
  const handleLeaveLink = () => {
    handleMouseStateChange(null, 0)
  }

  const { behance, email, instagram, linkedin, twitter } =
    props.data.socialLinks || {}
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
          <div className="text-[#a1a1aa] group  MONO-NAV-PASSAGE-NEW  w-fit">
            <a
              onMouseLeave={handleLeaveLink}
              onMouseOver={handleHoverLink}
              href={`mailto:${process.env.NEXT_PUBLIC_ROJ_EMAIL || '/'}`}
              target="_blank"
            >
              CRAFT THE UNEXPECTED +{' '}
              <span className="group-hover:bg-gray-100/[0.2]">
                OLAMIDE@ROJTHEGOAT.COM
              </span>
            </a>
          </div>

          <div className=" space-x-[10px] 2xl:space-x-[0.46vw] flex text-[#a1a1aa]">
            {FooterLinsk({ behance, linkedin, email, instagram, twitter }).map(
              (ite, i) => {
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
              },
            )}
          </div>
        </div>
        <div className="sm:hidden">
          <MobileFooter
            soialLinks={{ behance, email, instagram, linkedin, twitter }}
            isSideBarOpen={isSideBarOpen}
          ></MobileFooter>
        </div>
      </div>
    </footer>
  )
}
