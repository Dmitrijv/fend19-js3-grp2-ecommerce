import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { EcommerceContext } from "../contexts/EcommerceContext";

export default function Header() {
  const { cart } = useContext(EcommerceContext);
  const [cartQty, setCartQty] = useState("");

  function updateCartItemCount() {
    let totalQty = Object.values(cart).reduce(function (sum, item) {
      return sum + Number(item.qty);
    }, 0);
    const cartQtyString = totalQty > 99 ? "( 99+ )" : `( ${totalQty} )`;
    setCartQty(cartQtyString);
  }

  //Dmitrij kommer hata mig :D :D :D
  const isCurrentPage = path => {
    const classToAdd = path === window.location.pathname ? "current-link" : "";
    // console.log(window.location.pathname);
    return classToAdd;
  };

  useEffect(() => {
    updateCartItemCount();
  }, [cart]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="top-header">
      <div className="centered-container top-header__container">
        <Link className={isCurrentPage("/")} to={`/`}>
          <h1 className="logo">StuffCo.</h1>
        </Link>
        <nav>
          <ul>
            <li>
              <Link className={isCurrentPage("/")} to={`/`}>
                Shop
              </Link>
            </li>
            <li>
              <Link className={isCurrentPage("/cart")} to={`/cart`}>
                Cart {cartQty}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
