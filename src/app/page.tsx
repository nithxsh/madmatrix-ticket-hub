import TicketHub from "@/components/TicketHub";
import { Toaster } from "@/components/ui/toaster";
import { MatrixRain } from "@/components/MatrixRain";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-x-hidden bg-black">
      {/* 0,1 Matrix Rain background */}
      <MatrixRain />
      
      {/* Decorative gradient overlay */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-gradient-to-br from-[#1a0505]/80 via-transparent to-black/90">
        <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[150px] animate-pulse-glow" />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <TicketHub />
      </div>
      
      <Toaster />
    </main>
  );
}
