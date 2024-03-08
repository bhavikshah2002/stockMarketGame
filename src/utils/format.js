export const formatCash = (amount) => {
  if (amount == 0) return "0";

  if (amount < 100000) return (amount / 1000).toFixed(2) + "K";

  if (amount < 10000000) return (amount / 100000).toFixed(2) + "L";

  return (amount / 10000000).toFixed(2) + "Cr";
};
