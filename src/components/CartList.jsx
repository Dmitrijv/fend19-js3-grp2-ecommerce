import React, { useContext } from "react";
import CartListItem from "./CartListItem";

import { EcommerceContext } from "../contexts/EcommerceContext";

export default function CartList() {
  const { products, cart, totalPrice } = useContext(EcommerceContext);

  if (!products) return <div />; // sanity check

  // cart is empty
  if (!cart || Object.keys(cart).length === 0) {
    return <p className="text-center">There are no items in your cart.</p>;
  }

  return (
    <div>
      <ul className="cart-list">
        {Object.keys(cart).map(productId => {
          return products[productId] ? (
            <CartListItem key={`product-card-${productId}`} product={products[productId]} />
          ) : null;
        })}
      </ul>
      <p>Total: {totalPrice} sek</p>
    </div>
  );
}
