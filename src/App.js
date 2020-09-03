import "./App.scss";
import React from "react";
import { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import { EcommerceContext } from "./contexts/EcommerceContext";

import LayoutSimple from "./pages/LayoutSimple";
import StartPage from "./pages/StartPage";
import DetailPage from "./pages/DetailPage";
import CartPage from "./pages/CartPage";
import ConfirmPage from "./pages/ConfirmPage";

function App() {
  let [products, setProducts] = useState([]);
  let [cart, setCart] = useState({});
  let [totalPrice, setTotalPrice] = useState(0);
  let [totalPriceWithDiscount, setTotalPriceWithDiscount] = useState(0);
  let cartFromLocalStorage;
  let [fullName, setFullName] = useState('');

  const getCart = () => {
    cartFromLocalStorage = JSON.parse(localStorage.getItem("myCart"));
    if (cartFromLocalStorage) {
      setCart(cartFromLocalStorage);
    }
    else {
      setCart({})
    }
  };

  useEffect(() => {
    getProducts();
    getCart();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const calcTotalPrice = () => {
    let total = 0;
    if (cart && Object.keys(cart).length !== 0) {
      products &&
        Object.keys(products).forEach((product) => {
          const price = products[product].price;
          const productId = products[product].id;
          if (cart[productId]) {
            total = parseInt(total + cart[productId].qty * price);
          }
        });
    }
    setTotalPrice(total);
  };

  useEffect(() => {
    calcTotalPrice();
  }, [cart, products]);

  function getProducts() {
    fetch("https://mock-data-api.firebaseio.com/e-commerce/products.json")
      .then((resp) => resp.json())
      .then((response) => {
        setProducts(response);
      });
  }

  return (
    <div className="App">
      <EcommerceContext.Provider
        value={{
          cart,
          setCart,
          totalPrice,
          products,
          setProducts,
          totalPriceWithDiscount,
          setTotalPriceWithDiscount,
          fullName,
          setFullName,
          getCart
        }}
      >
        <Switch>
          <Route path="/confirmpage">
            <LayoutSimple mainContent={<ConfirmPage />} />
          </Route>

          <Route
            path="/product/:productId"
            render={(props) => {
              return <LayoutSimple mainContent={<DetailPage {...props} />} />;
            }}
          />

          <Route path={["/cart"]}>
            <LayoutSimple mainContent={<CartPage />} />
          </Route>

          <Route path={["/"]}>
            <LayoutSimple mainContent={<StartPage />} />
          </Route>
        </Switch>
      </EcommerceContext.Provider>
    </div>
  );
}

export default App;
