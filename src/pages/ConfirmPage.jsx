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

  function getDiscountedPriceForCart(cart) {
    let totalPrice = Object.values(cart).reduce(function(sum, item) {
      const price = products[item.id].price;
      return sum + Number(item.qty) * Number(price);
    }, 0);
    const discountMultiplier = discountData.discount || 1;
    const priceWithDiscount = Math.round(totalPrice * discountMultiplier);
    return priceWithDiscount;
  }

  useEffect(() => {
    // ordering without customer data should not be possible
    if (!fullName || fullName.length === 0) {
      // console.log("attempted to order without filling in details");
      history.push(`/cart`);
    } else {
      setCartToRender(cart);
      setCouponToRender(discountData);
      setTotalPriceToRender(totalPrice);
      setdiscountedPriceToRender(getDiscountedPriceForCart(cart));
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
          {couponToRender.campaignName ? `Discounted price: ${discountedPriceToRender} sek` : `No discount applied.`}
        </p>
      </div>
    </div>
  );
}
