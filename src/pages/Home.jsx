import { useEffect } from "react";
import { Navbar } from "../components/Navbar.jsx"


export function Home() {
    useEffect(() => {
        document.title = "Home - Adrian's Coffee Tour";
    }, []);

    return (
        <>   
            <Navbar />
        </>
    )
}