import React from "react";

const CashValue = (props) => {
  if (props.cash) {
    return (
      <div className="cash-value">
        Get your free <strong>£{props.cash}</strong> now
      </div>
    );
  }
};

export default CashValue;
