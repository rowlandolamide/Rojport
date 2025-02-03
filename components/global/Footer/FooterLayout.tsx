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
    <footer className="xl:fixed w-full mb-[60px] xl:mb-0 xl:bottom-[30px] xl:text-base mix-blend-difference items-center   ">
      <div className="w-full relative GEN-PAD">
        <div className=" w-full flex justify-between   flex-col xl:flex-row xl:gap-y-0 gap-y-[10px]">
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
                  href={`mailto:${ite.link}`}
                  target="_blank"
                  className="MONO-EX"
                  key={i}
                >
                  {ite.name}
                </a>
              ) : (
                <a
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
      </div>
    </footer>
  )
}
