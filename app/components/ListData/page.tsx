"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import Item from "@/components/ui/item";
import Filter from "@/components/ui/filter";

export default function ListData() {
  const [isActive, setIsActive] = useState(1);
  const [transactions, setTransactions] = useState([]);

  const filters = [
    { id: 1, label: "Semua Transaksi" },
    { id: 2, label: "Transaksi Terbesar" },
  ];

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("/api/transaction");
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transaction", error);
      }
    };
    fetchTransactions();
  }, []);

  const handleFilter = (filterId) => {
    setIsActive(filterId);
    // Implementasi logika filter berdasarkan filterId
    if (filterId === 1) {
      // Semua transaksi
      setTransactions((prev) => [...prev]); // Placeholder, gunakan logika filter sebenarnya jika ada
    } else if (filterId === 2) {
      // Transaksi terbesar
      setTransactions((prev) => [...prev].sort((a, b) => b.amount - a.amount));
    }
  };

  return (
    <div className="p-4 bg-white rounded-se-xl rounded-ss-xl flex-grow">
      {/* Komponen Filter */}
      <Filter
        filters={filters}
        isActive={isActive}
        handleFilter={handleFilter}
      />

      {/* Item */}
      <Item items={transactions} />
    </div>
  );
}
