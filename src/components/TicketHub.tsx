
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
                Name: foundRow.Name || foundRow.name || foundRow.NAME || foundRow['Name'] || "WELCOME MADMATRIX !",
                RegNo: foundRow.RegNo || foundRow.regno || foundRow.REGNO || foundRow['Reg No'] || "VERIFIED",
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
    if (!ticketRef.current || !attendee) return;

    setDownloading(true);
    try {
      // Ensure all images are loaded and have dimensions before capture
      const images = ticketRef.current.querySelectorAll('img');
      await Promise.all(Array.from(images).map(img => {
        if (img.complete && img.naturalWidth > 0) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      }));

      // Extra stabilization delay
      await new Promise(r => setTimeout(r, 500));

      const canvas = await html2canvas(ticketRef.current, {
        useCORS: true,
        allowTaint: false,
        scale: 2,
        backgroundColor: "#000000",
        logging: false,
        onclone: (clonedDoc) => {
          const clonedTicket = clonedDoc.getElementById("madmatrix-ticket");
          if (clonedTicket) {
            clonedTicket.style.transform = "none";
            clonedTicket.style.position = "static";
          }
        }
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width / 2, canvas.height / 2]
      });

      pdf.addImage(imgData, "JPEG", 0, 0, canvas.width / 2, canvas.height / 2);
      pdf.save(`MadMatrix_Ticket_${attendee.RegNo}.pdf`);

      toast({
        title: "Download Successful",
        description: "Your digital entry permit has been saved as a PDF.",
      });
    } catch (error) {
      console.error("Capture Error:", error);
      toast({
        title: "Download Error",
        description: "A system error occurred during ticket generation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDownloading(false);
    }
  };

  const handleShareWhatsApp = () => {
    if (!attendee) return;
    const text = `I've secured my digital permit for MadMatrix '26! Check yours at: https://www.madmatrix.site/`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
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
        <div className="w-full space-y-8 animate-in zoom-in-95 duration-700">
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

            {/* Action Buttons Below Ticket */}
            <div className="flex flex-wrap items-center justify-center gap-4 w-full max-w-2xl">
              <Button
                onClick={handleDownload}
                disabled={downloading}
                className="flex-1 min-w-[200px] h-14 bg-primary text-white font-bold hover:bg-red-700 transition-all shadow-[0_0_20px_rgba(255,0,0,0.3)]"
              >
                {downloading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    GENERATING PDF...
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
                className="flex-1 min-w-[200px] h-14 bg-[#25D366] text-white font-bold hover:bg-[#128C7E] transition-all shadow-[0_0_20px_rgba(37,211,102,0.3)]"
              >
                <Share2 className="mr-2 h-5 w-5" />
                SHARE ON WHATSAPP
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
                <p className="text-xs text-muted-foreground mt-1 font-mono uppercase">{greeting}</p>
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
