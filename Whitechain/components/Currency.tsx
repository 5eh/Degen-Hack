// components/Currency.tsx

import React from "react";
import currency from "currency.js";
import { CURRENCY_SYMBOL } from "../marketplaceVariables";


interface CurrencyProps {
  amount: any;
}

const CurrencyDisplay: React.FC<CurrencyProps> = ({ amount }) => {
  const formatCurrency = (value: number) => {
    return currency(value, {
      symbol: CURRENCY_SYMBOL,
      precision: 2,
    }).format();
  };

  return <span>{formatCurrency(amount)}</span>;
};

export default CurrencyDisplay;
