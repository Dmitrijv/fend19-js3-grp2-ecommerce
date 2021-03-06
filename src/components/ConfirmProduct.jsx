import React, { useState, useContext } from "react";

import { EcommerceContext } from "../contexts/EcommerceContext";

export default function ConfirmProduct({ product, cartToRender }) {
  const productId = product.id;
  const [qtyInCart, setQtyInCart] = useState(cartToRender[productId].qty);

  const gallery = product.images ? product.images : [];
  const productCoverSource = gallery[0] ? gallery[0].src.small : `https://via.placeholder.com/700x200`;
  const productCoverAlt = gallery[0] ? gallery[0].alt : `Cover image for this product.`;

  const calcTotal = () => {
    return product.price * qtyInCart;
  };

  return (
    <div>
      <li className="confirmpage-list">
        <div className="img-wrapper">
          <img src={productCoverSource} alt={productCoverAlt} />
        </div>
        <p>
          {product.name} ({qtyInCart})
        </p>
        <p>{calcTotal()} sek</p>
      </li>
    </div>
  );
}
