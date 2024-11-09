"use client"
import GsapInfintiteWrapper from './GsapInfintiteWrapper';
import React, {useRef} from 'react';
import { useRouter , usePathname} from 'next/navigation';
import { ReactLenis } from "@studio-freight/react-lenis";
import { useContext } from 'react';
import useMouse from '@react-hook/mouse-position';
import GsapHorizontalWrapper from './GsapHorizontalWrapper';
import CustomMouse from '@/components/global/CustomMouse';
import { ContextMain, MainContextWrapperType } from '@/components/global/ContextWrapper';
interface LenisHorizontalWrapperprops {
    children?: React.ReactNode
    
} 

function LenisHorizontalWrapper(props: LenisHorizontalWrapperprops) {
    const {mouseStates} = useContext(ContextMain) as MainContextWrapperType
    const pathName = usePathname()

    const isHorizonatal = pathName === "/"
    return (
     <div>
            <div className={`h-screen  static ${isHorizonatal ? "w-fit": "w-screen"} `} >
          <div  className="h-8 w-8 bg-green-500 fixed top-2 left-8 z-50">
            
            <CustomMouse x={mouseStates.x || 0} y={mouseStates.y|| 0}></CustomMouse>
            </div>

           {props.children} 
          </div>
    {/*        <ReactLenis root
        options={{ orientation: isHorizonatal ? "horizontal": "vertical", gestureOrientation: "both" }}>
   


       
        </ReactLenis> */}
     </div>
    );
}

export default LenisHorizontalWrapper;