import React from "react";
import ProductCard from "../components/ProductCard";

export default function StartPage(props) {
  const products = props.products;

  return (
    <div>
      {products &&
        Object.entries(products).map((item, index) => {
          console.log("hello");
          return <ProductCard key={`product-card-${index}`} productInfo={item} />;
        })}
    </div>
  );
}
