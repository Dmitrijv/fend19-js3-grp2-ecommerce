import React from "react";
import { useState, useEffect } from "react";

import ProductReviewCard from "../components/ProductReviewCard";

export default function({ productId }) {
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

  // if there are no reviews show an appropriate message
  if (!reviews || reviews.length == 0) {
    return (
      <div className="white-card">
        <p>There are no reviews for this product.</p>
      </div>
    );
  }

  return Object.entries(reviews).map((review, index) => {
    return <ProductReviewCard key={`review-card-${index}`} review={review[1]} />;
  });
}
