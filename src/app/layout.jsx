import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./_component/Header";
import ConditionalFooter from "./_component/ConditionalFooter";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

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
  description: "create forms with AI friends and see responses in app",
  icons: {
    icon: "/favicon-v2.png",
  }
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden`}
        >
          <Header />
          <div className="overflow-hidden">
            {children}
          </div>
          <ConditionalFooter />
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
