import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/providers/ReduxProvider";
import MaterialProvider from "@/providers/MaterialProvider";
import Header from "@/components/UI/layouts/Header";
import { serif } from "./fonts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={serif.className}>
      <body className={`mx-auto max-w-2xl py-12 px-5`}>
        <ReduxProvider>
          <MaterialProvider>
            <Header />
            {children}
          </MaterialProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
