import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.min.css";
//import "./css/index.css";
import { Hackernews } from "./Hackernews";

ReactDOM.render(
  <React.StrictMode>
    <Hackernews />
  </React.StrictMode>,
  document.getElementById("root")
);
