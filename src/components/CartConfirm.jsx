import React, { useRef, useContext } from "react";

import { EcommerceContext } from "../contexts/EcommerceContext";
import { Link } from "react-router-dom";

export default function CartConfirm() {
  const { cart, totalPriceWithDiscount, totalPrice, setFullName } = useContext(EcommerceContext);

  const firstnameInput = useRef();
  const lastnameInput = useRef();
  const URL = "https://mock-data-api.firebaseio.com/e-commerce/orders/group-2.json";

  function handleOnClick() {
    sendOrderToAPI();
  }

  function sendOrderToAPI() {
    const discountMessage = totalPriceWithDiscount !== 0 ? totalPriceWithDiscount : "No discount";
    let firstname = firstnameInput.current.value;
    let lastname = lastnameInput.current.value;
    setFullName(firstname + " " + lastname);

    const orderData = {
      firstname: firstname,
      lastname: lastname,
      orderedproducts: { ...cart },
      totalPriceWithDiscount: discountMessage,
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
      <Link to="/confirmpage" onClick={handleOnClick}>
        Confirm order
      </Link>
    </div>
  );
}
