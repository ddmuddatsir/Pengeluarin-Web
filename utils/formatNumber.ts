export const formatNumber = (number: number): string => {
  if (typeof number !== "number") {
    throw new Error("Input must be a number");
  }

  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
