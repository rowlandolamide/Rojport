import Image from 'next/image'
import Link from 'next/link'

import { HeaderLinks } from '@/components/shared/HeaderLinks'
import { resolveHref, urlForLogo } from '@/sanity/lib/utils'
import type { LinkItem, PageItem, SettingsPayload } from '@/types'

interface NavbarProps {
  data?: SettingsPayload
  title?: string | null
  logo?: any | null
}
export default function Navbar(props: NavbarProps) {
  const { data } = props
  const title = props.title ?? ''

  const menuItems = data?.menuItems ?? {}
  const menuPages = menuItems?.page || ([] as PageItem[])
  const menuLinks = menuItems?.link || ([] as LinkItem[])

  const customLogo = props?.logo
  const logoImageUrl = customLogo && urlForLogo(customLogo)?.url()

return (
    <div className="flex text-black z-50 fixed w-screen xl:w-full flex-wrap justify-between items-center gap-x-5 px-4 py-4 md:px-5 md:py-4 lg:px-5">
     <div className='flex justify-between px-4 w-full'>
     <Link href={"/"} scroll={false} className=' hover:text-bl top-4 right-4 text-[20px] md:text-[40px] font-PPn 3xl:text-[1.8vw]'>ROJ THE GOAT</Link>
      <div className='text-[10px] mx-auto md:block hidden 2xl:text-[0.6vw] 3xl:text-[0.4vw]'>

      Motion Designer & Art Director 
      <div>
      Lagos, Nigeria: 12:00 WAT</div> 
      </div>
    <div className='flex gap-x-8 items-center  text-[10px] md:text-[1.7vw] 3xl:text-[1.4vw]'>
  {[{name: "Work", link: "/"}, {name: "Info", link: "/about"}].map((ite, i)=>{
    return <Link className='hover:text-bl' scroll={false} key={i} href={ite.link}>{ite.name}</Link>
  })}
    </div>
     </div>
 
    </div>
  )
}
