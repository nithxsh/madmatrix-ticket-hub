
"use client";

import React, { useState, useRef } from "react";
import { Search, Terminal, Loader2, AlertTriangle, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Ticket } from "@/components/Ticket";
import { useToast } from "@/hooks/use-toast";
import { generateCyberpunkGreeting } from "@/ai/flows/generate-cyberpunk-greeting";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface Attendee {
  Name: string;
  RegNo: string;
  email: string;
}

export default function TicketHub() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [attendee, setAttendee] = useState<Attendee | null>(null);
  const [greeting, setGreeting] = useState<string>("");
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
      "https://sheetdb.io/api/v1/06ca0hvc7hw5j?sheet=onstage",
      "https://sheetdb.io/api/v1/06ca0hvc7hw5j?sheet=offstage",
      "https://sheetdb.io/api/v1/06ca0hvc7hw5j?sheet=MOBILE%20GAMES%20%26%20mad%20sports",
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
                Name: foundRow.Name || foundRow.name || foundRow.NAME || "WELCOME MADMATRIX !",
                RegNo: foundRow.RegNo || foundRow.regno || foundRow.REGNO || "VERIFIED",
                email: sanitizedEmail,
              };
              break;
            }
          }
        } catch (err) {
          console.error(`Error searching registry sheet:`, err);
        }
      }

      if (foundAttendee) {
        setAttendee(foundAttendee);
        try {
          const aiResult = await generateCyberpunkGreeting({ attendeeName: foundAttendee.Name });
          setGreeting(aiResult.greeting);
        } catch (error) {
          setGreeting("Authorized entry permit retrieved.");
        }
      } else {
        toast({
          title: "Registry Mismatch",
          description: `Email "${sanitizedEmail}" not found in any event registries.`,
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
    if (!ticketRef.current || !attendee) return;

    setDownloading(true);
    try {
      // 1. Rigorous asset validation to eliminate InvalidStateError
      const images = Array.from(ticketRef.current.querySelectorAll('img'));
      
      const checkImages = () => {
        return Promise.all(images.map(img => {
          return new Promise((resolve) => {
            const isReady = () => img.complete && img.naturalWidth > 0 && img.naturalHeight > 0;
            
            if (isReady()) {
              resolve(true);
            } else {
              img.onload = () => resolve(true);
              img.onerror = () => resolve(true); // Don't block forever if one fails
              // Re-check periodically
              const interval = setInterval(() => {
                if (isReady()) {
                  clearInterval(interval);
                  resolve(true);
                }
              }, 100);
            }
          });
        }));
      };

      await checkImages();
      
      // Additional decoding step for cross-origin stability
      await Promise.all(images.map(img => {
        if ('decode' in img) return (img as any).decode().catch(() => {});
        return Promise.resolve();
      }));

      // 2. Delay for browser layout engine to fully realize the pixel-fixed dimensions
      await new Promise(r => setTimeout(r, 800));

      const canvas = await html2canvas(ticketRef.current, {
        useCORS: true,
        allowTaint: false,
        scale: 3, // High scale for PDF clarity
        backgroundColor: "#000000",
        logging: false,
        width: 850,
        height: 480,
        x: 0,
        y: 0,
        onclone: (clonedDoc) => {
          const clonedTicket = clonedDoc.getElementById("madmatrix-ticket");
          if (clonedTicket) {
            // Force absolute stability on the clone to prevent alignment drifting
            clonedTicket.style.transform = "none";
            clonedTicket.style.position = "fixed";
            clonedTicket.style.top = "0";
            clonedTicket.style.left = "0";
            clonedTicket.style.margin = "0";
            clonedTicket.style.border = "none";
            clonedTicket.style.boxShadow = "none";
          }
        }
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [850, 480]
      });

      pdf.addImage(imgData, "JPEG", 0, 0, 850, 480);
      pdf.save(`MadMatrix_Permit_${attendee.RegNo}.pdf`);

      toast({
        title: "Download Successful",
        description: "Your official entry permit has been saved.",
      });
    } catch (error) {
      console.error("PDF Capture Error:", error);
      toast({
        title: "Download Stability Issue",
        description: "The system encountered a rendering error. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDownloading(false);
    }
  };

  const handleShareWhatsApp = () => {
    if (!attendee) return;
    const text = `I've secured my official digital permit for MadMatrix '26! Authorized entry for ${attendee.Name}. Access yours at: https://www.madmatrix.site/`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4 max-w-6xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-primary">Official Retrieval Portal</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase">
          MadMatrix<span className="text-primary">'26</span>
        </h1>
        <p className="text-muted-foreground font-body text-sm max-w-md mx-auto">
          Authorized digital entry permits for SIMATS Engineering national symposium.
        </p>
      </div>

      <Card className="w-full max-w-2xl bg-black/60 border-primary/30 backdrop-blur-xl shadow-xl overflow-hidden cyber-scanline">
        <CardContent className="p-8">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Terminal className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary opacity-50" />
              <Input
                type="email"
                placeholder="REGISTRY_EMAIL@DOMAIN.COM"
                className="pl-10 h-14 bg-black/40 border-primary/20 text-primary placeholder:text-primary/30 font-mono focus-visible:ring-primary text-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button 
              type="submit" 
              disabled={loading || !email}
              className="h-14 px-10 bg-primary text-white font-bold hover:bg-red-700 transition-all rounded-md shadow-lg disabled:opacity-50 text-sm tracking-widest uppercase flex items-center justify-center"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <Search className="mr-2 h-5 w-5" />
                  ACCESS REGISTRY
                </>
              )}
            </button>
          </form>
        </CardContent>
      </Card>

      {attendee && (
        <div className="w-full space-y-8 animate-in zoom-in-95 duration-700">
          <div className="flex flex-col items-center space-y-8">
            <div className="p-4 bg-white/5 rounded-lg border border-white/10 overflow-x-auto w-full flex justify-center shadow-2xl">
              <div className="p-2">
                <Ticket
                  ref={ticketRef}
                  id="madmatrix-ticket"
                  name={attendee.Name}
                  regNo={attendee.RegNo}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 w-full max-w-2xl">
              <Button
                onClick={handleDownload}
                disabled={downloading}
                className="flex-1 min-w-[200px] h-14 bg-primary text-white font-bold hover:bg-red-700 shadow-lg"
              >
                {downloading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    GENERATING PERMIT...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-5 w-5" />
                    DOWNLOAD PDF PERMIT
                  </>
                )}
              </Button>
              <Button
                onClick={handleShareWhatsApp}
                className="flex-1 min-w-[200px] h-14 bg-[#25D366] text-white font-bold hover:bg-[#128C7E] shadow-lg"
              >
                <Share2 className="mr-2 h-5 w-5" />
                SHARE STATUS
              </Button>
            </div>
          </div>
          
          {greeting && (
            <div className="max-w-md mx-auto p-6 bg-primary/5 border border-primary/20 rounded-xl flex flex-col items-center gap-4 text-center">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="text-white font-black uppercase tracking-widest">Registry Match Found</h4>
                <p className="text-xs text-muted-foreground mt-1 font-mono uppercase italic">{greeting}</p>
              </div>
            </div>
          )}
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
