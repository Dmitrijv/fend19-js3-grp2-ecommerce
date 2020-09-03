import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { EcommerceContext } from "../contexts/EcommerceContext";

export default function CartListItem({ product }) {
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
    <li className="cart-item">
      <Link to={`/product/${productId}`}>
        <img className="cart-item-img" src={productCoverSource} alt={productCoverAlt} />
      </Link>
      <p>{product.name}</p>
      <p>{product.price} sek</p>
      <button onClick={() => handleOnClickMinus()}>-</button>
      <p>{qtyInCart}</p>
      <button onClick={() => handleOnClickPlus()}>+</button>
      <p>{calcTotal()} sek</p>
      <button onClick={() => handleOnClickDelete()}>Remove</button>
    </li>
  );
}
