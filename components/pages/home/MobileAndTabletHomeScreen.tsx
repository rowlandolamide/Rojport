import React from 'react';
import type { HomePagePayload } from "@/types";
import { urlForImage } from "@/sanity/lib/utils";
import ProjectCard from './ProjectCard';

function MobileAndTabletHomeScreen({data}: {data: HomePagePayload |null}) {



    const modifiedDataTwo  = data?.showcaseProjects?.map((item)=>{
      
      const imgUrl = item.coverImage ? urlForImage(item.coverImage)?.quality(100)?.format("webp")?.width(500).url() : ""
      return {title: item.title, slug: item.slug, img: item.coverImage, imgUrl: imgUrl,  isProject: true, discipline: item.disci}
    })
    
    return (
        <div className='w-full'>
              {/* Mobile View */}
    <div className="Js-lenis sm:hidden flex flex-col items-center justify-center w-full tab-display data-lenis-prevent">
    <div className="flex flex-col gap-y-[22px]">
            {modifiedDataTwo && modifiedDataTwo.map((i, k)=>{
                
                const currentObj = i
            

               
                return <section key={k} className="   gap-y-4 ">
                  
                { <ProjectCard slug={i.slug || "/"} isProject={currentObj.isProject} media={currentObj.imgUrl} discipline={currentObj.discipline} name={currentObj.title || ""}></ProjectCard>}

                   
                </section>
            })}
        </div> 
    </div>
    {/* End */}


    {/* Tab View */}
  <div className="w-full hidden sm:block xl:hidden data-lenis-prevent Js-lenis">
  <div  className="flex flex-wrap gap-x-4 z-0  gap-y-5 justify-center items-center">
            {modifiedDataTwo && modifiedDataTwo.map((i, k)=>{
                
                const currentObj = modifiedDataTwo[k]
              
                return <section key={k} className=" px-[20px]  gap-y-4 ">
                  
                { <ProjectCard slug={i.slug || "/"}  isProject={currentObj.isProject} media={currentObj.imgUrl} discipline={currentObj.discipline} name={currentObj.title || ""}></ProjectCard>}

                   
                </section>
            })}
        </div> 
</div>
{/* End */}
        </div>
    );
}

export default MobileAndTabletHomeScreen;