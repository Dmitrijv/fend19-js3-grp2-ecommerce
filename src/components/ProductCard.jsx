import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const gallery = product.images ? product.images : [];
  const productCoverSource = gallery[0] ? gallery[0].src.small : `https://via.placeholder.com/700x200`;
  const productCoverAlt = gallery[0] ? gallery[0].alt : `Cover image for this product.`;
  return (
    <div className="white-card product-card">
      <Link to={`/product/${product.id}`}>
        <img className="product-cover-image" alt="image" src={productCoverSource} alt={productCoverAlt} />
      </Link>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>{product.price} sek</p>
      <button>add to cart</button>
    </div>
  );
}
