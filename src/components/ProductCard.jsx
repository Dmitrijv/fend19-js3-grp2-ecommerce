import React from "react";
import { Link } from "react-router-dom";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({ product }) {
  const gallery = product.images ? product.images : [];
  const productCoverSource = gallery[0] ? gallery[0].src.small : `https://via.placeholder.com/700x200`;
  const productCoverAlt = gallery[0] ? gallery[0].alt : `Cover image for this product.`;

  if (!product) return <div></div>; // cheeky return for empty products
  return (
    <div className="white-card product-card">
      <Link to={`/product/${product.id}`}>
        <img className="product-cover-image" alt="image" src={productCoverSource} alt={productCoverAlt} />
      </Link>
      <h2 className="product-title-header">{product.name}</h2>
      <p>{product.description}</p>
      <div className="flex-spacebetween">
        <p className="product-price">{product.price} sek</p>
        <AddToCartButton productId={product.id} />
      </div>
    </div>
  );
}
