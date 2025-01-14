export const formatDate = (date: Date | string): string => {
  const daysOfWeek: string[] = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];
  const months: string[] = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  // Mengonversi input menjadi objek Date jika berupa string
  const parsedDate = typeof date === "string" ? new Date(date) : date;

  // Validasi jika tanggal tidak valid
  if (isNaN(parsedDate.getTime())) {
    throw new Error("Input must be a valid date");
  }

  const dayOfWeek = daysOfWeek[parsedDate.getDay()];
  const day = parsedDate.getDate();
  const month = months[parsedDate.getMonth()];
  const year = parsedDate.getFullYear();

  return `${dayOfWeek}, ${day} ${month} ${year}`;
};
