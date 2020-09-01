import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="header">
      <div className="centered-container">
        <h1>JS3 - Grupp 2 - E-commerce</h1>
        <nav>
          <ul>
            <li>
              <Link to={`/shop`} className="active">
                Shop
              </Link>
            </li>
            <li>
              <Link to={`/about`}>About</Link>
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
