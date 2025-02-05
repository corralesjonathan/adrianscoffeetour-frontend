import React, { useEffect } from "react";
import { Navbar } from "../components/navigation/Navbar.jsx";

export function Tour() {
  useEffect(() => {
    document.title = "Home - Adrian's Coffee Tour";
  }, []);

  return (
    <>
      <Navbar logo="./icons/logo.svg" />
    </>
  );
}
