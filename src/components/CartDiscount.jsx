import React from "react";
import { useState } from "react";
import { useRef } from "react";

export default function CartDiscount() {
  const DISCOUNT_URL = "https://mock-data-api.firebaseio.com/e-commerce/couponCodes.json";
  const discountInput = useRef();
  const [discountSale, setDiscountSale] = useState({});

  const fetchDiscount = () => {
    const url = DISCOUNT_URL;

    fetch(url)
      .then(res => res.json())
      .then(result => {
        setDiscountSale(result);
      });
  };

  useState(() => {
    fetchDiscount();
  }, []);

  const checkInputVal = () => {
    let inputVal = discountInput.current.value;
    inputVal = inputVal.toUpperCase();
    let discount;

    switch (inputVal) {
      case "BLACKFRIDAY":
        discount = discountSale.BLACKFRIDAY.discount;
        break;
      case "BLACKFRIDAY2019":
        discount = discountSale.BLACKFRIDAY2019.discount;
        break;
      case "SUMMER19":
        discount = discountSale.SUMMER19.discount;
        break;

      default:
        discount = "No discount";
        break;
    }
    return discount;
  };

  return (
    <div className="cart-discount-wrapper">
      <div className="cart-discount__input">
        <p>Discount</p>
        <input ref={discountInput} onChange={checkInputVal} type="text" />
      </div>
      <button>Add</button>
    </div>
  );
}
