import React, { useContext } from "react";
import CartProductCard from "./CartProductCard";

import { EcommerceContext } from "../contexts/EcommerceContext";

export default function CartList() {
  const { products, cart, totalPrice } = useContext(EcommerceContext);
  return (
    <div>
      <ul>
        {products &&
          Object.entries(products).map((product, index) => {
            let productId = product[0];
            return cart[productId] ? <CartProductCard key={`product-card-${index}`} product={product[1]} /> : null;
          })}
      </ul>
      <p>Total price: {totalPrice}</p>
    </div>
  );
}
