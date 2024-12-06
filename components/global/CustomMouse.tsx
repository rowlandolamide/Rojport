import React from 'react';
import {motion} from "framer-motion"
import Image from 'next/image';
import Mouse from "../../app/public/Icons/Mouse-New.svg"


function CustomMouse(props: {x: number, y:number}) {
    return (
        <motion.div  animate={{x: props.x, y: props.y}} className=' pointer-events-none  z-30 xl:block hidden'>
          
            <Image src={Mouse.src} width={24} height={32} className='h-fit' alt='Mouse'></Image>
        </motion.div>
    );
}

export default CustomMouse;