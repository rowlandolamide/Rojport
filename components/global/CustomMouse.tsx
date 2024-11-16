import React from 'react';
import {motion} from "framer-motion"



function CustomMouse(props: {x: number, y:number,}) {


    return (
        <motion.div  animate={{x: props.x, y: props.y}} className='w-[40px] h-[40px] bg-red-500 z-50 absolute'>
            
        </motion.div>
    );
}

export default CustomMouse;