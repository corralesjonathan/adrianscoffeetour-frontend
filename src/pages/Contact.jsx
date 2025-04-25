import { useEffect } from "react";
import { Navbar } from "../components/shared/Navbar.jsx";
export function Contact() {
    useEffect(() => {
        document.title = "Contact - Adrian's Coffee Tour";
    }, []);

    return (
        <>
            <Navbar />
        </>
    )
}