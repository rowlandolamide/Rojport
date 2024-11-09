"use client"
import {gsap} from "gsap"
import React, { useEffect, useRef , useLayoutEffect} from 'react';
import PropTypes from 'prop-types';
import {horizontalLoop} from "./HorizontalLoop"
import Observer from "gsap/dist/Observer";
import ProjectCard from "./ProjectCard";
import dynamic from "next/dynamic";
import useMediaQuery from "@/components/hooks/useMediaQuery";



GsapHorizontalWrapper.propTypes = {
    
};

gsap.registerPlugin(Observer)

function GsapHorizontalWrapper() {
    const {x} = useMediaQuery()
    const contRef = useRef()
    const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

   useIsomorphicLayoutEffect(()=>{
   const ctx = gsap.context(()=>{
    let loop = horizontalLoop(".cards section", {repeat: -1})

    let slow = gsap.to(loop, {timeScale: 0, duration: 0.5})
    loop.timeScale(0)

    Observer.create({
        target: ".cards",
        type: "pointer,touch,wheel",
        wheelSpeed: -1,
        onChange: self => {
          loop.timeScale(Math.abs(self.deltaX) > Math.abs(self.deltaY) ? -self.deltaX : -self.deltaY); // whichever direction is bigger
          slow.invalidate().restart(); // now decelerate
        }
      });

   })
   return ()=> ctx.revert()
   }
   , [x])
    return (
<div className="slider-cont">
<div className="flex gap-x-4 cont cards z-0">
            {Array.from({length: 10}).map((i, k)=>{
                return <section key={k} className=" px-[20px]  flex flex-col gap-y-4 ">
                   
                <ProjectCard discipline="sd" name={k.toString()}></ProjectCard>
                <ProjectCard discipline="sd" name="dsfdf"></ProjectCard>
                   
                </section>
            })}
        </div>
</div>
    );
}

export default GsapHorizontalWrapper;