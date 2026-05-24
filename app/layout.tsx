import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { CartSidebar } from "../components/cart/CartSidebar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Walton Plaza",
  description: "Minimalist Shopping Experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col font-sans">
        <Header />
        <main className="flex-1 flex flex-col p-8 bg-[#EDF6FF]">
          {children}
        </main>
        <Footer />
        <CartSidebar />
      </body>
    </html>
  );
}
