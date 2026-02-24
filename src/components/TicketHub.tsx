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

      console.log("Registry Data Received:", data);

      if (Array.isArray(data) && data.length > 0) {
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
            console.error("AI Greeting error:", error);
            setGreeting("Access granted. Welcome to the Matrix.");
          }
        } else {
          toast({
            title: "Registry Mismatch",
            description: `Email "${sanitizedEmail}" not found in our database.`,
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Access Denied",
          description: "The registry is currently inaccessible.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      toast({
        title: "Network Failure",
        description: "Could not connect to the registry. Check your uplink.",
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
        scale: 3, 
        backgroundColor: null,
      });
      
      const link = document.createElement("a");
      link.download = `MadMatrix_Ticket_${attendee?.RegNo || "2026"}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      
      toast({
        title: "Transmission Complete",
        description: "Ticket downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Capture Error",
        description: "Failed to generate high-resolution image.",
        variant: "destructive",
      });
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4 max-w-4xl mx-auto space-y-12">
      {/* Header Section */}
      <div className="text-center space-y-4 animate-in fade-in slide-in-from-top-4 duration-1000">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse shadow-[0_0_12px_#ff0000]" />
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-primary drop-shadow-[0_0_5px_rgba(255,0,0,0.5)]">System Critical</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-headline font-black tracking-tighter text-white uppercase drop-shadow-[0_0_20px_rgba(255,0,0,0.4)]">
          MadMatrix<span className="text-primary">'26</span>
        </h1>
        <p className="text-muted-foreground font-body text-sm md:text-base max-w-md mx-auto">
          Authorized personnel only. Enter your registered email to retrieve your digital entry permit.
        </p>
      </div>

      {/* Search Section */}
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
                  ANALYZING...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-5 w-5" />
                  DECRYPT REGISTRY
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Ticket Result Section */}
      {attendee && (
        <div className="w-full space-y-10 animate-in zoom-in-95 fade-in duration-700">
          <div className="flex flex-col items-center space-y-8">
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
                className="bg-secondary text-white hover:bg-secondary/80 font-black tracking-widest uppercase shadow-[0_0_25px_rgba(255,50,0,0.3)] h-14 px-12"
              >
                {isCapturing ? (
                  <>
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                    ENCRYPTING...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-6 w-6" />
                    DOWNLOAD PERMIT
                  </>
                )}
              </Button>
            </div>
          </div>
          
          {/* Debug/Info panel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
            <div className="p-5 bg-primary/10 border border-primary/20 rounded-xl flex items-center gap-4 backdrop-blur-sm shadow-inner">
              <User className="h-6 w-6 text-primary" />
              <div>
                <p className="text-[10px] uppercase text-primary/70 font-mono tracking-tighter">Registry Subject</p>
                <p className="text-sm font-bold truncate text-white">{attendee.Name}</p>
              </div>
            </div>
            <div className="p-5 bg-primary/10 border border-primary/20 rounded-xl flex items-center gap-4 backdrop-blur-sm shadow-inner">
              <TicketIcon className="h-6 w-6 text-primary" />
              <div>
                <p className="text-[10px] uppercase text-primary/70 font-mono tracking-tighter">Access Token</p>
                <p className="text-sm font-bold text-white font-mono">{attendee.RegNo}</p>
              </div>
            </div>
            <div className="p-5 bg-primary/10 border border-primary/20 rounded-xl flex items-center gap-4 backdrop-blur-sm shadow-inner">
              <AlertTriangle className="h-6 w-6 text-secondary" />
              <div>
                <p className="text-[10px] uppercase text-secondary/70 font-mono tracking-tighter">Clearance Status</p>
                <p className="text-sm font-bold text-secondary">CLEAR FOR ENTRY</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Branding */}
      <div className="pt-16 pb-12 text-center opacity-40">
        <p className="text-[10px] font-mono text-primary tracking-[0.6em] uppercase">
          &copy; 2026 MadMatrix Cyber-Defense Protocol
        </p>
      </div>
    </div>
  );
}