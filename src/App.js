import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from "./Navbar";
import InputArea from "./InputArea";
import DistributionAnalysis from "./DistributionAnalysis";
import About from "./About";
import SampleSize from "./SampleSize";
import Store from "./store";

function App() {
  return (
    <Store>
      <Router>
        <NavBar />
        <div className="container pb-4">
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/sample-size-determination">
              <SampleSize />
            </Route>
            <Route path="/">
              <InputArea />
              <DistributionAnalysis />
            </Route>
          </Switch>
        </div>
      </Router>
    </Store>
  );
}

export default App;
