import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { AboutScreen } from "../screens/aboutScreen";
import { ConsoleScreen } from "../screens/consoleScreen";
import { DashboardScreen } from "../screens/dashboardScreen";
import { ImageMapScreen } from "../screens/imageMapScreen";
import { LoginScreen } from "../screens/loginScreen";
import { SignUpScreen } from "../screens/signUpScreen";
import { PipelineScreen } from "../screens/pipelineScreen";
import { RelabelScreen } from "../screens/relabelScreen";
import { NavBar } from "../components/navbar";
import Footer from "../components/footer";
import "../App.js";
import "./routes.css";

function Routes(props) {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <Router>
          {/* <nav>
            <NavBar></NavBar>
          </nav> */}
          <Switch>
            <Route exact path={"/"} component={LoginScreen} />
            <Route exact path={"/signup"} component={SignUpScreen} />
            <Route exact path={"/about"} component={AboutScreen} />
            <Route exact path={"/console"} component={ConsoleScreen} />
            <Route exact path={"/dashboard"} component={DashboardScreen} />
            <Route exact path={"/imagemap"} component={ImageMapScreen} />
            <Route exact path={"/pipeline"} component={PipelineScreen} />
            <Route exact path={"/relabel"} component={RelabelScreen} />
          </Switch>
        </Router>
      </div>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
}

export default Routes;
