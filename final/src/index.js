import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./shared/App";
import { ThemeProvider } from "styled-components";
import theme from "./shared/theme";
import { Provider } from "react-redux";
import store from "./redux/configStore";

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
