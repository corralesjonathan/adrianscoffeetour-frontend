import { Link } from "react-router-dom";
import { Newsletter } from "../home/Newsletter";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebook, FaTiktok, FaYoutube} from "react-icons/fa";

export function FooterNewsletter() {
    const links = [
        { name: "Home", route: "/" },
        { name: "Our Tour", route: "/tour" },
        { name: "About us", route: "/about" },
        { name: "Products", route: "/products" },
        { name: "Contact", route: "/contact" },
    ]
    return (
        <div className="flex flex-co items-center justify-center relative w-full pt-[180px] pb-[20px] bg-adrians-red
        max-lg:pt-[220px]
        max-sm:pt-[260px]
        ">
            {/* Newletter */}
            <Newsletter />

            {/* Content */}	
            <div className="flex flex-col gap-[40px] w-[90vw] m-auto justify-between items-center">
                {/* Links */}
                <div 
                className="w-full justify-between items-center flex gap-[20px]
                max-lg:flex-col max-lg:gap-[40px]
                ">
                    <img src="./icons/icon.svg" alt="" />
                    
                    <ul 
                    className="flex gap-[20px] items-center
                    max-sm:flex-col
                    ">
                        {links.map((link, index) => (
                            <li key={index}>
                                <Link 
                                    to={link.route} 
                                    className="font-medium text-[18px] text-white
                                    hover:text-white/70
                                    transition-all duration-300 ease-in-out
                                    ">
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    
                    <Link 
                        to="/privacy"
                        className="font-medium text-[18px] text-white
                        hover:text-white/70
                        transition-all duration-300 ease-in-out"
                        >
                        Privacy Policy
                    </Link>
                </div>
                
                {/* Divider */}
                <span className="w-full h-[1px] bg-white"></span>
                
                {/* Socials */}
                <div className="w-full justify-center items-center flex gap-[10px]">
                    <a href="https://www.instagram.com/adrianscoffeetour/">
                        <RiInstagramFill 
                        className="text-adrians-red bg-white w-[40px] h-[40px] rounded-full p-[7px]
                        hover:scale-105
                        transition-all duration-300 ease-in-out
                        "/>
                    </a>
                    <a href="https://www.facebook.com/adrianscoffeetour">
                        <FaFacebook 
                        className="text-adrians-red bg-white w-[40px] h-[40px] rounded-full p-[7px]
                        hover:scale-105
                        transition-all duration-300 ease-in-out
                        "/>
                    </a>
                    <a href="https://www.tiktok.com/@adrianscoffeetour">
                        <FaTiktok 
                        className="text-adrians-red bg-white w-[40px] h-[40px] rounded-full p-[10px]
                        hover:scale-105
                        transition-all duration-300 ease-in-out
                        "/>
                    </a>
                    <a href="https://www.youtube.com/@adrianscoffeetour">
                        <FaYoutube 
                        className="text-adrians-red bg-white w-[40px] h-[40px] rounded-full p-[7px]
                        hover:scale-105
                        transition-all duration-300 ease-in-out
                        "/>
                    </a>
                </div>
                
                {/* Copyright */ }
                <span className="mt-[20px] font-regular text-[14px] text-white">©{new Date().getFullYear()} All Rights Reserved</span>
            </div>
        </div>
    )
}