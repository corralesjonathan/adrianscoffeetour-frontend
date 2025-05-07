import { useEffect } from "react";
import { Navbar } from "../components/shared/Navbar.jsx";
import { PageTitle } from "../components/shared/PageTitle.jsx";
import { Info } from "../components/tour/Info.jsx";
import { TourHighlights } from "../components/tour/TourHighlights.jsx";
import { Video } from "../components/tour/Video.jsx";
import { FAQS } from "../components/tour/FAQS.jsx";
import { Footer } from "../components/shared/Footer.jsx";
export function Tour() {
    useEffect(() => {
        document.title = "Our Tour - Adrian's Coffee Tour";
    }, []);

    return (
        <>
            <Navbar />
            <PageTitle page={"Our Tour"} title={"Explore the  Coffee Journey"} text={"Experience every step of coffee making—guided by tradition, surrounded by nature."} />
            <Info />
            <TourHighlights />
            <Video />
            <FAQS />
            <Footer />
        </>
    )
}