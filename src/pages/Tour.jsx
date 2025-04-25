import { useEffect } from "react";
import { Navbar } from "../components/shared/Navbar.jsx";
import { PageTitle } from "../components/shared/PageTitle.jsx";
import { Info } from "../components/tour/Info.jsx";
export function Tour() {
    useEffect(() => {
        document.title = "Our Tour - Adrian's Coffee Tour";
    }, []);

    return (
        <>
            <Navbar />
            <PageTitle page={"Our Tour"} title={"Explore the  Coffee Journey"} text={"Experience every step of coffee making—guided by tradition, surrounded by nature."} />
            <Info />
        </>
    )
}