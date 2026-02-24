
"use client";

import React, { useState, useRef, useEffect } from "react";
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
    
    // 1) Trim and lowercase the user input
    const sanitizedEmail = email.trim().toLowerCase();
    if (!sanitizedEmail) return;

    setLoading(true);
    setAttendee(null);
    setGreeting("");

    try {
      // 2) Ensure the SheetDB query parameter matches header 'email'
      const response = await fetch(`https://sheetdb.io/api/v1/m4xm36b3182sq?email=${encodeURIComponent(sanitizedEmail)}`);
      const data: Attendee[] = await response.json();

      // 3) Add a console.log(data) for debugging
      console.log("Registry Data Response:", data);

      if (data && data.length > 0) {
        const foundAttendee = data[0];
        setAttendee(foundAttendee);

        // Generate AI Greeting
        try {
          const aiResult = await generateCyberpunkGreeting({ attendeeName: foundAttendee.Name });
          setGreeting(aiResult.greeting);
        } catch (error) {
          console.error("AI Greeting error:", error);
          setGreeting("Welcome to the Matrix, Operator.");
        }
      } else {
        toast({
          title: "Registry Mismatch",
          description: "No attendee found with that email. Please check your spelling or contact support.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Network Failure",
        description: "Could not connect to the central registry. Please try again.",
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
      const canvas = await html2canvas(ticketRef.current, {
        useCORS: true,
        scale: 3, // High resolution
        backgroundColor: null,
      });
      
      const link = document.createElement("a");
      link.download = `MadMatrix_Ticket_${attendee?.RegNo || "2026"}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      
      toast({
        title: "Transmission Complete",
        description: "Ticket downloaded successfully. See you at MadMatrix '26.",
      });
    } catch (error) {
      toast({
        title: "Capture Error",
        description: "Failed to generate high-resolution image. Try again.",
        variant: "destructive",
      });
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4 max-w-4xl mx-auto space-y-12">
      {/* Header Section */}
      <div className="text-center space-y-4 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#22c55e]" />
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-primary">System Online</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-headline font-black tracking-tighter text-white uppercase drop-shadow-[0_0_15px_rgba(34,197,94,0.3)]">
          MadMatrix<span className="text-primary">'26</span>
        </h1>
        <p className="text-muted-foreground font-body text-sm md:text-base max-w-md mx-auto">
          Authorized personnel only. Enter your registered email to retrieve your digital entry permit.
        </p>
      </div>

      {/* Search Section */}
      <Card className="w-full bg-black/40 border-primary/20 backdrop-blur-md shadow-2xl overflow-hidden cyber-scanline">
        <CardContent className="p-6">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Terminal className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary opacity-50" />
              <Input
                type="email"
                placeholder="REGISTRY_EMAIL@DOMAIN.COM"
                className="pl-10 h-12 bg-black/60 border-primary/30 text-primary placeholder:text-primary/30 font-mono focus-visible:ring-primary focus-visible:border-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button 
              type="submit" 
              disabled={loading || !email}
              className="h-12 px-8 bg-primary text-black font-bold hover:bg-secondary transition-all duration-300 shadow-[0_0_20px_rgba(34,197,94,0.3)] disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  INITIALIZING...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  SCAN REGISTRY
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Ticket Result Section */}
      {attendee && (
        <div className="w-full space-y-8 animate-in zoom-in-95 fade-in duration-500">
          <div className="flex flex-col items-center space-y-6">
            <Ticket
              ref={ticketRef}
              id="madmatrix-ticket"
              name={attendee.Name}
              regNo={attendee.RegNo}
              greeting={greeting}
            />
            
            <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
              <Button 
                onClick={handleDownload}
                disabled={isCapturing}
                size="lg"
                className="bg-secondary text-black hover:bg-secondary/80 font-black tracking-widest uppercase shadow-[0_0_20px_rgba(201,232,48,0.3)]"
              >
                {isCapturing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ENCRYPTING PNG...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-5 w-5" />
                    DOWNLOAD TICKET
                  </>
                )}
              </Button>
            </div>
          </div>
          
          {/* Debug/Info panel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
            <div className="p-4 bg-primary/5 border border-primary/10 rounded-lg flex items-center gap-3">
              <User className="h-5 w-5 text-primary" />
              <div>
                <p className="text-[10px] uppercase text-primary/60 font-mono">Registry Name</p>
                <p className="text-sm font-bold truncate">{attendee.Name}</p>
              </div>
            </div>
            <div className="p-4 bg-primary/5 border border-primary/10 rounded-lg flex items-center gap-3">
              <TicketIcon className="h-5 w-5 text-primary" />
              <div>
                <p className="text-[10px] uppercase text-primary/60 font-mono">Permit ID</p>
                <p className="text-sm font-bold">{attendee.RegNo}</p>
              </div>
            </div>
            <div className="p-4 bg-primary/5 border border-primary/10 rounded-lg flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-secondary" />
              <div>
                <p className="text-[10px] uppercase text-secondary/60 font-mono">Status</p>
                <p className="text-sm font-bold text-secondary">READY FOR ENTRY</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Branding */}
      <div className="pt-12 pb-8 text-center">
        <p className="text-[10px] font-mono text-primary/30 tracking-[0.5em] uppercase">
          &copy; 2026 MadMatrix Cyber-Security Sub-Division
        </p>
      </div>
    </div>
  );
}
