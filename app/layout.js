import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import NavbarWrapper from "@/app/components/NavbarWrapper";
import SessionWrapper from "@/app/components/SessionWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ResuMatch ",
  description: "Find gaps in your resume",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
      <SessionWrapper>
      <NavbarWrapper/>
      {children}
      </SessionWrapper>
      </body>
    </html>
  );
}
