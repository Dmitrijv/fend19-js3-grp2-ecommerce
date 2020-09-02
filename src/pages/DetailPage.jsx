import React from "react";
import { useContext } from "react";

import AddToCartButton from "./../components/AddToCartButton";
import ReviewList from "../components/ReviewList";

import { ProductsContext } from "./../contexts/ProductsContext";

export default function DetailPage(props) {
  const productId = props.match.params.productId;
  const { products } = useContext(ProductsContext);
  const product = products[productId];
  //console.log(product);

  // clear selected nav item
  [].forEach.call(document.querySelectorAll(".header nav a.active"), function(item) {
    item.classList.remove("active");
  });

  if (!product) return <div></div>; // cheeky return

  return (
    <div className="centered-container">
      <div className="white-card product-details-card">
        <h3>Rated {product.rating} of 5</h3>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>{product.stock} in stock</p>
        <p>{product.price} sek</p>
        <AddToCartButton productId={productId} />
      </div>
      <ReviewList productId={productId} />
    </div>
  );
}
