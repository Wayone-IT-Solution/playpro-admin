import React from "react";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import { FiDownload } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";

const GenerateExcelButton = ({ data }: { data: any }) => {
  const { isDarkMode } = useAuth();

  const handleGenerateExcel = () => {
    if (!data || data.length === 0) {
      return toast.warn("No data available to generate Excel file.");
    }

    try {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(workbook, worksheet, "Data Items");

      const timestamp = new Date().toISOString().replace(/[:.-]/g, "_");
      const filename = `export_${timestamp}.xlsx`;

      XLSX.writeFile(workbook, filename);
    } catch (error) {
      console.log("Error generating Excel file:", error);
      toast.error(
        "An error occurred while generating the Excel file. Please try again."
      );
    }
  };

  return (
    <button
      onClick={handleGenerateExcel}
      className={`flex items-center gap-2 px-4 py-2 text-xs font-medium text-white ${
        isDarkMode ? "bg-infobg" : "bg-primary"
      } rounded-lg transition hover:opacity-90`}
    >
      <FiDownload className="text-base" />
      Export to Excel
    </button>
  );
};

export default GenerateExcelButton;
