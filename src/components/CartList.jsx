import React, { useContext } from "react";
import { ProductsContext } from "../contexts/ProductsContext";
import { CartContext } from "../contexts/CartContext";
import CartProductCard from "./CartProductCard";

export default function CartList() {
  const { products } = useContext(ProductsContext);
  const { cart } = useContext(CartContext);
  return (
    <div>
      <ul>
        {products &&
          Object.entries(products).map((product, index) => {
            let productId = product[0];
            return cart[productId] ? <CartProductCard key={`product-card-${index}`} product={product[1]} /> : null;
          })}
      </ul>
    </div>
  );
}
