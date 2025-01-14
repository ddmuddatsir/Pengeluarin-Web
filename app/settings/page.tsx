"use client";
import React from "react";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { IconLeftChevron, IconRightChevron } from "@/public/icon/icon";

export default function Setting() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <>
      <div className="h-screen w-full bg-white">
        {/* Header */}
        <header className="p-4 flex items-center justify-between">
          {/* Tombol Kembali */}
          <div className="flex items-center">
            <button className="mr-4" onClick={handleGoBack}>
              <IconLeftChevron color={"black"} />
            </button>
          </div>

          {/* Pengaturan di Tengah */}
          <div className="flex-1 flex justify-center">
            <p className="text-center">Pengaturan</p>
          </div>
        </header>

        {/* Konten Utama */}
        <div className="p-6 space-y-6">
          {/* Kategori Pengeluaran */}
          <div className="space-y-2">
            <div className="flex flex-row items-center justify-between">
              <p className="font-semibold text-lg">Kategori</p>
              <IconRightChevron color={"gray-900"} />
            </div>
            <p className="text-gray-500">Kelola kategori pengeluaran</p>
          </div>

          {/* Export data to CSV */}
          <div className="space-y-2">
            <p className="font-semibold text-lg">Export data (2)</p>
            <p className="text-gray-500">
              Export data pengeluaran ke dalam format CSV
            </p>
            <div className="flex gap-4">
              <Button className="w-full">Download</Button>
              <Button className="w-full">Copy to Clipboard</Button>
            </div>
          </div>

          {/* Import data from CSV */}
          <div className="space-y-2">
            <p className="font-semibold text-lg">Import data</p>
            <p className="text-gray-500">
              Import data pengeluaran dari file CSV
            </p>
            <Button className="w-full">Import from clipboard</Button>
          </div>

          {/* Sinkronisasi data */}
          <div className="space-y-2">
            <p className="font-semibold text-lg">Sinkronisasi Data</p>
          </div>

          {/* Setting lanjutan */}
          <div className="space-y-2">
            <p className="font-semibold text-lg">Pengaturan Lanjutan</p>
          </div>
        </div>
      </div>
    </>
  );
}
