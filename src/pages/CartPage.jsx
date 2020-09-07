import React from "react";
import CartList from "../components/CartList";
import CartDiscount from "../components/CartDiscount";
import CartConfirm from "../components/CartConfirm";

export default function CartPage() {
  return (
    <div className="centered-container cart-page">
      <h1 className="cart-headline">Let's make an order</h1>
      <div className="white-card">
        <h2 className="page-title">Checkout</h2>
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
