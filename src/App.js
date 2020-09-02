import "./App.scss";
import React from "react";
import { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { CartContext } from "./contexts/CartContext";

import LayoutSimple from "./pages/LayoutSimple";
import StartPage from "./pages/StartPage";
import DetailPage from "./pages/DetailPage";
import CartPage from "./pages/CartPage";

function App() {
  let [products, setProducts] = useState([]);
  let [cart, setCart] = useState({});
  let cartFromLocalStorage;

  const getCart = () => {
    cartFromLocalStorage = JSON.parse(localStorage.getItem("myCart"));
    if (cartFromLocalStorage) {
      setCart(cartFromLocalStorage);
      // console.log("cart is set");
      // console.log(cart);
    } else {
      // console.log("No cart");
    }
  };
  // console.log(cart);

  useEffect(() => {
    getCart();
  }, []);

  function getProducts() {
    fetch("https://mock-data-api.firebaseio.com/e-commerce/products.json")
      .then((resp) => resp.json())
      .then((response) => {
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
          render={(props) => {
            return <LayoutSimple mainContent={<DetailPage products={products} {...props} />} />;
          }}
        />

        <Route path={["/cart"]}>
          <LayoutSimple mainContent={<CartPage />} />
        </Route>

        <Route path={["/shop", "/"]}>
          <CartContext.Provider value={{ cart, setCart }}>
            <LayoutSimple mainContent={<StartPage products={products} />} />
          </CartContext.Provider>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
