import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory, createHashHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/now-ui-dashboard.scss?v1.4.0";
import "assets/css/demo.css";

import AdminLayout from "layouts/Admin.js";
import Login from "views/auth/login";
import Register from "views/auth/register";
import ResetPwd from "views/auth/resetpwd/resetPwd"

import store from "./redux/store";
import { Provider } from "react-redux";

const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        <Route path="/auth/login" render={(props) => <Login history={hist} {...props} />} />
        <Route path="/auth/resetpwd" component={ResetPwd} />
        <Route path="/auth/register" component={Register} />
        <Route path="/" render={(props) => <AdminLayout {...props} />} />
        <Redirect to="/dashboard" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
