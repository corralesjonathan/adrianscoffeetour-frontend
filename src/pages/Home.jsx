import { useEffect } from "react";
import { Navbar } from "../components/navigation/Navbar.jsx";
import { Hero } from "../components/home/Hero.jsx";
import { BookTour } from "../components/BookTour.jsx";


export function Home() {
    useEffect(() => {
        document.title = "Home - Adrian's Coffee Tour";
    }, []);

    return (
        <>   
            <Navbar logo="./icons/logo.svg"/>
            <Hero img="./imgs/hero.webp"/>
            <BookTour />
        </>
    )
}