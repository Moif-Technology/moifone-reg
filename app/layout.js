import { Plus_Jakarta_Sans } from "next/font/google";
import "react-phone-number-input/style.css";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Moifone — Intelligent ERP + POS Registration & Setup",
  description:
    "Register and configure Moifone: intelligent cloud ERP and POS with smart automation, forecasting signals, and data-driven operations for growing businesses.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${plusJakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
