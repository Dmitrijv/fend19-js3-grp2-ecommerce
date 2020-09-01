import React from "react";

export default function ProductReviewCard({ review }) {
  return (
    <article className="white-card review-card">
      <h3>Rated {review.rating} of 5</h3>
      <p>
        <time>{review.date}</time>, by {review.author.name}
      </p>
      <hr />
      <p>{review.description}</p>
    </article>
  );
}
