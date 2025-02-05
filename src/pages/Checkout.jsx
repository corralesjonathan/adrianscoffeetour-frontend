import { Navbar } from "../components/navigation/Navbar.jsx";
import { useLocation } from "react-router-dom";

export function Checkout() {
  const location = useLocation();
  const checkoutData = location.state;

  if (!checkoutData) {
    return <div>Checkout data not found.</div>;
  }

  return (
    <>
      <Navbar logo="./icons/logo.svg" />

      <div className="w-[90vw] mt-[120px] m-auto p-[40px] max-sm:p-[20px]">
        <h2>Checkout</h2>
        <p>Schedule ID: {checkoutData.schedule_id}</p>
        <p>Adults: {checkoutData.adults}</p>
        <p>Children: {checkoutData.children}</p>
        <p>Subtotal: ${checkoutData.subtotal}</p>
        <p>Taxes: ${checkoutData.taxes}</p>
        <p>Total: ${checkoutData.total}</p>
      </div>

    </>
  );
}
