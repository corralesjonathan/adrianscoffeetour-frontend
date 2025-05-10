import { Navbar } from "../components/shared/Navbar.jsx";
import { useEffect } from "react";

export function Checkout() {

  useEffect(() => {
    document.title = "Checkout - Adrian's Coffee Tour";
}, []);

  return (
    <>
      <Navbar />

    </>
  );
}
