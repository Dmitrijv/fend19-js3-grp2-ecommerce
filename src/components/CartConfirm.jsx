import React, { useRef, useContext } from "react";

import { EcommerceContext } from "../contexts/EcommerceContext";
import { useHistory } from "react-router";

export default function CartConfirm() {
  const { cart, totalPriceWithDiscount, totalPrice, setFullName } = useContext(EcommerceContext);

  const URL = "https://mock-data-api.firebaseio.com/e-commerce/orders/group-2.json";
  //   const URL = "https://mock-data-api.firebaseio.com/e-commerce/orders/test.json";
  const firstnameInput = useRef();
  const lastnameInput = useRef();
  const history = useHistory();

  function handleOnClick(event) {
    sendOrderToAPI();
    event.preventDefault();
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
    })
      .then(res => res.json())
      .then(reply => {
        // console.log("sent order data to the endpoint like a boss");
        history.push(`/confirmpage`);
      });
  }

  return (
    <div>
      <p className="checkout-section-name">Confirm order</p>
      <div className="form-container">
        <form onSubmit={handleOnClick}>
          <input ref={firstnameInput} type="text" placeholder="First name" required />
          <input ref={lastnameInput} type="text" placeholder="Last name" required />
          <button className="btn-submit" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
