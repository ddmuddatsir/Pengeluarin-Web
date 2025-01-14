"use client";

import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  IconBill,
  IconBusiness,
  IconCart,
  IconEntertainment,
  IconFood,
  IconGift,
  IconHouse,
  IconLove,
  IconOther,
  IconSchool,
  IconShop,
  IconSubscription,
} from "../components/iconCategory/page";
import {
  IconCalender,
  IconDownChevron,
  IconUpChevron,
} from "@/public/icon/icon";
import NumericKeyboard from "@/components/ui/numericKeyboard";
import axios from "axios";
import CalenderComponent from "../components/Calender/page";
// Pastikan path sesuai

export default function NewTransaction() {
  const calendarRef = useRef<HTMLDivElement>(null);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [category, setCategory] = useState<string | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [isCalenderIsVisible, setIsCalenderIsVisible] = useState(false);

  const [isClient, setIsClient] = useState(false);

  const categories = [
    "BELANJA",
    "BISNIS",
    "KERANJANG",
    "LANGGANAN",
    "TAGIHAN",
    "HIBURAN",
    "MAKANAN",
    "RUMAH",
    "HADIAH",
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/transaction");
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setError("Failed to fetch transactions");
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const handleAddTransaction = async (e) => {
    e.preventDefault();

    if (!amount || !date || !description || !category) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const newTransaction = {
        amount: parseFloat(amount),
        date,
        description,
        category,
      };

      // Log data sebelum dikirim ke server
      console.log("Sending transaction data to the server:", newTransaction);

      const response = await axios.post("/api/transaction", newTransaction);
      setTransactions([...transactions, response.data]);
      setAmount(""); // Clear the amount field
      setDescription(""); // Clear the description field
      setCategory(""); // Clear category
      setCategory(null); // Reset selected category
      setDate(""); // Clear the date
      setError(null); // Clear error
    } catch (error) {
      console.error("Error adding transaction:", error);
      setError("Failed to add transaction");
    } finally {
      setLoading(false);
    }
  };

  const handleInputKeyboard = (value: string) => {
    setAmount(value);
  };

  const handleKeyPress = (button: string) => {
    if (button === "AC") {
      setAmount(""); // Clear all input
    } else if (button === "{bksp}") {
      setAmount((prev) => prev.slice(0, -1)); // Backspace
    } else if (button === "Enter") {
      try {
        setAmount((prev) => eval(prev).toString()); // Evaluate the math expression
      } catch {
        setAmount("Error");
      }
    } else {
      setAmount((prev) => prev + button); // Append button to input
    }
  };

  const toggleDropDown = () => {
    setIsDropDownOpen((prev) => !prev);
  };

  const handleCategorySelect = (category: string) => {
    setCategory(category);
    setCategory(category); // Set category when selected
    setIsDropDownOpen(false); // Close dropdown after selection
  };

  const handleDateChange = (date: Date | undefined) => {
    setDate(date);
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

  return (
    <div className="bg-white w-[384px]">
      {/* Title */}
      <div className="flex justify-center pb-6 ">
        <p className="font-semibold">Tambah Transaksi</p>
      </div>

      {/* Input Display */}
      <div className="flex justify-center items-center p-10">
        <p>Rp</p>
        <p className="font-semibold text-4xl">{amount || "0"}</p>
      </div>

      {/* Form Section */}
      <div className="flex justify-center">
        <div className="flex flex-col w-80 gap-3 items-center py-3">
          {/* Choose Category */}
          <div className="w-full flex flex-row items-center gap-2">
            <Button
              onClick={toggleDropDown}
              className="bg-gray-100 text-gray-800 hover:bg-gray-100"
            >
              {category ? category : "Pilih Kategori"}
              {isDropDownOpen ? <IconDownChevron /> : <IconUpChevron />}
            </Button>

            {/* Category Icons */}
            <div className="overflow-x-auto">
              <div className="flex gap-2 px-2">
                {categories.map((cat) => (
                  <div
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className="cursor-pointer"
                  >
                    {cat === "BELANJA" && <IconShop />}
                    {cat === "BISNIS" && <IconBusiness />}
                    {cat === "KERANJANG" && <IconCart />}
                    {cat === "HIBURAN" && <IconEntertainment />}
                    {cat === "MAKANAN" && <IconFood />}
                    {cat === "HADIAH" && <IconGift />}
                    {cat === "RUMAH" && <IconHouse />}
                    {cat === "KESEHATAN" && <IconLove />}
                    {cat === "SEKOLAH" && <IconSchool />}
                    {cat === "LANGGANAN" && <IconSubscription />}
                    {cat === "TAGIHAN" && <IconBill />}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Date Picker */}
          <Button className="bg-gray-100 text-gray-800 hover:bg-gray-100 w-full">
            <div className="flex justify-between">
              <div className="flex flex-row gap-2 pr-28">
                <IconCalender />
                <p onClick={toggleCalender} className="flex self-start">
                  {isClient
                    ? date
                      ? date.toDateString()
                      : new Date().toDateString()
                    : "Loading..."}
                </p>

                {isCalenderIsVisible && (
                  <div ref={calendarRef} className="absolute">
                    <CalenderComponent onDateChange={handleDateChange} />
                  </div>
                )}
              </div>

              <p className="flex self-end">Hari ini?</p>
            </div>
          </Button>

          {/* Notes Input */}
          <Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Catatan..."
            className="bg-gray-100 text-white hover:bg-gray-100 w-full"
          />
        </div>
      </div>

      {/* Numeric Keyboard */}
      <div>
        <NumericKeyboard
          onChange={handleInputKeyboard}
          onKeyPress={handleKeyPress}
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-center py-4">
        <Button
          type="submit"
          onClick={handleAddTransaction}
          disabled={loading}
          className="w-full bg-blue-600 text-white"
        >
          {loading ? "Loading..." : "Simpan Transaksi"}
        </Button>
      </div>

      {error && <div className="text-red-500 text-center">{error}</div>}
    </div>
  );
}
