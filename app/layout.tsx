// react
import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/app/provider/Theme-provider";

// fonts
import { Bungee, Josefin_Sans } from "next/font/google";

// components
import Navbar from "@/components/navbar/Navbar";

// toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import getCurrentUser from "./actions/getCurrentUser";
import ConfirmQuizModal from "./quiz/components/confirmQuizModal";

// metadata
export const metadata: Metadata = {
  title: "Quizify Quiz App",
  description: "Generated by create next app",
};

export const bungee = Bungee({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bungee",
});

export const josefin = Josefin_Sans({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-josefin",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${bungee.variable} ${josefin.variable} anitalised min-h-screen relative`}
      >
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          theme="light"
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          <ConfirmQuizModal user={currentUser!} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
