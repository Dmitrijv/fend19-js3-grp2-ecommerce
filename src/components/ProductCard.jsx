import React from "react";

export default function ProductCard({ productInfo }) {
  return (
    <div className="productCard">
      <h2>sample product</h2>
      <img alt="image" src="https://via.placeholder.com/700x200" />
      <p>product description Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, eos?</p>
      <button>add to cart</button>
    </div>
  );
}
