import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ThemeToggle } from "./components/theme-toggle";
import "./globals.css";

export const metadata: Metadata = {
  title: "User Mobility App",
  description: "Booking, delivery, buy/rent vehicles, charging station AI, payments, and user tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <ThemeToggle />
      </body>
    </html>
  );
}
