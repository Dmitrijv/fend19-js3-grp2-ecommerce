import React, { useContext, useEffect, useState } from "react";

import { EcommerceContext } from "../contexts/EcommerceContext";
import ConfirmProduct from "../components/ConfirmProduct";
import CouponItem from "../components/CouponItem";

export default function ConfirmPage() {
  const {
    products,
    cart,
    setCart,
    fullName,
    discountData,
    setDiscountData,
    totalPrice,
    totalPriceWithDiscount,
    setTotalPriceWithDiscount,
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
    setCartToRender(cart);
    setCouponToRender(discountData);
    setTotalPriceToRender(totalPrice);
    setdiscountedPriceToRender(totalPriceWithDiscount);
    clearCart();
  }, []);

  return (
    <div className="confirmpage-container">
      <h1>Thank you {fullName} for your order!</h1>
      <div className="confirmpage-list-wrapper">
        <h2>Ordered products</h2>
        <ul>
          {Object.keys(cartToRender).map((productId) => {
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
        <p className="confirmpage-totalprice">Discounted price: {discountedPriceToRender} sek</p>
      </div>
    </div>
  );
}
