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
      className={`${isStudio ? 'hidden' : 'flex '} text-black z-50 fixed w-screen xl:w-full flex-wrap justify-between items-center gap-x-5 GEN-PAD    py-4  md:py-4`}
    >
      <div className="flex justify-between w-full items-center ">
        <Link
          href={'/'}
          scroll={false}
          className=" hover:text-bl top-4 right-4 text-[32px] md:text-[40px] font-PPn 3xl:text-[1.8vw]"
        >
          ROJ THE GOAT
        </Link>
        <div className="  CENTER-FLX-LO ">
          <div className="MONO-LO">Motion Designer</div>
          <div className="MONO-LO">Art Director</div>
        </div>
        <div className="CENTER-FLX-LO">
          {[
            { name: 'Work', link: '/' },
            { name: 'Info', link: '/about' },
          ].map((ite, i) => {
            return (
              <Link
                className={cn(
                  'MONO-LO hover:text-bl duration-300',
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
