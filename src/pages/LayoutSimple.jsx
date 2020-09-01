import React from "react";
import Header from "../components/Header";

export default function LayoutSimple({ mainContent }) {
  return (
    <div>
      <Header />
      <main>{mainContent}</main>
    </div>
  );
}
