import { useEffect } from "react";
import { Navbar } from "../components/Navbar.jsx"
import { Hero } from "../components/Hero.jsx"
import { Features } from "../components/Features.jsx"
import { Family } from "../components/Family.jsx"
import { Counter } from "../components/Counter.jsx";
import { Products } from "../components/Products.jsx";
import { TourGallery } from "../components/TourGallery.jsx";
import { Testimonials } from "../components/Testimonials.jsx";


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
            <Counter />
            <Products />
            <TourGallery />
            <Testimonials />
        </>
    )
}