import React, { useContext } from "react";
import CartList from "../components/CartList";
import CartDiscount from "../components/CartDiscount";
import CartConfirm from "../components/CartConfirm";

import { EcommerceContext } from "../contexts/EcommerceContext";

export default function CartPage() {
  const { cart } = useContext(EcommerceContext);

  // cover the case when the cart is empty
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
    <div className="centered-container cart-page">
      <div className="white-card">
        <h2>Checkout</h2>
        <CartList />
      </div>
      <div className="white-card">
        <CartDiscount />
      </div>
      <div className="white-card">
        <CartConfirm />
      </div>
    </div>
  );
}
