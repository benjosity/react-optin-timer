import React, { Component } from 'react';
import axios from 'axios';
import TopImage from './optin/TopImage';
import CashValue from './optin/CashValue';
import Timer from './optin/Timer';
import Button from './optin/Button';

interface OptInProps {
  cash: string;
  buttonText: string;
  buttonUrl: string;
}

interface OptInState {
  optin: any; // type any since we don't know the shape of the response data
  errorMessage: string;
  errorCode: Number;
}

interface ErrorWithResponse {
  response: {
    status: number;
  };
}

class OptIn extends Component<OptInProps, OptInState> {
  // Set default props for the component
  static defaultProps: OptInProps = {
    cash: '$10',
    buttonText: 'Submit',
    buttonUrl: '#',
  };

  // Set initial state
  state: OptInState = {
    optin: null,
    errorMessage: '',
    errorCode: 0,
  };

  // Use Axios to fetch JSON data and set response as state
  async componentDidMount() {
    try {
      const response = await axios.get<any>(
        'https://raw.githubusercontent.com/benjosity/optin/main/optin.json'
      );
      this.setState({ optin: response.data });
    } catch (error: any) {
      if ((error as ErrorWithResponse).response) {
        this.setState({
          errorCode: (error as ErrorWithResponse).response.status,
        });
      } else if (error.request) {
        this.setState({ errorMessage: error.request });
      } else {
        this.setState({ errorMessage: error.message });
      }
    }
  }

  // Conditional rendering based on receiving JSON Data and loading data
  renderContent() {
    const { errorMessage, optin } = this.state;

    if (errorMessage && !optin) {
      // Render error message if Axios catches error
      return <h1>Error: {errorMessage}</h1>;
    }

    if (!errorMessage && optin) {
      const { cash, timer, button } = optin.content;
      // Render Opt In component if JSON is found and state is set
      return (
        <>
          <TopImage />
          <CashValue cash={cash || this.props.cash} />
          <Timer
            hours={timer?.hours}
            minutes={timer?.minutes}
            seconds={timer?.seconds}
          />
          <Button
            url={button?.url || this.props.buttonUrl}
            text={button?.text || this.props.buttonText}
          />
        </>
      );
    }

    // Render loading message whilst JSON is fetched
    return <h1>Loading...</h1>;
  }

  // Render component in containing div
  render() {
    return <div className="opt-in">{this.renderContent()}</div>;
  }
}

export default OptIn;
