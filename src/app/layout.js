import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./_component/Header";import Hero from "./_component/Hero";
;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "formforms",
  description: "create forms with AI ,share with friends and see responses in app",
  icons:{
    icon:"/favicon-v2.png",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        
        <Header/>
        <Hero/>
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
