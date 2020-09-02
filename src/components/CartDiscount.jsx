import React, { useContext } from "react";
import { useState } from "react";
import { useRef } from "react";
import { CartContext } from "../contexts/CartContext";

export default function CartDiscount() {
  const DISCOUNT_URL = "https://mock-data-api.firebaseio.com/e-commerce/couponCodes.json";
  const discountInput = useRef();
  const [discountData, setDiscountData] = useState({});
  const { totalPrice } = useContext(CartContext);
  let [discount, setDiscount] = useState(0);

  const fetchDiscount = () => {
    const url = DISCOUNT_URL;

    fetch(url)
      .then(res => res.json())
      .then(result => {
        setDiscountData(result);
      });
  };

  useState(() => {
    fetchDiscount();
  }, []);

  const checkDiscount = () => {
    let inputVal = discountInput.current.value;
    inputVal = inputVal.toUpperCase();

    switch (inputVal) {
      case "BLACKFRIDAY":
        setDiscount(discountData.BLACKFRIDAY.discount);
        break;
      case "BLACKFRIDAY2019":
        setDiscount(discountData.BLACKFRIDAY2019.discount);
        break;
      case "SUMMER19":
        setDiscount((discount = discountData.SUMMER19.discount));
        break;

      default:
        setDiscount(0);
        break;
    }
  };

  const renderDiscountPrice = () => {
    return totalPrice * discount !== 0 ? <p>Discounted price: {(totalPrice * discount).toFixed(2)} sek</p> : "";
  };

  return (
    <div className="cart-discount-wrapper">
      <div className="cart-discount">
        <div className="cart-discount__input">
          <p>Discount</p>
          <input ref={discountInput} type="text" />
        </div>
        <button onClick={checkDiscount}>Add</button>
      </div>

      {renderDiscountPrice()}
    </div>
  );
}
