
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
      // Fetching all data to handle case-insensitive headers and values more reliably
      const apiUrl = `https://sheetdb.io/api/v1/m4xm36b3182sq`;
      
      const response = await fetch(apiUrl);
      const data = await response.json();

      // Debug log: Critical for seeing exactly what headers are in your Excel sheet
      console.log("Registry Data Received:", data);

      if (Array.isArray(data) && data.length > 0) {
        // Attempt to find the attendee by checking any column that looks like 'email'
        const foundRow = data.find((row: any) => {
          return Object.entries(row).some(([key, value]) => {
            const isEmailKey = key.toLowerCase().includes('email');
            const isEmailValue = typeof value === 'string' && value.trim().toLowerCase() === sanitizedEmail;
            return isEmailKey && isEmailValue;
          });
        });

        if (foundRow) {
          // Normalize the data based on common header names
          const foundAttendee: Attendee = {
            Name: foundRow.Name || foundRow.name || foundRow.NAME || "Authorized Personnel",
            RegNo: foundRow.RegNo || foundRow.regno || foundRow.REGNO || foundRow['Reg No'] || "VERIFIED",
            email: sanitizedEmail,
          };
          
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
            description: `Email "${sanitizedEmail}" not found in our database. Please verify your registration.`,
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Access Denied",
          description: "The central registry is currently empty or inaccessible.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      toast({
        title: "Network Failure",
        description: "Could not connect to the central registry. Check your uplink.",
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
