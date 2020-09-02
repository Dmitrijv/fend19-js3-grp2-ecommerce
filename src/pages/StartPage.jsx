import React from "react";
import ProductCard from "../components/ProductCard";
import Masonry from "react-masonry-css";

export default function StartPage(props) {
  const products = props.products;

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
        {products &&
          Object.entries(products).map((product, index) => {
            // console.log(product);
            return <ProductCard key={`product-card-${index}`} product={product[1]} />;
          })}
      </Masonry>
    </div>
  );
}
