import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/app/components/NavbarWrapper";
import SessionWrapper from "@/app/components/SessionWrapper";
import Footer from "@/app/components/Footer";
import ToastProvider from "@/app/components/ToastProvider";

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
        <ToastProvider/>
      {children}
        <Footer/>
      </SessionWrapper>
      </body>
    </html>
  );
}
