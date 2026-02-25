
"use client";

import React, { useState, useRef } from "react";
import { Search, Download, Terminal, Loader2, AlertTriangle } from "lucide-react";
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

    // Updated API endpoints with correct URL encoding for spaces and special characters
    const endpoints = [
      "https://sheetdb.io/api/v1/06ca0hvc7hw5j",
      "https://sheetdb.io/api/v1/06ca0hvc7hw5j?sheet=MOBILE%20GAMES%20%26%20mad%20sports",
      "https://sheetdb.io/api/v1/06ca0hvc7hw5j?sheet=OFF%20STAGE",
      "https://sheetdb.io/api/v1/06ca0hvc7hw5j?sheet=ON%20STAGE",
      "https://sheetdb.io/api/v1/06ca0hvc7hw5j?sheet=SPORTS%20FORM"
    ];

    try {
      let foundAttendee: Attendee | null = null;

      // Iterate through endpoints until a match is found
      for (const url of endpoints) {
        try {
          const response = await fetch(url);
          const data = await response.json();

          if (Array.isArray(data)) {
            // Robust search: Check every value in every row for a match with the email
            const foundRow = data.find((row: any) => {
              return Object.values(row).some((value) => {
                return typeof value === 'string' && value.trim().toLowerCase() === sanitizedEmail;
              });
            });

            if (foundRow) {
              foundAttendee = {
                // Use a fallback if the name or regNo columns have different titles in different sheets
                Name: foundRow.Name || foundRow.name || foundRow.NAME || foundRow['Name'] || "WELCOME MADMATRIX !",
                RegNo: foundRow.RegNo || foundRow.regno || foundRow.REGNO || foundRow['Reg No'] || foundRow['RegNo'] || "VERIFIED",
                email: sanitizedEmail,
              };
              break; // Stop searching if found
            }
          }
        } catch (err) {
          console.error(`Error searching in ${url}:`, err);
        }
      }

      if (foundAttendee) {
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
          description: `Email "${sanitizedEmail}" not found in any registry. Please check your credentials.`,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Registry Offline",
        description: "Could not connect to database services.",
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
      // Small delay to ensure rendering is complete
      await new Promise(resolve => setTimeout(resolve, 300));

      const canvas = await html2canvas(ticketRef.current, {
        useCORS: true,
        scale: 3, // High quality but balanced for file size
        backgroundColor: "#050000",
        logging: false,
        width: 800,
        height: 380,
      });
      
      const link = document.createElement("a");
      link.download = `MadMatrix_Permit_${attendee?.RegNo || "2026"}.png`;
      link.href = canvas.toDataURL("image/png", 1.0);
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
