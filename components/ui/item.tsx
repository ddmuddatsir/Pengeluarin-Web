import { formatDate } from "@/utils/formatDate";
import { formatNumber } from "@/utils/formatNumber";
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
} from "./iconcategory";

export default function Item({ items }) {
  // Daftar kategori yang valid
  const validCategories = [
    "BELANJA",
    "BISNIS",
    "KERANJANG",
    "KESEHATAN",
    "LAINNYA",
    "SEKOLAH",
    "LANGGANAN",
    "TAGIHAN",
    "HIBURAN",
    "MAKANAN",
    "RUMAH",
    "HADIAH",
  ];

  // Ikon berdasarkan kategori
  const categoryIcons = {
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

  // Validasi kategori pada transaksi
  const validatedItems = items.map((item) => ({
    ...item,
    category: validCategories.includes(item.category) ? item.category : null,
  }));

  // Mengelompokkan transaksi berdasarkan tanggal dan menghitung total untuk setiap tanggal
  const groupedTransactions = validatedItems.reduce((groups, item) => {
    const date = new Date(item.date).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = { transactions: [], totalAmount: 0 };
    }
    groups[date].transactions.push(item);
    groups[date].totalAmount += item.amount; // Menambahkan jumlah transaksi
    return groups;
  }, {});

  return (
    <div className="space-y-4">
      {Object.keys(groupedTransactions).map((date) => {
        const totalAmount = groupedTransactions[date].totalAmount;
        return (
          <div key={date} className="border-b pb-4">
            {/* Tampilkan tanggal dan total transaksi di sampingnya */}
            <div className="flex justify-between items-center">
              <p className="text-sm opacity-45 text-gray-800">
                {formatDate(date)}
              </p>
              <p className="text-sm opacity-45 text-gray-800">
                Rp{formatNumber(totalAmount)}
              </p>
            </div>

            {/* Menampilkan transaksi untuk tanggal tersebut */}
            {groupedTransactions[date].transactions.map((item) => (
              <div key={item.id} className="flex flex-row justify-between mt-2">
                <div className="flex flex-row justify-between w-full cursor-pointer">
                  <div className="flex flex-row py-3">
                    <div className="pr-2">
                      {categoryIcons[item.category] || <IconBill />}
                    </div>
                    <div>
                      <p className="text-sm text-gray-700">
                        {item.category
                          ? item.category.charAt(0) +
                            item.category.slice(1).toLowerCase()
                          : "Kategori Tidak Valid"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <p className="text-sm  text-gray-700">
                      Rp{formatNumber(item.amount)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
