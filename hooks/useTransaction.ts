import axiosInstance from "@/utils/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Tipe data untuk transaksi
interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string;
}

// Hook untuk mendapatkan daftar transaksi
export const useTransactions = () =>
  useQuery<Transaction[], Error>({
    queryKey: ["transactions"], // Query key harus spesifik
    queryFn: async () => {
      const { data } = await axiosInstance.get<Transaction[]>("transactions");
      return data;
    },
  });

// Hook untuk menambahkan transaksi
export const useAddTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation<Transaction, Error, Omit<Transaction, "id">>({
    mutationFn: async (transaction) => {
      const { data } = await axiosInstance.post<Transaction>(
        "transactions",
        transaction
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
};

// Hook untuk menghapus transaksi
export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      await axiosInstance.delete("transactions", { data: { id } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
};
