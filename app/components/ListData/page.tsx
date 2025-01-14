"use client";

import { useEffect, useState } from "react";

import Item from "@/components/ui/item";
import Filter from "@/components/ui/filter";

export default function ListData({ transactions }) {
  const [isActive, setIsActive] = useState(1);
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions); // Data transaksi yang difilter

  const filters = [
    { id: 1, label: "Semua Transaksi" },
    { id: 2, label: "Transaksi Terbesar" },
    { id: 3, label: "Transaksi Terkecil" },
  ];

  // Fungsi untuk mengubah data sesuai filter
  const handleFilter = (filterId) => {
    setIsActive(filterId);

    if (filterId === 1) {
      // Semua transaksi
      setFilteredTransactions(transactions);
    } else if (filterId === 2) {
      // Transaksi terbesar (urutkan berdasarkan amount dari besar ke kecil)
      setFilteredTransactions(
        [...transactions].sort((a, b) => b.amount - a.amount)
      );
    } else if (filterId === 3) {
      // Transaksi terkecil (urutkan berdasarkan amount dari kecil ke besar)
      setFilteredTransactions(
        [...transactions].sort((a, b) => a.amount - b.amount)
      );
    }
  };

  // Jika `transactions` berubah, reset data yang difilter
  useEffect(() => {
    setFilteredTransactions(transactions);
  }, [transactions]);

  return (
    <div className="p-4 bg-white  flex-grow">
      {/* Komponen Filter */}
      <Filter
        filters={filters}
        isActive={isActive}
        handleFilter={handleFilter}
      />

      {/* Item */}
      <Item items={filteredTransactions} />
    </div>
  );
}
