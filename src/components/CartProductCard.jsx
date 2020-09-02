import React, { useState, useContext } from "react";

import { EcommerceContext } from "../contexts/EcommerceContext";

export default function CartProductCard({ product }) {
  const productId = product.id;
  const { cart, setCart } = useContext(EcommerceContext);
  const [qtyInCart, setQtyInCart] = useState(cart[productId].qty);

  const gallery = product.images ? product.images : [];
  const productCoverSource = gallery[0] ? gallery[0].src.small : `https://via.placeholder.com/700x200`;
  const productCoverAlt = gallery[0] ? gallery[0].alt : `Cover image for this product.`;

  const handleOnClickPlus = () => {
    let updatedCart = {};
    updatedCart = { ...cart };
    updatedCart[productId].qty++;
    setQtyInCart(updatedCart[productId].qty);
    setCart(updatedCart);
    localStorage.setItem("myCart", JSON.stringify(updatedCart));
  };

  const handleOnClickMinus = () => {
    let updatedCart = {};
    updatedCart = { ...cart };
    if (updatedCart[productId].qty > 1) {
      updatedCart[productId].qty--;
      setQtyInCart(updatedCart[productId].qty);
      setCart(updatedCart);
      localStorage.setItem("myCart", JSON.stringify(updatedCart));
    } else {
      delete updatedCart[productId];
      setCart(updatedCart);
      localStorage.setItem("myCart", JSON.stringify(updatedCart));
    }
  };

  const handleOnClickDelete = () => {
    let updatedCart = {};
    updatedCart = { ...cart };
    delete updatedCart[productId];
    setCart(updatedCart);
    localStorage.setItem("myCart", JSON.stringify(updatedCart));
  };

  const calcTotal = () => {
    return product.price * qtyInCart;
  };

  return (
    <li>
      <img src={productCoverSource} alt={productCoverAlt} />
      <p>Product: {product.name}</p>
      <p>Price: {product.price}</p>
      <button onClick={() => handleOnClickMinus()}>-</button>
      <p>Quantity in cart: {qtyInCart}</p>
      <button onClick={() => handleOnClickPlus()}>+</button>
      <p>Total: {calcTotal()}</p>
      <button onClick={() => handleOnClickDelete()}>Remove from cart</button>
    </li>
  );
}
