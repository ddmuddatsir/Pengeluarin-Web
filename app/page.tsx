"use client";
import Image from "next/image";

import logo from "../public/logoPengeluarin.png";
import React, { useState, useRef, useEffect } from "react";
import CalenderComponent from "./components/Calender/page";
import Link from "next/link";
import ListData from "./components/ListData/page";
import GraphData from "./components/GraphData/page";
import FooterHome from "./components/FooterHome/page";
import NewTransaction from "./newtransaction/page";
import Graph from "@/components/ui/graph";
import {
  IconLeftChevron,
  IconRightChevron,
  IconSearch,
  IconSetting,
} from "@/public/icon/icon";
import axios from "axios";
import { formatNumber } from "@/utils/formatNumber";

export default function Home() {
  const [isNewTransaksiVisible, setIsNewTransaksiVisible] = useState(false);
  const [isCalenderIsVisible, setIsCalenderIsVisible] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "graph">("list");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [transactions, setTransactions] = useState([]);
  const calendarRef = useRef<HTMLDivElement>(null);
  const newTransaksiRef = useRef<HTMLDivElement>(null);

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

  const toggleCalender = () => {
    setIsCalenderIsVisible((prev) => !prev);
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

  const goToPreviousDay = () => {
    if (selectedDate) {
      const prevDate = new Date(selectedDate);
      prevDate.setDate(prevDate.getDate() - 1);
      setSelectedDate(prevDate);
    }
  };

  const goToNextDay = () => {
    if (selectedDate) {
      const nextDate = new Date(selectedDate);
      nextDate.setDate(nextDate.getDate() + 1);
      setSelectedDate(nextDate);
    }
  };

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

  const total = transactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Header */}
      <header className="p-4">
        <div className="flex-row flex justify-between">
          <div className="flex-row flex items-center">
            <Image src={logo} alt="logo" width={28} height={28} />
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
      <div className="flex flex-row p-4 ">
        <p onClick={toggleCalender} className="pr-5 text-white cursor-pointer">
          {selectedDate
            ? selectedDate.toDateString()
            : new Date().toDateString()}
        </p>

        {isCalenderIsVisible && (
          <div ref={calendarRef} className="absolute">
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
        <p className="flex text-4xl font-bold text-white">
          Rp{formatNumber(total)}
        </p>
      </div>

      {/* Content */}
      {viewMode === "list" ? (
        <ListData />
      ) : (
        <div className=" bottom-0 w-full overflow-y-auto max-h-[470px] mt-auto">
          {/* Komponen GraphData akan scroll ke atas saat ruang scroll */}
          <Graph />
          <GraphData />
        </div>
      )}

      {/* NewTransaksi */}
      {isNewTransaksiVisible && (
        <div
          ref={newTransaksiRef}
          className="absolute bottom-0 top-0 left-0 right-0  bg-black bg-opacity-30 z-50 flex items-center justify-center"
        >
          <div className="bg-white p-8 rounded-se-xl rounded-ss-xl shadow-md flex self-end">
            <NewTransaction />
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
