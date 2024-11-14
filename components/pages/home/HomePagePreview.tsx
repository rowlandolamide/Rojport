'use client'

import { type QueryResponseInitial } from '@sanity/react-loader'

import { homePageQuery } from '@/sanity/lib/queries'
import { useQuery } from '@/sanity/loader/useQuery'
import { HomePagePayload } from '@/types'

import HomePage from './HomePage'
import { useEffect, useState } from 'react'

type Props = {
  initial: QueryResponseInitial<HomePagePayload | null>
}

export default function HomePagePreview(props: Props) {
  const { initial } = props
  const { data, encodeDataAttribute } = useQuery<HomePagePayload | null>(
    homePageQuery,
    {},
    { initial },
  )
  const [load, setLoad] = useState(false)
  useEffect(()=>{
    setLoad(true)
  }, [])

  if (!data) {
    return (
      <div className="text-center">
        Please start editing your Home document to see the preview!
      </div>
    )
  }

  return <HomePage data={data} encodeDataAttribute={encodeDataAttribute} />
}
