import React from "react";

export default function Header() {
  return (
    <div className="header">
      <h1>FEND19 - JS3 - Grupp 2 - E-Commerce</h1>
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
