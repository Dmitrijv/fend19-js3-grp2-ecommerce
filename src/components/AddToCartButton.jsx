import React, { useContext, useState, useRef } from "react";

import { EcommerceContext } from "../contexts/EcommerceContext";

export default function AddToCartButton({ productId }) {
  const { products, cart, setCart } = useContext(EcommerceContext);
  const thisBtn = useRef();

  function addBtnVisual(buySuccess) {
    thisBtn.current.disabled = true;

    if (buySuccess) {
      console.log("YAY!" + buySuccess);
      thisBtn.current.textContent = "Added!";
      thisBtn.current.classList.add("added-btn");
      setInterval(function () {
        thisBtn.current.textContent = "add to cart";
        thisBtn.current.classList.remove("added-btn");
        thisBtn.current.disabled = false;
      }, 1500);
    } else {
      console.log("NAY!" + buySuccess);
      setInterval(function () {
        thisBtn.current.textContent = "add to cart";
        thisBtn.current.className = "";
        thisBtn.current.disabled = false;
      }, 1500);
      thisBtn.current.textContent = "Failed to add to cart!";
      thisBtn.current.className = "failed-btn";
    }
  }

  const addToCart = () => {
    const productInStock = products[productId].stock; // Variable that shows how many of the clicked product in stock
    let updatedCart = {};

    let buySuccess = true;

    if (productInStock > 0) {
      if (cart[productId]) {
        const buyAmount = cart[productId].qty;
        console.log("Hur många av denna produkt finns i varukorgen innan klick: " + buyAmount);
        if (buyAmount >= productInStock) {
          buySuccess = false;
          console.log("Nu vill du köpa fler än vad som finns i lagret!");
        } else {
          updatedCart = { ...cart };
          updatedCart[productId].qty++;
          setCart(updatedCart);
          pushToLocalStorage(updatedCart);
        }
      } else {
        let newProduct = {
          id: productId,
          qty: 1,
        };
        updatedCart = {
          ...cart,
          [productId]: {
            id: newProduct.id,
            qty: newProduct.qty,
          },
        };
        setCart(updatedCart);
        pushToLocalStorage(updatedCart);
      }
    } else {
      buySuccess = false;
    }
    // addBtnVisual(buySuccess);
  };

  const pushToLocalStorage = (updatedCart) => {
    localStorage.setItem("myCart", JSON.stringify(updatedCart));
    console.log("pushed");
  };

  return (
    <button ref={thisBtn} onClick={() => addToCart()}>
      add to cart
    </button>
  );
}
