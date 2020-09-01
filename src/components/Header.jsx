import React from "react";

export default function Header() {
  return (
    <div className="header">
      <h1>JS3 - Grupp 2 - E-commerce</h1>
      <h2>[cart icon placeholder]</h2>
      <nav>
        <ul>
          <li>
            <a href="./" class="active">
              Shop
            </a>
          </li>
          <li>
            <a href="./">About</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
