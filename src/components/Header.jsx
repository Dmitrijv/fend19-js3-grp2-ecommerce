import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { EcommerceContext } from "../contexts/EcommerceContext";

export default function Header() {
  // className="active" yoink this out for now
  const { cart } = useContext(EcommerceContext);
  const [cartQty, setCartQty] = useState("");

  function cartStatus() {
    let total = 0;
    Object.keys(cart).forEach((product) => {
      total += cart[product].qty;
    });
    if (total > 10) {
      setCartQty("(10+)");
    } else if (total !== 0) {
      setCartQty(`(${total})`);
    } else {
      setCartQty("");
    }
  }

  useEffect(() => {
    cartStatus();
  }, [cart]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="header">
      <div className="centered-container">
        <h1>JS3 - Grupp 2 - E-commerce</h1>
        <nav>
          <ul>
            <li>
              <Link to={`/shop`}>Shop</Link>
            </li>
            <li>
              <Link to={`/cart`}>Cart {cartQty}</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
