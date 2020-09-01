import React from "react";
import { useState, useEffect } from 'react'

export default function DetailPage(props) {
  const productId = props.match.params.productId;
  let [reviews, setReviews] = useState([])
  function fetchReviews(productId) {
    // console.log(productId);
    fetch(`https://mock-data-api.firebaseio.com/e-commerce/reviews/${productId}.json`)
    .then(resp => resp.json())
    .then(response => {
      setReviews(response)
      // console.log(response);
    console.log("fetch called");

    })
  }

  useEffect(() => {
    fetchReviews(productId)
    console.log("useEffect called");
    console.log(productId);
    // console.log(reviews.length);
  }, [])
   

  return (
    <div>
      <h2>details about product with id {productId}</h2>
      {reviews && reviews.map(item => {
        // console.log(item);
      return ( <h3>{item['date']}</h3> )

        })
      }
    </div>
  );
}
