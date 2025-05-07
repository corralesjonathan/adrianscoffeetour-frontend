import { useEffect } from "react";
import { Navbar } from "../components/shared/Navbar.jsx";
import { PageTitle } from "../components/shared/PageTitle.jsx";
import { ContactUs } from "../components/contact/ContactUs.jsx";
import { Form } from "../components/contact/Form.jsx";
import { Footer } from "../components/shared/Footer.jsx";
export function Contact() {
    useEffect(() => {
        document.title = "Contact - Adrian's Coffee Tour";
    }, []);

    return (
        <>
            <Navbar />
            <PageTitle page={"Contact"} title={"Connect with Us"} text={"Have questions or want to learn more about our coffee tour? We’re here to help!"} />
            <ContactUs />
            <Form />
            <Footer />
       </>
    )
}