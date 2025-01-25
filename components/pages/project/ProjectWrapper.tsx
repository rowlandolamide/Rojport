import React from 'react'

function ProjectWrapper(props: { children: React.ReactNode }) {
  return (
    <div className=" w-full  pt-[47px]">
      <div className="">{props.children}</div>
    </div>
  )
}

export default ProjectWrapper
