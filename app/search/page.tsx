"use client";

import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import Item from "@/components/ui/item";
import { IconLeftChevron, IconSearch } from "@/public/icon/icon";
import axios from "axios";
import Filter from "@/components/ui/filter";

export default function Search() {
  const router = useRouter();

  const [transactions, setTransactions] = useState([]);

  const [isActive, setIsActive] = useState(1);

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

  const handleGoBack = () => {
    router.back();
  };

  return (
    <>
      <div className="h-screen w-full bg-white">
        {/* Header & Search Input */}
        <header className="p-4 ">
          <div className="flex items-center">
            <button className="mr-4" onClick={handleGoBack}>
              <IconLeftChevron color={"black"} />
            </button>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search..."
                className="w-full border  rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute inset-y-0 left-3 flex items-center">
                <IconSearch color={"gray"} />
              </div>
            </div>
          </div>
        </header>

        {/* Result item */}
        <div className="px-4 py-2 flex justify-between bg-gray-50">
          <p>{transactions.length} transaksi di temukan</p>
          <p>Rp0</p>
        </div>

        <div className="p-4 bg-white rounded-se-xl rounded-ss-xl flex-grow">
          {/* Komponen Filter */}
          <Filter
            filters={filters}
            isActive={isActive}
            handleFilter={handleFilter}
          />
        </div>

        <div className="px-4">
          <Item items={transactions} />
        </div>
      </div>
    </>
  );
}
