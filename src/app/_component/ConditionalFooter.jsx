"use client";

import { usePathname } from 'next/navigation';
import Footer from "./Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();
  
  // Only show footer on landing page (root path)
  const isLandingPage = pathname === '/';
  
  if (!isLandingPage) {
    return null;
  }
  
  return <Footer />;
}