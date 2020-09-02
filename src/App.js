import "./App.scss";
import React from "react";
import { useState, useEffect, useContext } from "react";
import { Route, Switch } from "react-router-dom";

import { CartContext } from "./contexts/CartContext";
import { ProductsContext } from "./contexts/ProductsContext";

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
    getProducts();
    getCart();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function getProducts() {
    fetch("https://mock-data-api.firebaseio.com/e-commerce/products.json")
      .then(resp => resp.json())
      .then(response => {
        setProducts(response);
      });
  }

  return (
    <div className="App">
      <CartContext.Provider value={{ cart, setCart }}>
        <ProductsContext.Provider value={{ products, setProducts }}>
          <Switch>
            <Route
              path="/product/:productId"
              render={props => {
                return <LayoutSimple mainContent={<DetailPage {...props} />} />;
              }}
            />

            <Route path={["/cart"]}>
              <LayoutSimple mainContent={<CartPage />} />
            </Route>

            <Route path={["/shop", "/"]}>
              <LayoutSimple mainContent={<StartPage />} />
            </Route>
          </Switch>
        </ProductsContext.Provider>
      </CartContext.Provider>
    </div>
  );
}

export default App;
