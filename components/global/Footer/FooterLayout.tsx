'use client'
import type { HomePagePayload, SettingsPayload } from '@/types'
import { Time } from '@/components/hooks/useCurrentTime'

interface FooterProps {
  data: SettingsPayload
  title: string | null
  homepage: HomePagePayload | null
}

export const FooterLinsk = [
  { name: 'Instagram', link: process.env.NEXT_PUBLIC_INSTA_LINK || '/' },
  { name: 'Twitter', link: process.env.NEXT_PUBLIC_TWITTER_LINK || '/' },
  { name: 'Behance', link: process.env.NEXT_PUBLIC_BEHANCE_LINK || '/' },
  { name: 'Email', link: process.env.NEXT_PUBLIC_ROJ_EMAIL || '/' },
]

export default function Footer(props: FooterProps) {
  return (
    <footer className="xl:fixed w-full  bottom-0 xl:text-base  items-center mt-12 py-2 md:py-5 ">
      <div className="w-full relative GEN-PAD">
        <div className=" w-full flex justify-between   flex-col xl:flex-row">
          <div className="MONO-LO">2025 © ROJ THE GOAT</div>
          <div className="MONO-LO">
            <span>LAGOS, NIGERIA |</span> <Time></Time> WAT
          </div>
          <div className="MONO-LO">
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
                  href={`mailto:${ite.link}`}
                  target="_blank"
                  className="MONO-LO"
                  key={i}
                >
                  {ite.name}
                </a>
              ) : (
                <a
                  target="_blank"
                  className="MONO-LO"
                  key={i}
                  href={`mailto:${ite.link}`}
                >
                  {ite.name}
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
