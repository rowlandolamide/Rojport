'use client'
import Link from 'next/link'
import useCurrentTime from '@/components/hooks/useCurrentTime'
import { usePathname } from 'next/navigation'

import type { SettingsPayload } from '@/types'
import { cn } from '@/lib/utils'

interface NavbarProps {
  data?: SettingsPayload
  title?: string | null
  logo?: any | null
}
export default function Navbar(props: NavbarProps) {
  /* Current Time */
  const value = useCurrentTime()
  /* End */

  const pathname = usePathname()

  const isStudio = pathname.includes('studio')

  return (
    <div
      className={`${isStudio ? 'hidden' : 'flex '} h-fit mix-blend-difference  text-white z-50 top-[30px] fixed w-full xl:w-full flex-wrap justify-between items-center gap-x-5 GEN-PAD    `}
    >
      <div className="flex md:flex-row flex-col justify-between w-full md:items-center  ">
        <Link
          href={'/'}
          scroll={false}
          className=" hover:sm:text-gray-700 right-4 text-[9vw] md:text-[40px] leading-[8.6vw] md:leading-[40px] 3xl:leading-[1.8vw] font-PPn 3xl:text-[1.8vw]"
        >
          ROJ THE GOAT
        </Link>
        <div className="flex justify-between md:hidden mt-[10px]">
          {' '}
          <div className="space-x-[10px] flex">
            <div className="MONO-EX border-white text-white">
              Motion Designer
            </div>
            <div className="MONO-EX border-white text-white">Art Director</div>
          </div>
          <div className="space-x-[10px] flex">
            {' '}
            {[
              { name: 'Work', link: '/' },
              { name: 'Info', link: '/about' },
            ].map((ite, i) => {
              return (
                <Link
                  className={cn(
                    'MONO-EX hover:sm:text-bl duration-300 text-white border-white ',
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
        <div className="  CENTER-FLX-LO TXT-DIFF">
          <div className="MONO-EX border-white text-white">Motion Designer</div>
          <div className="MONO-EX border-white text-white">Art Director</div>
        </div>
        <div className="CENTER-FLX-LO">
          {[
            { name: 'Work', link: '/' },
            { name: 'Info', link: '/about' },
          ].map((ite, i) => {
            return (
              <Link
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
  )
}
