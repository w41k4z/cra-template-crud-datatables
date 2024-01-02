export const formatNumberToCurrency = (amount: number): string => {
  if (amount == null || amount === 0) {
    return "0,00";
  }

  let amountString = amount.toFixed(2).replace(".", ",");
  const start =
    amountString.indexOf(",") !== -1
      ? amountString.indexOf(",") - 1
      : amountString.length;

  for (let i = start, j = 1; i >= 0; i--, j++) {
    if (j % 3 === 0) {
      amountString = amountString.slice(0, i) + " " + amountString.slice(i);
    }
  }

  return amountString;
};
