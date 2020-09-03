import React, { useRef, useContext } from "react";

import { EcommerceContext } from "../contexts/EcommerceContext";

export default function CartConfirm() {
  const { cart, totalPriceWithDiscount, totalPrice } = useContext(
    EcommerceContext
  );

  console.log(cart);

  const firstnameInput = useRef();
  const lastnameInput = useRef();
  const URL =
    "https://mock-data-api.firebaseio.com/e-commerce/orders/group-2.json";

  function handleOnClick() {
    sendOrderToAPI();
  }

  function sendOrderToAPI() {
    const orderData = {
      firstname: firstnameInput.current.value,
      lastname: lastnameInput.current.value,
      orderedproducts: { ...cart },
      totalPriceWithDiscount:
        totalPriceWithDiscount !== 0 ? totalPriceWithDiscount : "No discount",
      totalprice: totalPrice,
    };

    fetch(URL, {
      method: "POST",
      body: JSON.stringify(orderData),
    });
  }

  return (
    <div>
      <input ref={firstnameInput} type="text" placeholder="First name:" />
      <input ref={lastnameInput} type="text" placeholder="Last name:" />
      <button onClick={handleOnClick}>Confirm order</button>
    </div>
  );
}
