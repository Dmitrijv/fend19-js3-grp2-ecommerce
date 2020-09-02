import React, { useEffect, useRef } from "react";

export default function CartConfirm() {
  const firstnameInput = useRef();
  const lastnameInput = useRef();
  const URL = "google.com";

  const orderData = {
    "group-2": {
      firstname: firstnameInput.current.value,
      lastname: lastnameInput.current.value,
      //hämta från useContext: carten
      //ordered_products: [item],
      // total: price,
    },
  };

  function sendOrderToAPI() {
    //fetch
    fetch(URL, {
      method: "POST",
      body: JSON.stringify(orderData),
    });
  }

  return (
    <div>
      <input ref={firstnameInput} type="text">
        First name:
      </input>
      <input ref={lastnameInput} type="text">
        Lastname:
      </input>
      <button onClick={sendOrderToAPI}>Confirm order</button>
    </div>
  );
}
