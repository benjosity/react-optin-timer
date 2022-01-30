import React from "react";
import axios from "axios";

import TopImage from "./optin/TopImage";
import CashValue from "./optin/CashValue";
import Timer from "./optin/Timer";
import Button from "./optin/Button";

/*------------------------------------*\
    OPT IN COMPONENT
\*------------------------------------*/
class OptIn extends React.Component {
  // Constructor/Add state
  state = { optin: null, errorMessage: "" };

  // Use Axios to fetch JSON data and set response as state
  componentDidMount() {
    axios
      .get("https://raw.githubusercontent.com/benjosity/optin/main/optin.json")
      .then((response) => {
        this.setState({ optin: response.data });
      })
      .catch((error) => {
        if (error.response) {
          this.setState({ errorMessage: error.response.status });
        } else if (error.request) {
          this.setState({ errorMessage: error.request });
        } else {
          this.setState({ errorMessage: error.message });
        }
      });
  }

  // Conditionalise content based on receiving JSON Data and loading data
  renderContent() {
    // Render message if Axios catches error
    if (this.state.errorMessage && !this.state.optin) {
      return <h1>Error: {this.state.errorMessage}</h1>;
    }

    // Render Opt In compoenent if JSON is found and state is set
    if (!this.state.errorMessage && this.state.optin) {
      const { optin } = this.state;
      return (
        <>
          <TopImage />
          <CashValue cash={optin.content.cash} />
          <Timer
            hours={optin.timer.hours}
            minutes={optin.timer.minutes}
            seconds={optin.timer.seconds}
          />
          <Button url={optin.button.url} text={optin.button.text} />
        </>
      );
    }

    // Render loading whilst JSON is fetched
    return <h1>Loading...</h1>;
  }

  // Render component in containing div
  render() {
    return <div className="opt-in">{this.renderContent()}</div>;
  }
}

export default OptIn;
