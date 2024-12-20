import type { HomePagePayload, SettingsPayload } from '@/types'
import Link from 'next/link'

interface FooterProps {
  data: SettingsPayload
  title: string | null
  homepage: HomePagePayload | null
}

export const FooterLinsk = [
  {name: "Instagram", link: process.env.NEXT_PUBLIC_INSTA_LINK || "/"},
  {name: "Twitter", link: process.env.NEXT_PUBLIC_TWITTER_LINK  || "/"},
  {name: "Behance", link: process.env.NEXT_PUBLIC_BEHANCE_LINK || "/"},
  {name: "Email", link: process.env.NEXT_PUBLIC_ROJ_EMAIL || "/"},
]

export default function Footer(props: FooterProps) {
  
  const {} = props ?? {}
  const title = props.title
  const lastUpdated = props.homepage?._updatedAt ?? ''
  const displayLastUpdate = props.data?.displayLastUpdated
  return (
    <footer className="xl:fixed w-full bottom-0 xl:text-base 3xl:text-[0.65vw] 2xl:text-[0.7vw] text-[12px] grid grid-cols-1 md:grid-cols-3 items-center mt-12 gap-3 md:gap-x-5 px-4 md:px-5 py-2 md:py-5 lg:px-5">
  <div className='xl:w-screen w-full flex justify-between   flex-col xl:flex-row'>
  <div className='border border-black xl:px-2 py-1 xl:left-4 text-center'>
      ROJ THE GOAT © Copyright 2023
      </div>
      <div className='px-2 py-1  xl:mr-[40px]  text-center '>
   {FooterLinsk.map((ite, i)=>{
  return  ite.name != "Email" ?  <a target='_blank' className='ml-[10px] xl:ml-[0.7vw] 3xl:ml-[0.8vw]' key={i} href={ite.link}>{ite.name}</a> : <a target='_blank'  className='ml-[10px] xl:ml-[0.7vw] 3xl:ml-[0.8vw]' key={i} href={`mailto:${ite.link}`}>{ite.name}</a>
   })}
      </div>
  </div>
  
    </footer>
  )
}
