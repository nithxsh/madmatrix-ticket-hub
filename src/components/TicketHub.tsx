
"use client";

import React, { useState, useRef } from "react";
import { Search, Download, Terminal, Loader2, User, Ticket as TicketIcon, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Ticket } from "@/components/Ticket";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";
import { generateCyberpunkGreeting } from "@/ai/flows/generate-cyberpunk-greeting";

interface Attendee {
  Name: string;
  RegNo: string;
  email: string;
}

export default function TicketHub() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [attendee, setAttendee] = useState<Attendee | null>(null);
  const [greeting, setGreeting] = useState<string>("");
  const [isCapturing, setIsCapturing] = useState(false);
  const ticketRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const sanitizedEmail = email.trim().toLowerCase();
    if (!sanitizedEmail) return;

    setLoading(true);
    setAttendee(null);
    setGreeting("");

    try {
      const apiUrl = `https://sheetdb.io/api/v1/m4xm36b3182sq`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (Array.isArray(data)) {
        const foundRow = data.find((row: any) => {
          return Object.entries(row).some(([key, value]) => {
            const isEmailKey = key.toLowerCase().includes('email');
            const isEmailValue = typeof value === 'string' && value.trim().toLowerCase() === sanitizedEmail;
            return isEmailKey && isEmailValue;
          });
        });

        if (foundRow) {
          const foundAttendee: Attendee = {
            Name: foundRow.Name || foundRow.name || foundRow.NAME || "Authorized Personnel",
            RegNo: foundRow.RegNo || foundRow.regno || foundRow.REGNO || foundRow['Reg No'] || "VERIFIED",
            email: sanitizedEmail,
          };
          
          setAttendee(foundAttendee);

          try {
            const aiResult = await generateCyberpunkGreeting({ attendeeName: foundAttendee.Name });
            setGreeting(aiResult.greeting);
          } catch (error) {
            setGreeting("Access granted. Protocol initiated.");
          }
        } else {
          toast({
            title: "Registry Mismatch",
            description: `Email "${sanitizedEmail}" not found.`,
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Registry Offline",
        description: "Could not connect to database.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!ticketRef.current) return;

    setIsCapturing(true);
    try {
      // Ensure element is in viewport and scroll is 0 for consistent capture
      window.scrollTo(0, 0);
      
      // Wait for all assets (QR, Logo, Background) to be ready
      await new Promise(resolve => setTimeout(resolve, 500));

      const canvas = await html2canvas(ticketRef.current, {
        useCORS: true,
        scale: 3, // High enough for quality, low enough to prevent "zoom" artifacts
        backgroundColor: "#050000",
        logging: false,
        width: 800,
        height: 380,
        scrollX: -window.scrollX,
        scrollY: -window.scrollY,
        windowWidth: document.documentElement.offsetWidth,
        windowHeight: document.documentElement.offsetHeight,
      });
      
      const link = document.createElement("a");
      link.download = `MadMatrix_Permit_${attendee?.RegNo || "2026"}.png`;
      link.href = canvas.toDataURL("image/png", 0.9);
      link.click();
      
      toast({
        title: "Download Successful",
        description: "Your digital permit has been saved.",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Could not generate permit image.",
        variant: "destructive",
      });
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4 max-w-5xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-primary">Registry Retrieval Portal</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase drop-shadow-[0_0_20px_rgba(255,0,0,0.4)]">
          MadMatrix<span className="text-primary">'26</span>
        </h1>
        <p className="text-muted-foreground font-body text-sm md:text-base max-w-md mx-auto">
          Enter your registered email to decrypt and retrieve your official entry permit.
        </p>
      </div>

      <Card className="w-full bg-black/60 border-primary/30 backdrop-blur-xl shadow-[0_0_30px_rgba(255,0,0,0.1)] overflow-hidden cyber-scanline">
        <CardContent className="p-8">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Terminal className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary opacity-50" />
              <Input
                type="email"
                placeholder="REGISTRY_EMAIL@DOMAIN.COM"
                className="pl-10 h-14 bg-black/40 border-primary/20 text-primary placeholder:text-primary/30 font-mono focus-visible:ring-primary focus-visible:border-primary text-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button 
              type="submit" 
              disabled={loading || !email}
              className="h-14 px-10 bg-primary text-white font-bold hover:bg-red-700 transition-all duration-300 shadow-[0_0_25px_rgba(255,0,0,0.4)] disabled:opacity-50 text-base tracking-widest uppercase"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  DECRYPTING...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-5 w-5" />
                  ACCESS REGISTRY
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {attendee && (
        <div className="w-full space-y-10 animate-in zoom-in-95 duration-700">
          <div className="flex flex-col items-center space-y-8">
            <div className="p-4 bg-white/5 rounded-lg border border-white/10 shadow-2xl overflow-x-auto w-full flex justify-center">
              <Ticket
                ref={ticketRef}
                id="madmatrix-ticket"
                name={attendee.Name}
                regNo={attendee.RegNo}
                greeting={greeting}
              />
            </div>
            
            <Button 
              onClick={handleDownload}
              disabled={isCapturing}
              size="lg"
              className="bg-white text-black hover:bg-white/90 font-black tracking-widest uppercase shadow-[0_0_30px_rgba(255,255,255,0.2)] h-16 px-16 text-lg"
            >
              {isCapturing ? (
                <>
                  <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                  PROCESSING...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-6 w-6" />
                  DOWNLOAD PERMIT
                </>
              )}
            </Button>
          </div>
          
          <div className="max-w-md mx-auto p-6 bg-primary/5 border border-primary/20 rounded-xl flex flex-col items-center gap-4 text-center">
            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="text-white font-black uppercase tracking-widest">Clearance Confirmed</h4>
              <p className="text-xs text-muted-foreground mt-1 font-mono uppercase">Permit {attendee.RegNo} is authorized for entry into SIMATS campus.</p>
            </div>
          </div>
        </div>
      )}

      <div className="pt-12 pb-8 text-center opacity-30">
        <p className="text-[10px] font-mono text-primary tracking-[0.5em] uppercase">
          &copy; 2026 MadMatrix Defense Protocol | Simats Engineering
        </p>
      </div>
    </div>
  );
}
