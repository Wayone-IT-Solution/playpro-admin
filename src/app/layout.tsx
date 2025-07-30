import "./globals.css";
import type { Metadata } from "next";

import Navbar from "@/components/Navbar";
import { Lato } from "next/font/google";
import Sidebar from "@/components/common/Sidebar";
import { AuthProvider } from "@/context/AuthContext";
import ToastProvider from "@/components/common/ToastProvider";

export const metadata: Metadata = {
  title: "Billleyo - Scan, Save & Earn with Every Bill",
  description:
    "Billleyo rewards you for uploading your bills and receipts. Simply scan your bill, earn points, and redeem exciting rewards. Start saving and earning effortlessly with Billeyo today!",
};


const lato = Lato({
  subsets: ["latin"], // Specify the subset
  display: "swap", // Use swap for better performance
  variable: "--font-lato", // CSS variable for the font
  style: ["normal", "italic"], // Include both normal and italic styles
  weight: ["100", "300", "400", "700", "900"], // Only supported weights
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.className} font-sans relative antialiased`}>
        <AuthProvider>
          <div className="flex">
            <Sidebar />
            <div className="flex-1 w-[90%] md:w-[93%] lg:w-[83%]">
              <Navbar />
              <main>{children}</main>
              <div id="modal-root"></div>
              <ToastProvider />
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
