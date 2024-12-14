import React from 'react';
import {motion} from "framer-motion"
import Image from 'next/image';
import Mouse from "../../app/public/Icons/Mouse-New.svg"
import GrabMouse from "../../app/public/Icons/Drag Mouse.svg"
import PointerMouse from "../../app/public/Icons/Pointer Mouse.svg"


function CustomMouse(props: {x: number, y:number}) {
    return (
        <motion.div style={{zIndex: 999}}  animate={{x: props.x, y: props.y}} className=' pointer-events-none   hidden'>
          
            <Image src={Mouse.src} width={24} height={32} className='h-fit' alt='Mouse'></Image>
        </motion.div>
    );
}

export default CustomMouse;