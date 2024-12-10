"use client"
import React from 'react';
import dynamic from "next/dynamic";
import { useContext } from 'react';
import { MainContextWrapperType, ContextMain } from '@/components/global/ContextWrapper';
import MobileAndTabletHomeScreen from "./MobileAndTabletHomeScreen";
import HomePageHorizontal from './HomePageHorizontal'; 
/* const HomePageHorizontal = dynamic(()=>import("./HomePageHorizontal"))  */
import useMediaQuery from "@/components/hooks/useMediaQuery";


import type { HomePagePayload } from "@/types";



function HomePage(props: {data: HomePagePayload | null}) {
    const {lenisCurrent} = useContext(ContextMain) as MainContextWrapperType
    const {x} = useMediaQuery()
    const isLaptop = lenisCurrent ? x > 1279: false
    return (
        <div>
            <div className='hidden xl:block w-full'> <HomePageHorizontal data={props.data}></HomePageHorizontal></div>
            <MobileAndTabletHomeScreen data={props.data}></MobileAndTabletHomeScreen>
        {/*     {isLaptop ? <HomePageHorizontal data={props.data}></HomePageHorizontal> : <MobileAndTabletHomeScreen data={props.data}></MobileAndTabletHomeScreen>} */}
        </div>
    );
}

export default HomePage;