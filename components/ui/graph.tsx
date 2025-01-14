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

const Graph: React.FC = () => {
  // Data untuk grafik
  const data = {
    labels: ["Januari", "Februari", "Maret", "April", "Mei"],
    datasets: [
      {
        label: "Pengeluaran", // Label dataset
        data: [65, 59, 80, 81, 56],
        backgroundColor: "white", // Warna latar belakang bar (merah muda transparan)
        // borderColor: "white", // Warna border bar (merah muda)
        // borderWidth: 1,
      },
    ],
  };

  // Opsi untuk grafik
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Menghilangkan label pada legend
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white", // Mengubah warna angka pada sumbu X menjadi putih
        },
      },
      y: {
        display: false, // Menghilangkan label dan angka pada sumbu Y
        ticks: {
          color: "white", // Mengubah warna angka pada sumbu Y menjadi putih
        },
      },
    },
  };

  return (
    <div>
      {/* Komponen grafik bar */}
      <div className="flex justify-center">
        <Bar data={data} options={options} className="w-full h-96" />
      </div>
    </div>
  );
};

export default Graph;
