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
} from "../iconCategory/page";

export default function GraphData() {
  const categories = [
    { icon: <IconShop />, label: "Belanja", amount: "Rp0", percentage: "0%" },
    {
      icon: <IconBusiness />,
      label: "Bisnis",
      amount: "Rp0",
      percentage: "0%",
    },
    { icon: <IconCart />, label: "Keranjang", amount: "Rp0", percentage: "0%" },
    { icon: <IconLove />, label: "Kesehatan", amount: "Rp0", percentage: "0%" },
    { icon: <IconOther />, label: "Lainnya", amount: "Rp0", percentage: "0%" },
    { icon: <IconSchool />, label: "Sekolah", amount: "Rp0", percentage: "0%" },
    {
      icon: <IconSubscription />,
      label: "Langganan",
      amount: "Rp0",
      percentage: "0%",
    },
    { icon: <IconBill />, label: "Tagihan", amount: "Rp0", percentage: "0%" },
    {
      icon: <IconEntertainment />,
      label: "Hiburan",
      amount: "Rp0",
      percentage: "0%",
    },
    { icon: <IconFood />, label: "Makanan", amount: "Rp0", percentage: "0%" },
    { icon: <IconHouse />, label: "Rumah", amount: "Rp0", percentage: "0%" },
    { icon: <IconGift />, label: "Hadiah", amount: "Rp0", percentage: "0%" },
  ];

  return (
    <div className="px-4 mt-3 pb-4 pt-4 rounded-t-2xl bg-white w-full">
      {/* Membatasi tinggi dan scrollable */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center bg-gray-100 rounded-lg p-4 shadow-sm"
          >
            <div className="text-blue-500 mb-2">{category.icon}</div>
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-700">
                {category.label}
              </p>
              <p className="text-xs text-gray-500">{category.amount}</p>
              <p className="text-xs text-green-500">{category.percentage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
