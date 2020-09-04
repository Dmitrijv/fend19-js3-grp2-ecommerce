import React from "react";

export default function CouponItem({ coupon }) {
  const discountString = Math.floor((1 - coupon.discount) * 100);
  return (
    <div className="coupon">
      <div className="coupon-intro">
        <h4>{coupon.campaignName}</h4>
      </div>
      <div className="coupon-value">{discountString}%</div>
    </div>
  );
}
