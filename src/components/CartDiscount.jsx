import React, { useContext, useState, useEffect, useRef } from "react";

import { EcommerceContext } from "../contexts/EcommerceContext";

export default function CartDiscount() {
  const DISCOUNT_URL = "https://mock-data-api.firebaseio.com/e-commerce/couponCodes.json";
  const discountInput = useRef();
  const [discountData, setDiscountData] = useState({});
  const { totalPrice, setTotalPriceWithDiscount } = useContext(EcommerceContext);
  let [discount, setDiscount] = useState(0);

  const fetchDiscount = () => {
    fetch(DISCOUNT_URL)
      .then(res => res.json())
      .then(result => {
        setDiscountData(result);
      });
  };

  useEffect(() => {
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
    let priceWithDiscount = parseFloat((totalPrice * discount).toFixed(2));
    setTotalPriceWithDiscount(priceWithDiscount);

    return totalPrice * discount !== 0 ? <p>Discounted price: {priceWithDiscount} sek</p> : "";
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
