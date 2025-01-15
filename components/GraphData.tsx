"use client";

import React, { useMemo } from "react";
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
} from "./ui/iconcategory";

interface Transaction {
  category: string;
  amount: number;
}

interface GraphDataProps {
  transactions: Transaction[];
}

export default function GraphData({ transactions }: GraphDataProps) {
  // Define category icons
  const categoryIcons: Record<string, React.ReactNode> = {
    BELANJA: <IconShop />,
    BISNIS: <IconBusiness />,
    KERANJANG: <IconCart />,
    KESEHATAN: <IconLove />,
    LAINNYA: <IconOther />,
    SEKOLAH: <IconSchool />,
    LANGGANAN: <IconSubscription />,
    TAGIHAN: <IconBill />,
    HIBURAN: <IconEntertainment />,
    MAKANAN: <IconFood />,
    RUMAH: <IconHouse />,
    HADIAH: <IconGift />,
  };

  // Calculate total amount for each category and overall
  const { categoryAmounts, totalAmount } = useMemo(() => {
    const amounts = transactions.reduce(
      (acc, { category, amount }) => {
        acc.categoryAmounts[category] =
          (acc.categoryAmounts[category] || 0) + amount;
        acc.totalAmount += amount;
        return acc;
      },
      { categoryAmounts: {} as Record<string, number>, totalAmount: 0 }
    );

    // Ensure that every category is represented, even if it has no transactions
    Object.keys(categoryIcons).forEach((category) => {
      if (!(category in amounts.categoryAmounts)) {
        amounts.categoryAmounts[category] = 0;
      }
    });

    return amounts;
  }, [transactions]);

  // Sort categories by total amount in descending order
  const sortedCategories = Object.keys(categoryAmounts).sort(
    (a, b) => categoryAmounts[b] - categoryAmounts[a]
  );

  return (
    <div className="px-4 mt-3 pb-4 pt-4 rounded-t-2xl bg-white w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {sortedCategories.map((categoryKey) => {
          const categoryAmount = categoryAmounts[categoryKey] || 0;
          const percentage =
            totalAmount > 0
              ? ((categoryAmount / totalAmount) * 100).toFixed(2)
              : "0";

          return (
            <div
              key={categoryKey}
              className="flex flex-col items-center justify-center bg-gray-100 rounded-lg p-4 shadow-sm"
            >
              <div className="text-blue-500 mb-2">
                {categoryIcons[categoryKey]}
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-700">
                  {categoryKey.charAt(0).toUpperCase() +
                    categoryKey.slice(1).toLowerCase()}
                </p>
                <p className="text-xs text-gray-500">
                  Rp{categoryAmount.toLocaleString()}
                </p>
                <p className="text-xs text-gray-400">{percentage}%</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
