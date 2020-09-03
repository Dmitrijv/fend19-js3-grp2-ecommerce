import React, { useContext } from "react";

import { EcommerceContext } from "../contexts/EcommerceContext";
import ConfirmProduct from "../components/ConfirmProduct";

export default function ConfirmPage() {
  const { products, cart, totalPrice } = useContext(EcommerceContext);

  console.log(window.localStorage);

  return (
    <div className="confirmpage-container">
      <h1>Thank you for your order!</h1>
      <ul>
        {products &&
          Object.entries(products).map((product, index) => {
            let productId = product[0];
            return cart[productId] ? <ConfirmProduct key={`product-card-${index}`} product={product[1]} /> : null;
          })}
      </ul>
      <p>Total price: {totalPrice}</p>
    </div>
  );
}
