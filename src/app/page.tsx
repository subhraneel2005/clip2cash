import Dashboard from "@/components/Dashboard";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto my-12 space-y-5">
      <Dashboard/>
    </main>
  );
}