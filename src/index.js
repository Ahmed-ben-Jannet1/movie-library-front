import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./store";
import { ThemeProvider } from "styled-components";
import theme from "./utils/theme";
import GlobalStyle from "./utils/globals";
import App from "./containers/App";
import { Zoom, ToastContainer } from "react-toastify";

import "../node_modules/react-modal-video/scss/modal-video.scss";
import "../node_modules/slick-carousel/slick/slick.css";
import "../node_modules/slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Fragment>
        <App />
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          // rtl={document.body.dir === "rtl"}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          transition={Zoom}
        />
        <GlobalStyle />
      </Fragment>
    </ThemeProvider>
  </Provider>,
  document.querySelector("#root")
);
