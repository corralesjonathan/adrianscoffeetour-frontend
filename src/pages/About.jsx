import { useEffect } from "react";
import { Navbar } from "../components/shared/Navbar.jsx";
import { PageTitle } from "../components/shared/PageTitle.jsx";
import { Origins } from "../components/about/Origins.jsx";
import { Family } from "../components/about/Family.jsx";
import { Company } from "../components/about/Company.jsx";
export function About() {
    useEffect(() => {
        document.title = "About Us - Adrian's Coffee Tour";
    }, []);

    return (
        <>
            <Navbar />
            <PageTitle page={"About Us"} title={"MEET THE HEART BEHIND THE TOUR"} text={"The story of Adrian’s Coffee Tour begins with family, tradition, and a deep connection to the land."} />
            <Origins />
            <Family />
            <Company />
        </>
    )
}