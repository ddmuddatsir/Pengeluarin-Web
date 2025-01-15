import axios from "axios";

export const fetchTransactions = async () => {
  const response = await axios.get("/api/transaction");
  return response.data;
};
