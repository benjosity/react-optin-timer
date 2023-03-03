import React from 'react';

interface CashValueProps {
  cash?: number | null;
}

/**
 * A component that displays a cash value if provided.
 * @param cash - The cash value to display.
 */
const CashValue: React.FC<CashValueProps> = ({ cash }) => {
  if (cash != null) {
    // Use nullish coalescing to check if cash is not null or undefined
    return (
      <div className="cash-value">
        Get your free <strong>£{cash}</strong> now
      </div>
    );
  } else {
    return null;
  }
};

export default CashValue;
