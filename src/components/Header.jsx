import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="header">
      <h1>JS3 - Grupp 2 - E-commerce</h1>
      <h2>[cart icon component here]</h2>
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
        </ul>
      </nav>
    </div>
  );
}
