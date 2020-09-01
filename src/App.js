import React from "react";
import "./App.scss";
import LayoutSimple from "./pages/LayoutSimple";
import StartPage from "./pages/StartPage";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path={["/home", "/home", "/"]}>
          <LayoutSimple mainContent={<StartPage />} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
