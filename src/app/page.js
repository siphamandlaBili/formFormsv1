// src/app/page.js or src/pages/index.js (depending on Next.js version)
import { Button } from "@/components/ui/button";
import Hero from "./_component/Hero";
import WhoIsItFor from "./_component/WhoIsItFor";

export default function Home() {
  return (
    <div>
      <Hero/>
      <WhoIsItFor/>
    </div>
  );
}
