import React from "react";
import "./App.scss";
import { Route, Switch } from "react-router-dom";

import LayoutSimple from "./pages/LayoutSimple";
import StartPage from "./pages/StartPage";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path={["/about"]}>
          <LayoutSimple mainContent={<AboutPage />} />
        </Route>
        <Route path={["/shop", "/"]}>
          <LayoutSimple mainContent={<StartPage />} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
