import type { Metadata } from "next";
import { Sen, Unbounded } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/page";

const sen = Sen({
  variable: "--font-sen",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FreshBite E-commerce Website",
  description: "Ecommerce Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sen.variable} ${unbounded.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
