import TicketHub from "@/components/TicketHub";
import { Toaster } from "@/components/ui/toaster";
import { MatrixRain } from "@/components/MatrixRain";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-x-hidden">
      {/* Visual background elements */}
      <MatrixRain />
      
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10 bg-gradient-to-br from-background via-background to-black">
        <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[150px] animate-pulse-glow" />
        <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] bg-secondary/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <TicketHub />
      </div>
      
      <Toaster />
    </main>
  );
}