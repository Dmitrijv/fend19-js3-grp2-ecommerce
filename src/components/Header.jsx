import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  // className="active" yoink this out for now
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
              <Link to={`/cart`}>Cart (0)</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
