import React from "react";
import ProductCard from "../components/ProductCard";

export default function StartPage(props) {
  const products = props.products;

  return (
    <div className="centered-container">
      {products &&
        Object.entries(products).map((product, index) => {
          // console.log(product);
          return <ProductCard key={`product-card-${index}`} product={product[1]} />;
        })}
    </div>
  );
}
