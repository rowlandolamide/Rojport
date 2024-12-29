'use client'

import React, { useRef } from 'react'
import { ReactLenis } from '@studio-freight/react-lenis'

import PropTypes from 'prop-types'

IPadHorizontalScroll.propTypes = {}

function IPadHorizontalScroll(props: { children: React.ReactNode }) {
  return <div className="w-full overflow-x-auto">{props.children}</div>
}

export default IPadHorizontalScroll
