import type { HomePagePayload, SettingsPayload } from '@/types'
import Link from 'next/link'

interface FooterProps {
  data: SettingsPayload
  title: string | null
  homepage: HomePagePayload | null
}

export const FooterLinsk = [
  {name: "Instagram"},
  {name: "Twitter"},
  {name: "Behance"},
  {name: "Email"},
]

export default function Footer(props: FooterProps) {
  
  const {} = props ?? {}
  const title = props.title
  const lastUpdated = props.homepage?._updatedAt ?? ''
  const displayLastUpdate = props.data?.displayLastUpdated
  return (
    <footer className="fixed w-full bottom-0 grid grid-cols-1 md:grid-cols-3 items-center mt-12 gap-3 md:gap-x-5 px-4 md:px-5 py-2 md:py-5 lg:px-5">
  <div className='w-screen flex justify-between '>
  <div className='border border-black px-2 py-1 left-4 '>
      ROJ THE GOAT © Copyright 2023
      </div>
      <div className='px-2 py-1  mr-[40px]  '>
   {FooterLinsk.map((ite, i)=>{
    return <Link key={i} href={"/"}>{ite.name} {i != FooterLinsk.length -1 && ","}</Link>
   })}
      </div>
  </div>
  
    </footer>
  )
}
