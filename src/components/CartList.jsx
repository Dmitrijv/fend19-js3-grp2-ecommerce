import React, { useContext } from "react";
import CartProductCard from "./CartProductCard";

import { EcommerceContext } from "../contexts/EcommerceContext";

export default function CartList() {
  const { products, cart, totalPrice } = useContext(EcommerceContext);

  if (!cart || !products) return <div />; // sanity check

  return (
    <div>
      <ul>
        {Object.keys(cart).map((cartItem) => {
          const productId = cartItem.productId;
          return products[productId] ? (
            <CartProductCard key={`product-card-${productId}`} product={products[productId]} />
          ) : null;
        })}
      </ul>
      <p>Total price: {totalPrice}</p>
    </div>
  );
}
