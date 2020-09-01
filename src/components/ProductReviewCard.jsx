import React from "react";

export default function ProductReviewCard({ review }) {
  return (
    <article className="white-card">
      <h2>review title</h2>
      <p>
        <date>2020-09-02</date>, by [author]
      </p>
      <hr />
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita tenetur a, itaque ducimus est eius, ullam
        voluptatibus fugiat consequuntur in odio delectus necessitatibus nihil quos eligendi laboriosam neque mollitia
        totam.
      </p>
    </article>
  );
}
