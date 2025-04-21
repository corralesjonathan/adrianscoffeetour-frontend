import React, { useState, useEffect, useLocation } from "react";
import { Link } from "react-router-dom";
import { Main_btn } from "../components/Main_btn.jsx";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const links = [
    { name: "Home", route: "/" },
    { name: "Our Tour", route: "/tour" },
    { name: "About us", route: "/about" },
    { name: "Products", route: "/products" },
    { name: "Contact", route: "/contact" },
  ]

  const handleLinkClick = (route) => {
    setActiveLink(route);
  };

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const currentPath = window.location.pathname;
    setActiveLink(currentPath);
  }, []);

  return (
    <nav className="z-50 w-full flex fixed top-0 right-0 h-[100px] bg-adrians-bg py-[20px]">
      <div 
      className="w-[80vw] m-auto flex justify-between items-center
      max-sm:w-[90vw]
      ">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold" onClick={() => handleLinkClick("/")}>
          <img className="w-[200px] max-sm:w-[140px]" src="./imgs/logo.svg" alt="Logo" />
        </Link>

        {/* Navigation links */}
        <ul className="flex space-x-[20px] max-sm:hidden max-md:hidden">
          {links.map((link) => (
            <li
              key={link.name}
              className={`text-adrians-brown font-regular text-[16px] uppercase transition-all duration-200 ease-in-out hover:text-adrians-red ${activeLink === link.route ? "text-adrians-red" : ""
                }`}
            >
              <Link to={link.route} onClick={() => handleLinkClick(link.route)}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Book Now Button */}
        <div className="max-sm:hidden">
          <Main_btn text={"Book Now"} />
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`relative text-adrians-red  
              transition-all duration-300 ease-in-out transform ${isOpen ? "rotate-90 scale-125" : "rotate-0 scale-100"
              }`}
          >
            {isOpen ? (
              <X size={32} strokeWidth={1} />
            ) : (
              <Menu size={32} strokeWidth={1} />
            )}
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={`
          lg:hidden
          flex fixed h-screen top-0 right-0 mt-[100px] py-[40px] z-[-1] w-full bg-adrians-bg flex-col justify-start items-center text-center gap-[20px]"
          transition-all duration-500 ease-in-out
          ${isOpen ? 'opacity-100 translate-y-0 gap-[20px]' : 'opacity-0 translate-y-[-300px] gap-[20px]'}
          `}
        >
          {/* Navigation links */}
          {links.map((link) => (
            <>
            <li
              key={link.name}
              className={`list-none text-adrians-brown font-regular text-[16px] uppercase transition-all duration-200 ease-in-out hover:text-adrians-red ${activeLink === link.route ? "text-adrians-red" : ""
                }`}
            >
              <Link to={link.route} onClick={() => handleLinkClick(link.route)}>
                {link.name}
              </Link>
            </li>
            </>
          ))}

          {/* Book Now Button */}
          <div className="lg:hidden">
            <Main_btn text={"Book Now"} />
          </div>
        </div>
    </nav>
  );
}
