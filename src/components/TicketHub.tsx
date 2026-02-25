
"use client";

import React, { useState, useRef } from "react";
import { Search, FileDown, Terminal, Loader2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Ticket } from "@/components/Ticket";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
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

    const endpoints = [
      "https://sheetdb.io/api/v1/06ca0hvc7hw5j",
      "https://sheetdb.io/api/v1/06ca0hvc7hw5j?sheet=MOBILE%20GAMES%20%26%20mad%20sports",
      "https://sheetdb.io/api/v1/06ca0hvc7hw5j?sheet=onstage",
      "https://sheetdb.io/api/v1/06ca0hvc7hw5j?sheet=offstage",
      "https://sheetdb.io/api/v1/06ca0hvc7hw5j?sheet=SPORTS%20FORM"
    ];

    try {
      let foundAttendee: Attendee | null = null;

      for (const url of endpoints) {
        try {
          const response = await fetch(url);
          if (!response.ok) continue;
          
          const data = await response.json();

          if (Array.isArray(data)) {
            const foundRow = data.find((row: any) => {
              return Object.values(row).some((value) => {
                return typeof value !== 'undefined' && String(value).trim().toLowerCase() === sanitizedEmail;
              });
            });

            if (foundRow) {
              foundAttendee = {
                Name: foundRow.Name || foundRow.name || foundRow.NAME || foundRow['Name'] || "WELCOME MADMATRIX !",
                RegNo: foundRow.RegNo || foundRow.regno || foundRow.REGNO || foundRow['Reg No'] || "VERIFIED",
                email: sanitizedEmail,
              };
              break;
            }
          }
        } catch (err) {
          console.error(`Error searching in sheet at ${url}:`, err);
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
          description: `Email "${sanitizedEmail}" not found in any of the 5 event registries.`,
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
      // PHASE 1: Asset Decoding & Dimension Validation
      const images = Array.from(ticketRef.current.getElementsByTagName('img'));
      await Promise.all(
        images.map(async (img) => {
          if ('decode' in img) {
            await img.decode().catch(() => {}); 
          }
          // Aggressive dimension polling to prevent InvalidStateError (createPattern on 0-size canvas)
          let attempts = 0;
          while ((img.naturalWidth === 0 || img.naturalHeight === 0) && attempts < 40) {
            await new Promise(resolve => setTimeout(resolve, 50));
            attempts++;
          }
        })
      );

      // Brief settling time for layout engine
      await new Promise(resolve => setTimeout(resolve, 600));

      // PHASE 2: Stabilized Canvas Capture
      const canvas = await html2canvas(ticketRef.current, {
        useCORS: true,
        allowTaint: false,
        scale: 3, // High resolution
        backgroundColor: "#000000",
        logging: false,
        width: 850,
        height: 480,
        onclone: (clonedDoc, element) => {
          // Deep stabilization: Reset all dynamic styles that could interfere with capture
          element.style.transform = "none";
          element.style.transition = "none";
          element.style.display = "flex";
          element.style.visibility = "visible";
          element.style.position = "fixed";
          element.style.top = "0";
          element.style.left = "0";
          element.style.margin = "0";
          element.style.zIndex = "99999";
          element.style.opacity = "1";
          element.style.width = "850px";
          element.style.height = "480px";
          element.style.minWidth = "850px";
          element.style.minHeight = "480px";
          
          const bgContainer = element.querySelector('.absolute.inset-0');
          if (bgContainer instanceof HTMLElement) {
            bgContainer.style.width = "850px";
            bgContainer.style.height = "480px";
          }
        }
      });
      
      // PHASE 3: PDF Generation
      const imgData = canvas.toDataURL("image/png", 1.0);
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [850, 480]
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, 850, 480);
      pdf.save(`MadMatrix_Permit_${attendee?.RegNo || "2026"}.pdf`);
      
      toast({
        title: "Download Successful",
        description: "Your digital permit PDF has been generated.",
      });
    } catch (error) {
      console.error("Capture Error:", error);
      toast({
        title: "Download Failed",
        description: "Rendering error. Please ensure the ticket is fully visible and try again.",
        variant: "destructive",
      });
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4 max-w-6xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-primary">Official Retrieval Portal</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase drop-shadow-[0_0_20px_rgba(255,0,0,0.4)]">
          MadMatrix<span className="text-primary">'26</span>
        </h1>
        <p className="text-muted-foreground font-body text-sm md:text-base max-w-md mx-auto">
          Authorized digital entry permits for SIMATS Engineering national symposium.
        </p>
      </div>

      <Card className="w-full max-w-2xl bg-black/60 border-primary/30 backdrop-blur-xl shadow-[0_0_30px_rgba(255,0,0,0.1)] overflow-hidden cyber-scanline">
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
                  SEARCHING...
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
              <div className="p-2">
                <Ticket
                  ref={ticketRef}
                  id="madmatrix-ticket"
                  name={attendee.Name}
                  regNo={attendee.RegNo}
                />
              </div>
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
                  PREPARING PDF...
                </>
              ) : (
                <>
                  <FileDown className="mr-2 h-6 w-6" />
                  DOWNLOAD PERMIT PDF
                </>
              )}
            </Button>
          </div>
          
          <div className="max-w-md mx-auto p-6 bg-primary/5 border border-primary/20 rounded-xl flex flex-col items-center gap-4 text-center">
            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="text-white font-black uppercase tracking-widest">Registry Match Found</h4>
              <p className="text-xs text-muted-foreground mt-1 font-mono uppercase">Permit {attendee.RegNo} is ready for deployment.</p>
            </div>
          </div>
        </div>
      )}

      <div className="pt-12 pb-8 text-center opacity-30">
        <p className="text-[10px] font-mono text-primary tracking-[0.5em] uppercase">
          &copy; 2026 MadMatrix Defense Protocol | SIMATS Engineering
        </p>
      </div>
    </div>
  );
}
