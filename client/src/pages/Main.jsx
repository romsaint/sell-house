import { useContext, useEffect, useRef } from 'react'
import '/public/Home.css'
import { Header } from '/src/components/header/Header'
import { HomeMain } from '/src/components/homePage/HomeMain'


export function Main(){

    return (
        <>
            <Header />
            <HomeMain /> 
        </>
    )
}