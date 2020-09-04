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
      .then(res => res.json())
      .then(result => {
        setDiscountList(result);
      });
  };

  useEffect(() => {
    fetchDiscount();
  }, []);

  function getDiscountMessage() {
    return discountData.discount && totalPrice !== 0
      ? `Discounted total: ${Math.round(Number(totalPrice) * Number(discountData.discount))}  sek`
      : "No active coupon.";
  }

  const checkDiscount = event => {
    let inputVal = discountInput.current.value.toUpperCase();

    if (discountList[inputVal] && discountList[inputVal].valid) {
      const discountObj = {
        campaignName: inputVal,
        discount: discountList[inputVal].discount
      };
      setDiscountData(discountObj);
      let priceWithDiscount = parseFloat((totalPrice * discountObj.discount).toFixed(2));
      setTotalPriceWithDiscount(priceWithDiscount);
      setDiscountMessage(`Discounted price: ${priceWithDiscount} sek`);
    } else if (!discountData.campaignName) {
      setDiscountData({});
      setTotalPriceWithDiscount(0);
      setDiscountMessage("");
    }
    event.preventDefault();
  };

  return (
    <div className="cart-discount-wrapper">
      <div className="cart-discount">
        <p className="checkout-section-name">
          Redeem coupon:{" "}
          <span className="hidden success" id="coupon-feedback-message">
            code accepted!
          </span>
        </p>
        <div className="cart-discount__input">
          <form onSubmit={checkDiscount} className="form-container">
            <input ref={discountInput} type="text" placeholder="enter code" className="coupon-input" required />
            <button type="submit">Redeem</button>
          </form>
        </div>
      </div>

      <div className="coupons">{discountData.campaignName && <CouponItem coupon={discountData} />}</div>
      <p className="text-right">{getDiscountMessage()}</p>
    </div>
  );
}
