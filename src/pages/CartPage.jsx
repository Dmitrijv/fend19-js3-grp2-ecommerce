import React, { useContext } from "react";
import CartList from "../components/CartList";
import CartDiscount from "../components/CartDiscount";
import CartConfirm from "../components/CartConfirm";
import { CartContext } from "../contexts/CartContext";

export default function CartPage() {
  const { cart } = useContext(CartContext);
  // const cartItems = []; // TODO: feetch this bad boy from local storage like the hackers we are

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
    <div className="cartPage">
      <div>
        <div>
          <CartList />
        </div>
        <CartDiscount />
      </div>
      <CartConfirm />
    </div>
  );
}
