import { useEffect } from "react";
import { Navbar } from "../components/shared/Navbar.jsx";
export function About() {
    useEffect(() => {
        document.title = "About Us - Adrian's Coffee Tour";
    }, []);

    return (
        <>
            <Navbar />
        </>
    )
}