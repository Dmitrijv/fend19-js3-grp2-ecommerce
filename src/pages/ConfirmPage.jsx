import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";

import { EcommerceContext } from "../contexts/EcommerceContext";
import ConfirmProduct from "../components/ConfirmProduct";
import CouponItem from "../components/CouponItem";

export default function ConfirmPage() {
  const history = useHistory();

  const {
    products,
    cart,
    setCart,
    fullName,
    discountData,
    setDiscountData,
    totalPrice,
    totalPriceWithDiscount,
    setTotalPriceWithDiscount
  } = useContext(EcommerceContext);

  const [cartToRender, setCartToRender] = useState({});
  const [couponToRender, setCouponToRender] = useState({});
  const [totalPriceToRender, setTotalPriceToRender] = useState(0);
  const [discountedPriceToRender, setdiscountedPriceToRender] = useState(0);

  const clearCart = () => {
    localStorage.setItem("myCart", JSON.stringify({})); // clear persisted cart in local storage
    setCart({}); // clear reacts cart variable
    setDiscountData({});
    setTotalPriceWithDiscount(0);
  };

  useEffect(() => {
    // ordering without customer data should not be possible
    if (!fullName || fullName.length === 0) {
      // console.log("attempted to order without filling in details");
      history.push(`/cart`);
    } else {
      setCartToRender(cart);
      setCouponToRender(discountData);
      setTotalPriceToRender(totalPrice);
      setdiscountedPriceToRender(totalPriceWithDiscount);
      clearCart();
    }
  }, []);

  return (
    <div className="confirmpage-container">
      <h1>Thank you for your order, {fullName}!</h1>
      <div className="confirmpage-list-wrapper">
        <h2>Ordered products</h2>
        <ul>
          {Object.keys(cartToRender).map(productId => {
            return products[productId] ? (
              <ConfirmProduct
                key={`product-card-${productId}`}
                product={products[productId]}
                cartToRender={cartToRender}
              />
            ) : null;
          })}
          <p className="confirmpage-totalprice">Total price: {totalPriceToRender} sek</p>
        </ul>
        <h2>Redeemed coupons</h2>
        <div className="coupons">{couponToRender.campaignName && <CouponItem coupon={couponToRender} />}</div>
        <p className="confirmpage-totalprice">
          {discountedPriceToRender !== 0 ? `Discounted price: ${discountedPriceToRender} sek` : `No discount applied.`}
        </p>
      </div>
    </div>
  );
}
