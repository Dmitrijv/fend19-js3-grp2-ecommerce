import React, { useContext } from "react";

import { EcommerceContext } from "../contexts/EcommerceContext";
import ConfirmProduct from "../components/ConfirmProduct";

export default function ConfirmPage() {
  const { products, cart, setCart, fullName } = useContext(EcommerceContext);

  const clearCart = () => {
    // setCart({});
  };

  return (
    <div className="confirmpage-container">
      <h1>Thank you {fullName} for your order!</h1>
      <div className="confirmpage-list-wrapper">
        <h2>Order details</h2>
        <ul>
          {products &&
            Object.entries(products).map((product, index) => {
              let productId = product[0];
              return cart[productId] ? <ConfirmProduct key={`product-card-${index}`} product={product[1]} /> : null;
            })}
        </ul>
        <p>[total price here]</p>
        <button onClick={clearCart}>Back to store</button>
      </div>
    </div>
  );
}
