import React from "react";
import ReactDOM from "react-dom/client";
import 'antd-mobile/bundle/css-vars-patch.css'
import Routes from "@/routes/index";
import { Provider } from "react-redux";
import store from "@/store/index";
const container = document.getElementById("app");
const app = ReactDOM.createRoot(container);
app.render(
  <Provider store={store}>
    <Routes />
  </Provider>
);
