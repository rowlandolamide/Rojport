'use client'
import Link from 'next/link'
import hamburgerMenuIcon from '../../../app/public/Icons/Hamburger-Menu.svg'
import closeXIcon from '../../../app/public/Icons/Close-X.svg'
import { Time } from '@/components/hooks/useCurrentTime'
import { usePathname } from 'next/navigation'
import { SetStateAction, useContext, useState } from 'react'
import { MobileFooter } from '../Footer/FooterLayout'
import {
  ContextMain,
  MainContextWrapperType,
} from '@/components/global/ContextWrapper'
import type { SettingsPayload } from '@/types'
import { cn } from '@/lib/utils'

interface NavbarProps {
  data?: SettingsPayload
  title?: string | null
  logo?: any | null
}

export const SideMenu = ({
  isSideOpen,
  setIsSideOpen,
}: {
  isSideOpen: boolean
  setIsSideOpen: React.Dispatch<SetStateAction<boolean>>
}) => {
  return (
    <div
      className={cn(
        'w-full duration-300 md:hidden  gap-y-[19vh] bg-bl h-[100vh] top-0 fixed z-40 flex flex-col items-center',
        isSideOpen ? 'left-0 ' : 'ml-[100vw]',
      )}
    >
      <div className="gap-y-[10px] mt-[19vh] items-center flex flex-col ">
        {[
          { title: 'Work', route: '/' },
          { title: 'Info', route: '/about' },
        ].map((item, i) => {
          return (
            <Link
              onClick={() => {
                setIsSideOpen(false)
              }}
              className="MONO-NAV-EX border-white text-white"
              href={item.route}
              key={i}
            >
              <h1>{item.title}</h1>
            </Link>
          )
        })}
      </div>
      <div className="MONO-NAV-PASSAGE text-white flex flex-col items-center gap-y-[27px]">
        <div className="flex items-center gap-x-[40px]">
          {' '}
          <div>MOTION DESIGNER</div>
          <div>ART DIRECTOR</div>
        </div>
        <div className="flex items-center gap-x-[10px]">
          {' '}
          <div>LAGOS, NIGERIA</div>
          <div>|</div>
          <div>
            <Time></Time> WAT
          </div>
        </div>
      </div>
      <MobileFooter></MobileFooter>
    </div>
  )
}

export default function Navbar(props: NavbarProps) {
  /* Current Time */

  const [isSideOpen, setIsSideOpen] = useState(false)

  const pathname = usePathname()

  const isStudio = pathname.includes('studio')

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
    <div className="relative">
      <SideMenu
        setIsSideOpen={setIsSideOpen}
        isSideOpen={isSideOpen}
      ></SideMenu>
      <div
        className={`${isStudio ? 'hidden' : 'flex '} h-fit mix-blend-difference  text-white z-50 top-[30px] fixed w-full xl:w-full flex-wrap justify-between items-center gap-x-5 GEN-PAD    `}
      >
        <div className="flex flex-row justify-between w-full md:items-center  ">
          <Link
            href={'/'}
            scroll={false}
            className=" hover:sm:text-gray-700 right-4 text-[9vw] md:text-[40px] leading-[8.6vw] md:leading-[40px] 3xl:leading-[1.8vw] font-PPn 3xl:text-[1.8vw]"
          >
            ROJ THE GOAT
          </Link>
          <div className="md:hidden">
            <button
              onClick={() => {
                setIsSideOpen((prev) => !prev)
              }}
              className="p-[10px] border rounded-[5px]"
            >
              <img
                height={12}
                alt="Hamburger Menu Open and Close Icon"
                className="text-white"
                width={12}
                src={!isSideOpen ? hamburgerMenuIcon.src : closeXIcon.src}
              ></img>
            </button>
          </div>

          <div className="  CENTER-FLX-LO TXT-DIFF">
            <div className="MONO-NAV-PASSAGE border-white text-white">
              Motion Designer
            </div>
            <div className="MONO-NAV-PASSAGE border-white text-white">
              Art Director
            </div>
          </div>
          <div className="MONO-NAV-PASSAGE-SM hidden sm:block">
            <span>LAGOS, NIGERIA |</span> <Time></Time> WAT
          </div>
          <div className="CENTER-FLX-LO">
            {[
              { name: 'Work', link: '/' },
              { name: 'Info', link: '/about' },
            ].map((ite, i) => {
              return (
                <Link
                  onMouseLeave={handleLeaveLink}
                  onMouseOver={handleHoverLink}
                  className={cn(
                    'MONO-EX hover:bg-gray-100/[0.2] duration-300 text-white border-white ',
                    pathname === ite.link ? 'text-bl' : '',
                  )}
                  scroll={false}
                  key={i}
                  href={ite.link}
                >
                  {ite.name}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
