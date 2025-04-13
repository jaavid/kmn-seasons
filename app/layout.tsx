import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google"; // 👈 اضافه شده

// import "./globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazir",
  display: "swap",
  weight: ["400", "700"], // عادی و بولد
});

export const metadata: Metadata = {
  title: "فصل‌های خبر در کرمان نو",
  description: "بر پایه جای | j-ai.ir",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa">
      <body className={`${vazirmatn.variable} font-vazir antialiased`}>
        {children}
      </body>
    </html>
  );
}