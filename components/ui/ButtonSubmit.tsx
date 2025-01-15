import { Button } from "@/components/ui/button";

export const ButtonSubmit = ({ onClick, disabled }) => {
  const handleClick = async () => {
    try {
      // Panggil onClick jika diberikan dan tunggu hasilnya
      const result = await onClick();

      // Jika aksi berhasil (misalnya result === true), refresh halaman
      if (result) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  return (
    <div className="flex justify-center pt-4">
      <Button
        type="submit"
        onClick={handleClick}
        disabled={disabled}
        className="w-full bg-blue-600 text-white"
      >
        {disabled ? "Loading..." : "Simpan Transaksi"}
      </Button>
    </div>
  );
};
