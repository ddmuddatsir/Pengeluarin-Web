"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Item from "@/components/ui/item";
import { IconLeftChevron, IconSearch } from "@/public/icon/icon";
import axios from "axios";
import Filter from "@/components/ui/filter";

interface Transaction {
  id: string;
  amount: number;
  date: string;
  description: string;
  category: string;
}

export default function Search() {
  const router = useRouter();

  const [transactions, setTransactions] = useState<Transaction[]>([]); // Data transaksi asli
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]); // Data transaksi yang difilter
  const [searchQuery, setSearchQuery] = useState(""); // Input pencarian
  const [isActive, setIsActive] = useState(1); // Filter aktif
  const [totalAmount, setTotalAmount] = useState(0); // Total amount transaksi

  const filters = [
    { id: 1, label: "Semua Transaksi" },
    { id: 2, label: "Transaksi Terbesar" },
  ];

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("/api/transaction");
        setTransactions(response.data);
        setFilteredTransactions(response.data);
        calculateTotalAmount(response.data); // Hitung total amount awal
      } catch (error) {
        console.error("Error fetching transaction", error);
      }
    };
    fetchTransactions();
  }, []);

  const handleGoBack = () => {
    router.back();
  };

  const handleFilter = (filterId: number) => {
    setIsActive(filterId);

    // Berikan nilai default untuk filtered
    let filtered: Transaction[] = [];

    if (filterId === 1) {
      // Semua transaksi
      filtered = [...transactions];
    } else if (filterId === 2) {
      // Transaksi terbesar
      filtered = [...transactions].sort((a, b) => b.amount - a.amount);
    } else {
      // Jika filterId bukan 1 atau 2, tetapkan filtered ke transaksi kosong
      filtered = [...transactions];
    }

    setFilteredTransactions(filtered);
    calculateTotalAmount(filtered); // Hitung total amount setelah filter
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    const lowercasedQuery = query.toLowerCase();

    const filtered = transactions.filter(
      (transaction) =>
        transaction.amount.toString().includes(lowercasedQuery) || // Pencarian berdasarkan amount
        transaction.category.toLowerCase().includes(lowercasedQuery) || // Pencarian berdasarkan category
        transaction.description.toLowerCase().includes(lowercasedQuery) || // Pencarian berdasarkan description
        transaction.date.toLowerCase().includes(lowercasedQuery) // Pencarian berdasarkan date
    );

    setFilteredTransactions(filtered);
    calculateTotalAmount(filtered); // Hitung total amount setelah pencarian
  };

  const calculateTotalAmount = (transactionsList: Transaction[]) => {
    const total = transactionsList.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );
    setTotalAmount(total);
  };

  return (
    <>
      <div className="h-screen w-full bg-white">
        {/* Header & Search Input */}
        <header className="sticky top-0 p-4 bg-white z-10 shadow-md">
          <div className="flex items-center">
            <button className="mr-4" onClick={handleGoBack}>
              <IconLeftChevron color={"black"} />
            </button>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full border rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute inset-y-0 left-3 flex items-center">
                <IconSearch color={"gray"} />
              </div>
            </div>
          </div>
        </header>
        <div>
          {/* Result item */}
          <div className="px-4 py-2 flex justify-between bg-gray-50">
            <p>{filteredTransactions.length} transaksi ditemukan</p>
            <p>Rp{totalAmount.toLocaleString("id-ID")}</p>
          </div>

          <div className="p-4 bg-white rounded-se-xl rounded-ss-xl flex-grow">
            {/* Komponen Filter */}
            <Filter
              filters={filters}
              isActive={isActive}
              handleFilter={handleFilter}
            />
          </div>

          {/* Komponen Item */}
          <div className="px-4 h-[700px] bg-white w-full overflow-y-auto mt-auto rounded-se-xl rounded-ss-xl">
            <Item items={filteredTransactions} />
          </div>
        </div>
      </div>
    </>
  );
}
