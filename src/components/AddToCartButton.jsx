import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

export default function AddToCartButton({ productId }) {
  const { cart, setCart } = useContext(CartContext);

  const addToCart = () => {
    let updatedCart = {};
    if (cart[productId]) {
      updatedCart = { ...cart };
      updatedCart[productId].qty++;
      setCart(updatedCart);
      pushToLocalStorage(updatedCart);
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
  };

  const pushToLocalStorage = (updatedCart) => {
    localStorage.setItem("myCart", JSON.stringify(updatedCart));
    console.log("pushed");
  };

  return <button onClick={() => addToCart()}>add to cart</button>;
}
