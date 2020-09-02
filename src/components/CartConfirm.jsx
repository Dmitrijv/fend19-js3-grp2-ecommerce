import React, { useEffect, useRef, useState } from "react";

export default function CartConfirm() {
  const [orderData, setOrderData] = useState({});

  const firstnameInput = useRef();
  const lastnameInput = useRef();
  const URL = "google.com";

  function handleOnClick() {
    setOrderData({
      "group-2": {
        //firstname: firstnameInput.current.value,
        //lastname: lastnameInput.current.value,
        //hämta från useContext: carten
        //ordered_products: [item],
        // total: price,
      },
    });
    // sendOrderToAPI();
  }

  function sendOrderToAPI() {
    //fetch
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
