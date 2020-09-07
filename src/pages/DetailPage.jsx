import React, { useState, useEffect } from "react";
import { useContext } from "react";

import AddToCartButton from "./../components/AddToCartButton";
import ReviewList from "../components/ReviewList";

import { EcommerceContext } from "./../contexts/EcommerceContext";

export default function DetailPage(props) {
  const productId = props.match.params.productId;
  const { products } = useContext(EcommerceContext);
  const product = products[productId];

  const [gallery, setGallery] = useState([]);
  const [productCoverSource, setProductCoverSource] = useState("https://via.placeholder.com/700x200");
  const [productCoverAlt, setProductCoverAlt] = useState("Cover image for this product.");

  useEffect(() => {
    if (product) {
      setGallery(product.images);
    }
  }, [product]);

  useEffect(() => {
    if (gallery.length !== 0) {
      setProductCoverSource(gallery[0].src.small);
      setProductCoverAlt(gallery[0].alt);
    }
  }, [gallery]);

  // clear selected nav item
  [].forEach.call(document.querySelectorAll(".header nav a.active"), function(item) {
    item.classList.remove("active");
  });

  if (!product) return <div></div>; // cheeky return

  return (
    <div className="centered-container extra-margin-bottom">
      <h1 className="detail-page-heading">Wow, nice product!</h1>
      <div className="white-card product-details-card">
        <img src={productCoverSource} alt={productCoverAlt} />
        <div className="product-details-card-right">
          <h3>Rated {product.rating} of 5</h3>
          <div className="name-des-stock">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>{product.stock} in stock</p>
          </div>
          <div className="price-addbtn">
            <p>{product.price} sek</p>
            <AddToCartButton productId={productId} />
          </div>
        </div>
      </div>
      <ReviewList productId={productId} />
    </div>
  );
}
