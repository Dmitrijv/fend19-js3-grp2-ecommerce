import React, { useContext } from "react";

import { EcommerceContext } from "../contexts/EcommerceContext";
import ConfirmProduct from "../components/ConfirmProduct";

export default function ConfirmPage() {
  const { products, cart, fullName, getCart } = useContext(EcommerceContext);

  // let storage = JSON.parse(localStorage.getItem("myCart"));

  const clearCart = () => {
    localStorage.clear();
    // getCart();
  };

  return (
    <div className="confirmpage-container">
      <h1>Thank you {fullName} for your order!</h1>
      <ul className="confirmpage-list-wrapper">
        <h2>Order details</h2>
        {products &&
          Object.entries(products).map((product, index) => {
            let productId = product[0];
            return cart[productId] ? <ConfirmProduct key={`product-card-${index}`} product={product[1]} /> : null;
          })}
      </ul>{" "}
      {clearCart()}
    </div>
  );
}
