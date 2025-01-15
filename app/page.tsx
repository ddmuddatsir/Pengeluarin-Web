"use client";
import Image from "next/image";
import logo from "../public/logoPengeluarin.png";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Graph from "@/components/ui/graph";
import {
  IconLeftChevron,
  IconRightChevron,
  IconSearch,
  IconSetting,
} from "@/public/icon/icon";
import { formatNumber } from "@/utils/formatNumber";
import CalenderComponent from "@/components/CalenderComponet";
import NewTransaction from "@/components/NewTransaction";
import ListData from "@/components/ListData";
import FooterHome from "@/components/FooterHome";
import GraphData from "@/components/GraphData";
import { useQuery } from "@tanstack/react-query";
import { fetchTransactions } from "@/utils/transactionService";

export default function Home() {
  const [isNewTransaksiVisible, setIsNewTransaksiVisible] = useState(false);
  const [isCalenderIsVisible, setIsCalenderIsVisible] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "graph">("list");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const calendarRef = useRef<HTMLDivElement>(null);
  const newTransaksiRef = useRef<HTMLDivElement>(null);

  // Mengambil data transaksi dengan TanStack Query
  // const {
  //   data: transactions = [],
  //   isLoading,
  //   isError,
  //   error,
  //   refetch,
  // } = useQuery({
  //   queryKey: ["transactions", selectedDate],
  //   queryFn: fetchTransactions,
  //   select: (data) =>
  //     data.filter((transaction) => {
  //       if (!selectedDate) return true;
  //       const transactionDate = new Date(transaction.date);
  //       return (
  //         transactionDate.getMonth() === selectedDate.getMonth() &&
  //         transactionDate.getFullYear() === selectedDate.getFullYear()
  //       );
  //     }),
  //   refetchOnWindowFocus: false, // Refresh saat window fokus kembali
  // });

  const {
    data: transactions = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
    select: (data) => {
      if (!selectedDate) return data; // Tidak filter jika selectedDate belum ada
      return data.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        return (
          transactionDate.getMonth() === selectedDate.getMonth() &&
          transactionDate.getFullYear() === selectedDate.getFullYear()
        );
      });
    },
    // Jangan auto-fetch saat fokus
    refetchOnWindowFocus: false,
    // Pastikan data hanya diambil saat selectedDate benar-benar berubah
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        newTransaksiRef.current &&
        !newTransaksiRef.current.contains(event.target as Node)
      ) {
        setIsNewTransaksiVisible(false);
      }
    };

    if (isNewTransaksiVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNewTransaksiVisible]);

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  // const handleAddTransaksi = () => {
  //   refetch(); // Re-fetch transactions when new transaction is added
  // };

  const toggleCalender = () => {
    setIsCalenderIsVisible((prev) => !prev);
  };

  const handleCloseNewTransaksi = () => {
    setIsNewTransaksiVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsCalenderIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // const goToPreviousDay = () => {
  //   if (selectedDate) {
  //     const prevDate = new Date(selectedDate);
  //     prevDate.setDate(prevDate.getDate() - 1);
  //     setSelectedDate(prevDate);
  //   }
  // };

  // const goToNextDay = () => {
  //   if (selectedDate) {
  //     const nextDate = new Date(selectedDate);
  //     nextDate.setDate(nextDate.getDate() + 1);
  //     setSelectedDate(nextDate);
  //   }
  // };

  const goToPreviousDay = () => {
    if (selectedDate) {
      const prevDate = new Date(selectedDate);
      prevDate.setDate(prevDate.getDate() - 1);
      // Periksa apakah tanggal berubah sebelum memanggil setSelectedDate
      if (selectedDate.getDate() !== prevDate.getDate()) {
        setSelectedDate(prevDate);
      }
    }
  };

  const goToNextDay = () => {
    if (selectedDate) {
      const nextDate = new Date(selectedDate);
      nextDate.setDate(nextDate.getDate() + 1);
      // Periksa apakah tanggal berubah sebelum memanggil setSelectedDate
      if (selectedDate.getDate() !== nextDate.getDate()) {
        setSelectedDate(nextDate);
      }
    }
  };

  const total = transactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );

  useEffect(() => {
    if (!selectedDate) {
      setSelectedDate(new Date()); // Atur ke tanggal hari ini
    }
  }, []);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative">
          <div className="spinner"></div>
        </div>
      </div>
    );
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Header */}
      <header className="p-4">
        <div className="flex-row flex justify-between">
          <div className="flex-row flex items-center">
            <Image
              src={logo}
              alt="logo"
              width={28}
              height={28}
              className="opacity-50"
            />
            <p className="flex font-bold text-white opacity-50">PENGELUARIN</p>
          </div>
          <div className="flex-row flex gap-4">
            <Link href="/search">
              <IconSearch color={"white"} />
            </Link>
            <Link href="/settings">
              <IconSetting />
            </Link>
          </div>
        </div>
      </header>

      {/* Date Picker */}
      <div className="flex flex-row p-4">
        <p onClick={toggleCalender} className="pr-5 text-white cursor-pointer">
          {selectedDate
            ? selectedDate.toDateString()
            : new Date().toDateString()}
        </p>

        {isCalenderIsVisible && (
          <div
            ref={calendarRef}
            className="absolute sm:w-[300px] md:w-[350px] lg:w-[400px]"
          >
            <CalenderComponent onDateChange={handleDateChange} />
          </div>
        )}

        <div className="flex flex-row">
          <div onClick={goToPreviousDay} className="">
            <IconLeftChevron color={"white"} />
          </div>
          <div onClick={goToNextDay}>
            <IconRightChevron color={"white"} />
          </div>
        </div>
      </div>

      {/* Total Pengeluaran */}
      <div className="p-4">
        <p className="text-white opacity-70">Total Pengeluaran</p>
        <p className="flex text-4xl font-semibold text-white">
          Rp{formatNumber(total)}
        </p>
      </div>

      {/* Content */}
      <div
        className={`${
          viewMode === "list"
            ? "bottom-0 bg-white w-full h-[450px] mt-auto rounded-se-xl rounded-ss-xl flex flex-col overflow-y-auto"
            : "bottom-0 w-full overflow-y-auto mt-auto flex flex-col sm:h-[100px] md:h-[450px] lg:h-[470px]"
        }`}
        style={{ flexGrow: 1 }}
      >
        {viewMode === "list" ? (
          transactions.length > 0 ? (
            <div className="flex-grow overflow-y-auto">
              <div className="max-h-[calc(100vh-50px)]">
                <ListData transactions={transactions} />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Tidak ada data transaksi</p>
            </div>
          )
        ) : (
          <div className="bottom-0 w-full overflow-y-auto h-[450px] mt-auto flex flex-col sm:h-[100px] md:h-[450px] lg:h-[470px]">
            <Graph transactions={transactions} />
            <GraphData transactions={transactions} />
          </div>
        )}
      </div>

      {/* NewTransaksi */}
      {isNewTransaksiVisible && (
        <div
          ref={newTransaksiRef}
          className="absolute bottom-0 top-0 w-full max-w-screen-md mx-auto left-0 right-0 bg-black bg-opacity-30 z-50 flex items-center justify-center"
        >
          <div className="bg-white w-full max-w-screen-md mx-auto  p-8 rounded-se-xl rounded-ss-xl shadow-md flex self-end">
            <NewTransaction
              refetch={refetch}
              onTransactionSaved={handleCloseNewTransaksi}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <FooterHome
        viewMode={viewMode}
        setViewMode={setViewMode}
        onAddTransaksi={() => setIsNewTransaksiVisible(true)}
      />
    </div>
  );
}
