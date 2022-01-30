import "./scss/app.scss";
import React from "react";
import ReactDOM from "react-dom";
import OptIn from "./components/OptIn";

class App extends React.Component {
  render() {
    return <OptIn />;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
