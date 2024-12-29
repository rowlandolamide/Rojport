import React from 'react'

function ProjectWrapper(props: { children: React.ReactNode }) {
  return (
    <div className=" w-full px-[10px] lg:px-[21vw] 3xl:pt-[200px]">
      <div className="">{props.children}</div>
    </div>
  )
}

export default ProjectWrapper
