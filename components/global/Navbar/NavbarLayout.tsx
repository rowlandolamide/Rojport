import Image from 'next/image'
import Link from 'next/link'

import { HeaderLinks } from '@/components/shared/HeaderLinks'
import { resolveHref, urlForLogo } from '@/sanity/lib/utils'
import type { LinkItem, PageItem, SettingsPayload } from '@/types'

interface NavbarProps {
  data: SettingsPayload
  title: string | null
  logo: any | null
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
    <div className="flex text-black fixed w-full flex-wrap justify-between items-center gap-x-5 px-4 py-4 md:px-5 md:py-4 lg:px-5">
     <div className='flex justify-between px-4 w-full'>
     <Link href={"/"} className='top-4 right-4 text-[40px]'>ROJ THE GOAT</Link>
      <div className='text-[10px] mx-auto'>

      Motion Designer & Art Director 
      <div>
      Lagos, Nigeria: 12:00 WAT</div> 
      </div>
    <div className='flex gap-x-8 text-[1.7vw]'>
  {[{name: "Work", link: "/about"}, {name: "Info", link: "/projects/alpha"}].map((ite, i)=>{
    return <Link key={i} href={ite.link}>{ite.name}</Link>
  })}
    </div>
     </div>
      {customLogo && customLogo ? (
        <Link
          href={`/`}
          className={`h-full text-xl hover:text-secondary md:text-2xl`}
        >
          <div className="flex h-6">
            <Image
              alt={title}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: 'auto', height: 'auto' }}
              src={logoImageUrl}
            />
          </div>
        </Link>
      ) : (
        <Link
          href={`/`}
          className={`h-full text-2xl hover:text-secondary md:text-2xl`}
        >
          {title}
        </Link>
      )}
      <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
        {menuPages &&
          menuPages.map((menuItem, key) => {
            const href = resolveHref(menuItem?._type, menuItem?.slug)
            if (!href) {
              return null
            }
            return <HeaderLinks key={key} href={href} title={menuItem.title} />
          })}

        {menuLinks &&
          menuLinks.map((menuItem, key) => {
            return (
              <Link
                key={key}
                target="_blank"
                className={`text-lg px-3 py-1 text-secondary border-secondary border rounded hover:text-primary hover:bg-secondary md:text-2xl`}
                href={menuItem.url!}
              >
                ↗ {menuItem.title}
              </Link>
            )
          })}
      </div>
    </div>
  )
}
