import React from "react";
import "./App.scss";
import { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import LayoutSimple from "./pages/LayoutSimple";
import StartPage from "./pages/StartPage";
import DetailPage from "./pages/DetailPage";
import CartPage from "./pages/CartPage";

function App() {
  let [products, setProducts] = useState([]);

  function getProducts() {
    fetch("https://mock-data-api.firebaseio.com/e-commerce/products.json")
      .then(resp => resp.json())
      .then(response => {
        setProducts(response);
      });
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route
          path="/product/:productId"
          render={props => {
            return <LayoutSimple mainContent={<DetailPage products={products} {...props} />} />;
          }}
        />
        <Route path={["/cart"]}>
          <LayoutSimple mainContent={<CartPage />} />
        </Route>
        <Route path={["/shop", "/"]}>
          <LayoutSimple mainContent={<StartPage products={products} />} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
