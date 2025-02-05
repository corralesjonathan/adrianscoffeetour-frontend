import React , { useState, useEffect, useLocation } from "react";
import { Link } from "react-router-dom";
import "../../index.css";

export function Navbar({ logo }) {
  const [activeLink, setActiveLink] = useState("/"); // Ruta activa por defecto

  const handleLinkClick = (route) => {
    setActiveLink(route); // Actualiza el estado con la ruta activa
  };

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const currentPath = window.location.pathname; // Obtenemos la ruta actual
    setActiveLink(currentPath); // Actualizamos el estado al iniciar
  }, []);

  return (
    <nav className="navbar w-full flex fixed top-0 right-0 h-[100px] bg-white py-[20px]">
      <div className="w-[90vw] m-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold" onClick={() => handleLinkClick("/")}>
          <img className="w-[200px] max-sm:w-[140px]" src={logo} alt="Logo" />
        </Link>

        {/* Navigation Links */}
        <ul className="flex space-x-[20px] max-sm:hidden max-md:hidden">
          <li
            id="home"
            className={`text-adrians-brown font-regular text-[16px] transition-all duration-200 ease-in-out hover:text-adrians-red ${
              activeLink === "/" ? "text-adrians-red" : ""
            }`}
          >
            <Link to="/" onClick={() => handleLinkClick("/")}>
              HOME
            </Link>
          </li>
          <li
            id="tour"
            className={`text-adrians-brown font-regular text-[16px] transition-all duration-200 ease-in-out hover:text-adrians-red ${
              activeLink === "/tour" ? "text-adrians-red" : ""
            }`}
          >
            <Link to="/tour" onClick={() => handleLinkClick("/tour")}>
              OUR TOUR
            </Link>
          </li>
          <li
            id="about"
            className={`text-adrians-brown font-regular text-[16px] transition-all duration-200 ease-in-out hover:text-adrians-red ${
              activeLink === "/about" ? "text-adrians-red" : ""
            }`}
          >
            <Link to="/about" onClick={() => handleLinkClick("/about")}>
              ABOUT US
            </Link>
          </li>
          <li
            id="products"
            className={`text-adrians-brown font-regular text-[16px] transition-all duration-200 ease-in-out hover:text-adrians-red ${
              activeLink === "/products" ? "text-adrians-red" : ""
            }`}
          >
            <Link to="/products" onClick={() => handleLinkClick("/products")}>
              PRODUCTS
            </Link>
          </li>
          <li
            id="contact"
            className={`text-adrians-brown font-regular text-[16px] transition-all duration-200 ease-in-out hover:text-adrians-red ${
              activeLink === "/contact" ? "text-adrians-red" : ""
            }`}
          >
            <Link to="/contact" onClick={() => handleLinkClick("/contact")}>
              CONTACT US
            </Link>
          </li>
        </ul>

        {/* Book Now Button */}
        <Link
          to="/home#booktour"
          className="relative max-sm:hidden max-md:hidden overflow-hidden bg-adrians-red text-white font-bold py-[10px] px-[20px] rounded-[10px] group"
        >
          <span className="absolute inset-0 bg-black opacity-10 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
          <span className="relative">Book now!</span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          id="mobile-menu-button"
          className="hamburger flex flex-col gap-[6px] lg:hidden md:hidden"
          onClick={toggleMobileMenu}
        >
          <span className="hamburger-line bg-adrians-red h-[2px] w-[30px] rounded-full transition-all duration-300"></span>
          <span className="hamburger-line bg-adrians-red h-[2px] w-[30px] rounded-full transition-all duration-300"></span>
          <span className="hamburger-line bg-adrians-red h-[2px] w-[30px] rounded-full transition-all duration-300"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="fixed flex h-screen top-0 right-0 mt-[100px] py-[40px] z-[999] w-full bg-white flex-col justify-start items-center text-center gap-[20px] lg:hidden"
        >
          <ul className="flex flex-col space-y-[26px]">
            <li
              id="home"
              className={`text-adrians-brown font-regular text-[16px] transition-all duration-200 ease-in-out hover:text-adrians-red ${
                activeLink === "/home" ? "text-adrians-red" : ""
              }`}
            >
              <Link to="/home" onClick={() => handleLinkClick("/home")}>
                HOME
              </Link>
            </li>
            <li
              id="tour"
              className={`text-adrians-brown font-regular text-[16px] transition-all duration-200 ease-in-out hover:text-adrians-red ${
                activeLink === "/tour" ? "text-adrians-red" : ""
              }`}
            >
              <Link to="/tour" onClick={() => handleLinkClick("/tour")}>
                OUR TOUR
              </Link>
            </li>
            <li
              id="about"
              className={`text-adrians-brown font-regular text-[16px] transition-all duration-200 ease-in-out hover:text-adrians-red ${
                activeLink === "/about" ? "text-adrians-red" : ""
              }`}
            >
              <Link to="/about" onClick={() => handleLinkClick("/about")}>
                ABOUT US
              </Link>
            </li>
            <li
              id="products"
              className={`text-adrians-brown font-regular text-[16px] transition-all duration-200 ease-in-out hover:text-adrians-red ${
                activeLink === "/products" ? "text-adrians-red" : ""
              }`}
            >
              <Link to="/products" onClick={() => handleLinkClick("/products")}>
                PRODUCTS
              </Link>
            </li>
            <li
              id="contact"
              className={`text-adrians-brown font-regular text-[16px] transition-all duration-200 ease-in-out hover:text-adrians-red ${
                activeLink === "/contact" ? "text-adrians-red" : ""
              }`}
            >
              <Link to="/contact" onClick={() => handleLinkClick("/contact")}>
                CONTACT US
              </Link>
            </li>
          </ul>

          {/* Book Now Button */}
          <Link
            to="/home#booktour"
            className="relative overflow-hidden bg-adrians-red text-white font-bold py-[10px] px-[20px] rounded-[10px] group"
          >
            <span className="absolute inset-0 bg-black opacity-10 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
            <span className="relative">Book now!</span>
          </Link>
        </div>
      )}
    </nav>
  );
}
