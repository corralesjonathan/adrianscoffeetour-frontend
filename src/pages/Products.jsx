import { useEffect } from "react";
import { Navbar } from "../components/shared/Navbar.jsx";
import { PageTitle } from "../components/shared/PageTitle.jsx";
import { Product } from "../components/products/Product.jsx";
import { Footer } from "../components/shared/Footer.jsx";
export function Products() {
    useEffect(() => {
        document.title = "Products - Adrian's Coffee Tour";
    }, []);

    return (
        <>
            <Navbar />
            <PageTitle page={"Products"} title={"Our Coffee Selection"} text={"Discover Our Premium Coffee Roasts"} />
            <Product title={"Light Roast" } description={"The light roast features sun-dried red beans with coffee honey properties, offering sweet, acidic and chocolaty flavors."} color={"#C69B06"} img={"/imgs/circle_product_1.webp"} justify={"justify-end"} reverse={""} />
            <Product title={"Medium Roast" } description={"Medium roast offers balanced acidity with natural aromas and flavors of blackberries, sugar cane and fruit."} color={"#C92E17"} img={"/imgs/circle_product_2.webp"} justify={"justify-start"} reverse={"flex-row-reverse"} />
            <Product title={"Dark Roast" } description={"In the dark roast we will find the magnificent intense flavors of chocolate and fruit."} color={"#A0A0A0"} img={"/imgs/circle_product_3.webp"} justify={"justify-end"} reverse={""} />
            <Footer />
        </>
    )
}