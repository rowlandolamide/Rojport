import React from 'react';
import PropTypes from 'prop-types';
import { MainContextWrapperType } from './ContextWrapper';
import Image from 'next/image';



function Overlay(props: {obj:  MainContextWrapperType["overlay"]}) {
    const {obj} =props
    return (
        <div className='w-full h-screen flex justify-center items-center '>
            <Image alt='something' width={100} height={100} className='w-fit h-screen' src={obj.item}></Image>            
        </div>
    );
}

export default Overlay;