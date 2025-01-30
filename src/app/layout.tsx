import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css";

const interSans = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ReflexAI Chatbot",
  description: "An exercise for ReflexAI interview",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interSans.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
