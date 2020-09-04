import React, { useContext, useState, useEffect } from "react";

import { EcommerceContext } from "../contexts/EcommerceContext";

export default function AddToCartButton({ productId }) {
  const { products, cart, setCart } = useContext(EcommerceContext);

  let clickTimeout;
  const [addBtnClass, setAddBtnClass] = useState("");

  function addBtnVisual(buySuccess) {
    if (buySuccess) {
      setAddBtnClass("added-btn");
    } else {
      setAddBtnClass("failed-btn");
    }

    clickTimeout = setTimeout(() => {
      setAddBtnClass("");
    }, 1200);
  }

  useEffect(() => {
    return () => {
      clearTimeout(clickTimeout);
    };
  }, [clickTimeout]);

  const addToCart = () => {
    const productInStock = products[productId].stock; // Variable that shows how many of the clicked product in stock
    let updatedCart = {};

    let buySuccess = true;

    if (productInStock > 0) {
      if (cart[productId]) {
        const buyAmount = cart[productId].qty;
        if (buyAmount >= productInStock) {
          buySuccess = false;
        } else {
          updatedCart = { ...cart };
          updatedCart[productId].qty++;
          setCart(updatedCart);
          pushToLocalStorage(updatedCart);
        }
      } else {
        let newProduct = {
          id: productId,
          name: products[productId].name,
          qty: 1,
        };
        updatedCart = {
          ...cart,
          [productId]: {
            id: newProduct.id,
            name: newProduct.name,
            qty: newProduct.qty,
          },
        };
        setCart(updatedCart);
        pushToLocalStorage(updatedCart);
      }
    } else {
      buySuccess = false;
    }
    addBtnVisual(buySuccess);
  };

  const pushToLocalStorage = (updatedCart) => {
    localStorage.setItem("myCart", JSON.stringify(updatedCart));
  };

  return (
    <button className={addBtnClass} onClick={addToCart}>
      add to cart
    </button>
  );
}
