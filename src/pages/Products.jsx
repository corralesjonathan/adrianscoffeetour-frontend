import { useEffect } from "react";
import { Navbar } from "../components/shared/Navbar.jsx";
export function Products() {
    useEffect(() => {
        document.title = "Products - Adrian's Coffee Tour";
    }, []);

    return (
        <>
            <Navbar />
        </>
    )
}