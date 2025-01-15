"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Inisialisasi Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Transaction {
  date: string; // Format tanggal (contoh: "2025-01-01")
  amount: number; // Jumlah pengeluaran
}

interface GraphProps {
  transactions: Transaction[];
}

const Graph: React.FC<GraphProps> = ({ transactions }) => {
  // Fungsi untuk menghitung pengeluaran per periode dalam bulan
  const getMonthlyExpenditure = (transactions: Transaction[]) => {
    const monthlyData: { [key: string]: number[] } = {
      "1-7": [],
      "8-14": [],
      "15-21": [],
      "22-end": [],
    };

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const day = date.getDate(); // Mendapatkan tanggal (1-31)

      // Tentukan periode berdasarkan tanggal transaksi
      let period = "";
      if (day >= 1 && day <= 7) period = "1-7";
      else if (day >= 8 && day <= 14) period = "8-14";
      else if (day >= 15 && day <= 21) period = "15-21";
      else period = "22-end";

      monthlyData[period].push(transaction.amount);
    });

    // Menghitung total pengeluaran untuk setiap periode
    const monthlyExpenditure = Object.keys(monthlyData).reduce(
      (acc, period) => {
        acc[period] = monthlyData[period].reduce(
          (sum, amount) => sum + amount,
          0
        );
        return acc;
      },
      {} as { [key: string]: number }
    );

    return monthlyExpenditure;
  };

  // Ambil data pengeluaran per bulan
  const monthlyExpenditure = getMonthlyExpenditure(transactions);

  // Menyiapkan data untuk grafik
  const labels = ["1-7", "8-14", "15-21", "22-end"]; // Label periode
  const data = {
    labels: labels, // Nama periode sebagai label sumbu X
    datasets: [
      {
        label: "Pengeluaran", // Label dataset
        data: labels.map((label) => monthlyExpenditure[label] || 0), // Data pengeluaran per periode
        backgroundColor: "white", // Warna latar belakang bar
      },
    ],
  };

  // Opsi untuk grafik
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Sembunyikan legenda
      },
      title: {
        display: true,
        // text: "Pengeluaran Bulanan",
        color: "white",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white",
        },
      },
      y: {
        display: false,
        ticks: {
          color: "white",
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default Graph;
