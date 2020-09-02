import React from "react";
import { useContext } from "react";
import ProductCard from "../components/ProductCard";
import Masonry from "react-masonry-css";

import { EcommerceContext } from "./../contexts/EcommerceContext";

export default function StartPage(props) {
  const { products } = useContext(EcommerceContext);

  // handle absent product list
  if (!products || products.length === 0) {
    return (
      <div className="centered-wrapper">
        <div className="white-card">
          <p>Could not load product list from the API.</p>
        </div>
      </div>
    );
  }

  const breakpointColumnsObj = {
    default: 4,
    1100: 4,
    700: 3,
    500: 1,
  };

  return (
    <div className="centered-container">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {Object.entries(products).map((product, index) => {
          // console.log(product);
          return <ProductCard key={`product-card-${index}`} product={product[1]} />;
        })}
      </Masonry>
    </div>
  );
}
