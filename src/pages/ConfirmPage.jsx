import React, { useContext } from "react";

import { EcommerceContext } from "../contexts/EcommerceContext";
import ConfirmProduct from "../components/ConfirmProduct";

export default function ConfirmPage() {
  const { products, cart, setCart, fullName } = useContext(EcommerceContext);

  const clearCart = () => {
    localStorage.setItem("myCart", JSON.stringify({})); // clear persisted cart in local storage
    setCart({}); // clear reacts cart variable
  };

  function getOrderTotal() {
    // 1. get sum of all product prices
    // 2. apply all redeemed coupons
    return "TODO";
  }

  return (
    <div className="confirmpage-container">
      <h1>Thank you {fullName} for your order!</h1>
      <div className="confirmpage-list-wrapper">
        <h2>Ordered products</h2>
        <ul>
          {products &&
            Object.entries(products).map((product, index) => {
              let productId = product[0];
              return cart[productId] ? <ConfirmProduct key={`product-card-${index}`} product={product[1]} /> : null;
            })}
        </ul>
        <h2>Redeemed coupons</h2>
        <p className="confirmpage-totalprice">Total price: {getOrderTotal()} sek</p>
        <button onClick={clearCart}>Back to store</button>
      </div>
    </div>
  );
}
