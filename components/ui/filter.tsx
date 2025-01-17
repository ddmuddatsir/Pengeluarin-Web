"use client";

interface FilterProps {
  filters: { id: string; label: string }[]; // Tipe untuk filter: array objek dengan id dan label
  isActive: string; // Tipe untuk isActive: harus string
  handleFilter: (id: string) => void; // Tipe untuk handleFilter: fungsi yang menerima string dan tidak mengembalikan apa-apa
}

export default function Filter({
  filters,
  isActive,
  handleFilter,
}: FilterProps) {
  return (
    <div className="flex flex-row gap-2 mb-4">
      {filters.map((filter) => (
        <div
          key={filter.id}
          onClick={() => handleFilter(filter.id)}
          className={`rounded-2xl self-center cursor-pointer ${
            isActive === filter.id
              ? "bg-slate-900 border-white border"
              : "bg-white border border-gray-800"
          } px-1.5 py-1`}
        >
          <p
            className={`${
              isActive === filter.id
                ? "text-white text-sm"
                : "text-slate-900 text-sm"
            }`}
          >
            {filter.label}
          </p>
        </div>
      ))}
    </div>
  );
}
