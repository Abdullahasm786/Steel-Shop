import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import Store from "./redux/store";

const root = document.getElementById('root');
const rootContainer = ReactDOM.createRoot(root);

rootContainer.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();


// const root = document.getElementById('root');
// const rootContainer = ReactDOM.createRoot(root);
// rootContainer.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
