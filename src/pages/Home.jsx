import { useEffect } from "react";
import { Navbar } from "../components/shared/Navbar.jsx"
import { Hero } from "../components/home/Hero.jsx"
import { Features } from "../components/home/Features.jsx"
import { Family } from "../components/home/Family.jsx"
import { Counter } from "../components/home/Counter.jsx";
import { Products } from "../components/home/Products.jsx";
import { TourGallery } from "../components/home/TourGallery.jsx";
import { Testimonials } from "../components/home/Testimonials.jsx";
import { Footer } from "../components/shared/Footer.jsx";


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
            <Footer />
        </>
    )
}