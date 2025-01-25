import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function RedesignProjectCard(props: {
  img: string
  title: string
  discipline: string
  slug: string
}) {
  const { img, title, discipline, slug } = props
  return (
    <Link href={`projects/${slug}`}>
      <div className="w-full">
        <div className="HOME-CNT-PRJ w-full ">
          <Image
            className="HOME-PRJ-ROUNDED w-full "
            src={img}
            width={600}
            unoptimized
            height={500}
            alt={title}
          ></Image>
          <div className="HOME-CNT-TEXT-PRJ">
            <span className="HOME-TXT-TITLE"> {title}</span>{' '}
            <span className="MONO-LO text-[15px] 2xl:text-[0.7rem]">
              {discipline}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default RedesignProjectCard
