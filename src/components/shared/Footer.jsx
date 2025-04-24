import { Link } from "react-router-dom";
export function Footer() {
    const links = [
        { name: "Home", route: "/" },
        { name: "Our Tour", route: "/tour" },
        { name: "About us", route: "/about" },
        { name: "Products", route: "/products" },
        { name: "Contact", route: "/contact" },
    ]
    return (
        <div className="flex flex-col w-full p-[40px] bg-adrians-red">
            <div className="flex flex-col gap-[20px] w-[80vw] m-auto justify-between items-center">
                <div className="w-full justify-between items-center flex gap-[20px]">
                    <img src="./icons/icon.svg" alt="" />
                    
                    <ul className="flex gap-[20px] items-center">
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

                <span className="w-full h-[1px] bg-white"></span>

                <span className="font-regular text-[16px] text-white">©2025 All Rights Reserved</span>
            </div>
        </div>
    )
}