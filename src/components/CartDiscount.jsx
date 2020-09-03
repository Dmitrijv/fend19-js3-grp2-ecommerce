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
    let inputVal = discountInput.current.value.toUpperCase();

    switch (inputVal) {
      case "BLACKFRIDAY":
        setDiscount(discountData.BLACKFRIDAY.discount);
        break;
      case "BLACKFRIDAY2019":
        setDiscount(discountData.BLACKFRIDAY2019.discount);
        break;
      case "SUMMER19":
        setDiscount(discountData.SUMMER19.discount);
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
        <p className="checkout-section-name">
          Redeem coupons:{" "}
          <span className="hidden success" id="coupon-feedback-message">
            code accepted!
          </span>
        </p>
        <div className="cart-discount__input form-container">
          <input ref={discountInput} type="text" placeholder="enter code" class="coupon-input" />
          <button onClick={checkDiscount}>Redeem</button>
        </div>
      </div>

      <div class="coupons">
        <div class="coupon ">
          <div class="coupon-intro">
            <h4>BLACKFRIDAY2019</h4>
          </div>
          <div class="coupon-value">20%</div>
        </div>
      </div>
      {renderDiscountPrice()}
    </div>
  );
}
