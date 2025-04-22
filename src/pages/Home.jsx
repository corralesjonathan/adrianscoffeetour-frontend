import { useEffect } from "react";
import { Navbar } from "../components/Navbar.jsx"
import { Hero } from "../components/Hero.jsx"
import { Features } from "../components/Features.jsx"
import { Family } from "../components/Family.jsx"


export function Home() {
    useEffect(() => {
        document.title = "Home - Adrian's Coffee Tour";
    }, []);

    return (
        <>   
            <Navbar />
            <Hero />
            <Features />
            <Family />
        </>
    )
}