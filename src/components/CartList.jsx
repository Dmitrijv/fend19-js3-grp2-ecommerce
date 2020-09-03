import React, { useContext } from "react";
import CartListItem from "./CartListItem";

import { EcommerceContext } from "../contexts/EcommerceContext";

export default function CartList() {
  const { products, cart, totalPrice } = useContext(EcommerceContext);

  if (!products) return <div />; // sanity check

  // cart is empty
  if (!cart || Object.keys(cart).length === 0) {
    return (
      <div className="centered-container">
        <div className="white-card">
          <p>There are no items in your cart.</p>
        </div>
      </div>
    );
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
      <p>Total price: {totalPrice}</p>
    </div>
  );
}
