import {
  IconChartCakeOutline,
  IconPlus,
  IconRightLeft,
} from "@/public/icon/icon";
import React from "react";

interface FooterProps {
  viewMode: "list" | "graph";
  setViewMode: (mode: "list" | "graph") => void;
  onAddTransaksi: () => void;
}

const FooterHome: React.FC<FooterProps> = ({
  viewMode,
  setViewMode,
  onAddTransaksi,
}) => {
  return (
    <footer className="mt-auto bg-white">
      <nav>
        <ul className="flex justify-center items-center py-5 px-8 space-x-12">
          <li className="flex justify-center">
            <div className="cursor-pointer" onClick={() => setViewMode("list")}>
              <div
                className={`flex justify-center ${
                  viewMode === "list" ? "" : "opacity-30"
                }`}
              >
                <IconRightLeft />
              </div>
              <p
                className={`text-sm ${viewMode === "list" ? "" : "opacity-30"}`}
              >
                Transaksi
              </p>
            </div>
          </li>
          <li className="flex justify-center">
            <button onClick={onAddTransaksi}>
              <div>
                <IconPlus />
              </div>
            </button>
          </li>
          <li className="flex justify-center">
            <div
              className="cursor-pointer"
              onClick={() => setViewMode("graph")}
            >
              <div
                className={`flex justify-center ${
                  viewMode === "graph" ? "" : "opacity-30"
                }`}
              >
                <IconChartCakeOutline />
              </div>
              <p
                className={`text-sm ${
                  viewMode === "graph" ? "" : "opacity-30"
                }`}
              >
                Laporan
              </p>
            </div>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default FooterHome;
