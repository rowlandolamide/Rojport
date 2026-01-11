import type { PortableTextBlock } from '@portabletext/types'
import type { Image } from 'sanity'
import type { BlockObject } from '@/sanity.types'
export interface MenuItem {
  page?: {
    _type: string
    slug?: string
    title?: string
  }
  link?: {
    _type: string
    url?: string
    title?: string
  }
}

export interface PageItem {
  _type: string
  slug?: string
  title?: string
}

export interface LinkItem {
  _type: string
  url?: string
  title?: string
}

export interface ShowcaseProject {
  _type: string
  coverImage?: Image
  overview?: PortableTextBlock[]
  slug?: string
  tag: string
  title?: string
  year?: string
  coverVideoMobile?: string

  disci?: string[]
  coverVideo?: string
  _updatedAt?: string
}

// Page payloads

export interface HomePagePayload {
  footer?: PortableTextBlock[]
  overview?: any
  showcaseProjects?: ShowcaseProject[]
  title?: string
  customLogo?: Image
  _updatedAt?: string
}

export interface ProjectPayload {
  year?: string
  coverImage?: Image
  description?: PortableTextBlock[]
  overview?: PortableTextBlock[]
  caseStudyLink?: string
  site?: {
    urltitle?: string
    url: string
  }
  slug: string
  disci: Array<
    {
      _key: string
    } & BlockObject
  > | null
  tag?: string[]
  title?: string
  mainVideo?: string
  mainVideoTitle?: string
  content?: Content[]
}

export interface Content {
  _type: string
  _key: string
  photo: object[]
  photoOne: object[]
  photoTwo: object[]
  textBlock: object[]
  videoLink: object[]
  process: object
}

export interface SettingsPayload {
  menuItems?: {
    page?: PageItem[]
    link?: LinkItem[]
  }
  ogImage?: Image
  favIcon?: Image
  title?: string
  bgColor: {
    r?: string
    g?: string
    b?: string
  }
  textColor: {
    r?: string
    g?: string
    b?: string
  }
  displayLastUpdated: boolean
  socialLinks?: {
    behance: string
    email: string
    instagram: string
    linkedin: string
    twitter: string
  }
  navbarText?: string
}

export interface AboutPayload {
  overview?: PortableTextBlock[]
  title?: string
  aboutImage?: {
    asset: Image
    width: number
    height: number
  }[]
  services?: string[]
  technicalAbilities?: { name: string }[]
  pressAndAwards?: { title: string; link: string }[]
  aboutImageMainFace?: { asset: Image; width: number; height: number }
  aboutImageMainMobileFace?: { asset: Image; width: number; height: number }
  aboutImageBouncingImage?: {
    asset: Image
    width: number
    height: number
  }
  aboutImageDraggables?: {
    asset: Image
    width: number
    height: number
  }[]
  pdfFile?: {
    asset: {
      _ref: string
      _type: string
      url: string // 👈 added here
    }
    url: string
  }
}
