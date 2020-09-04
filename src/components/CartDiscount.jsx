import React, { useContext, useState, useEffect, useRef } from "react";
import CouponItem from "./CouponItem";

import { EcommerceContext } from "../contexts/EcommerceContext";

export default function CartDiscount() {
  const DISCOUNT_URL = "https://mock-data-api.firebaseio.com/e-commerce/couponCodes.json";
  const discountInput = useRef();
  const [discountList, setDiscountList] = useState({});
  const { totalPrice, setTotalPriceWithDiscount, discountData, setDiscountData } = useContext(EcommerceContext);
  const [discountMessage, setDiscountMessage] = useState(null);

  const fetchDiscount = () => {
    fetch(DISCOUNT_URL)
      .then((res) => res.json())
      .then((result) => {
        setDiscountList(result);
      });
  };

  useEffect(() => {
    fetchDiscount();
  }, []);

  const checkDiscount = () => {
    let inputVal = discountInput.current.value.toUpperCase();

    if (discountList[inputVal] && discountList[inputVal].valid) {
      const discountObj = {
        campaignName: inputVal,
        discount: discountList[inputVal].discount,
      };
      setDiscountData(discountObj);
      let priceWithDiscount = parseFloat((totalPrice * discountObj.discount).toFixed(2));
      setTotalPriceWithDiscount(priceWithDiscount);
      setDiscountMessage(`Discounted price: ${priceWithDiscount} sek`);
    } else {
      setDiscountData({});
      setTotalPriceWithDiscount(0);
      setDiscountMessage("");
    }
  };

  // const renderDiscountPrice = () => {
  //   if (Object.keys(discountData).length !== 0) {
  //     let priceWithDiscount = parseFloat((totalPrice * discountData.discount).toFixed(2));
  //     setTotalPriceWithDiscount(priceWithDiscount);
  //     setDiscountMessage("Discounted price: {priceWithDiscount} sek");
  //   }
  // };

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
          <input ref={discountInput} type="text" placeholder="enter code" className="coupon-input" />
          <button onClick={checkDiscount}>Redeem</button>
        </div>
      </div>

      <div className="coupons">{discountData.campaignName && <CouponItem coupon={discountData} />}</div>
      {Object.keys(discountData).length !== 0 ? <p>{discountMessage}</p> : null}
    </div>
  );
}
