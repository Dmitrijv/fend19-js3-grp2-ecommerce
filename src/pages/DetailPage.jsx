import React from "react";
import { useState, useEffect } from "react";

import ProductReviewCard from "../components/ProductReviewCard";

export default function DetailPage(props) {
  const productId = props.match.params.productId;
  let [reviews, setReviews] = useState([]);

  function fetchReviews(productId) {
    fetch(`https://mock-data-api.firebaseio.com/e-commerce/reviews/${productId}.json`)
      .then(resp => resp.json())
      .then(response => {
        setReviews(response);
      });
  }

  useEffect(() => {
    fetchReviews(productId);
  }, []);

  return (
    <div className="centered-container">
      <div className="white-card product-details-card">
        <h2>details about product with id {productId}</h2>
        {reviews &&
          reviews.map(item => {
            return <h3>{item["date"]}</h3>;
          })}
      </div>
      {reviews &&
        Object.entries(reviews).map((review, index) => {
          return <ProductReviewCard key={`review-card-${index}`} review={review} />;
        })}
    </div>
  );
}
