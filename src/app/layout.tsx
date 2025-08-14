import type { Metadata } from "next";
import "./globals.css";

import { JetBrains_Mono } from "next/font/google";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrainsMono",
});

import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "INVIDEO",
  description: "Filmes online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable}`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
