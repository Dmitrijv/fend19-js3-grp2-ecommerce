import React from "react";

export default function DetailPage(props) {
  const productId = props.match.params.productId;
  return (
    <div>
      <h2>details about product with id {productId}</h2>
    </div>
  );
}
