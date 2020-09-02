import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { ProductsContext } from "../contexts/ProductsContext";

export default function AddToCartButton({ productId }) {
  const { cart, setCart } = useContext(CartContext);
  const { products } = useContext(ProductsContext)
  
  
  const addToCart = () => {
    const productInStock = products[productId].stock // Variable that shows how many of the clicked product in stock
    let updatedCart = {};

    if (productInStock != 0) {
      if (cart[productId]) {
        const buyAmount = cart[productId].qty
        console.log("Hur många av denna produkt finns i varukorgen innan klick: " + buyAmount);
        if (buyAmount >= productInStock) {
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
    }
  };

  const pushToLocalStorage = (updatedCart) => {
    localStorage.setItem("myCart", JSON.stringify(updatedCart));
    console.log("pushed");
  };

  return <button onClick={() => addToCart()}>add to cart</button>;
}
