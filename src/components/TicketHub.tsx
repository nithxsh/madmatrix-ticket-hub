
"use client";

import React, { useState, useRef } from "react";
import { Search, Terminal, Loader2, Download, Share2, UserCheck, ShieldCheck, MapPin, Calendar, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ticket } from "@/components/Ticket";
import { useToast } from "@/hooks/use-toast";
import { generateCyberpunkGreeting } from "@/ai/flows/generate-cyberpunk-greeting";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface Attendee {
  Name: string;
  RegNo: string;
  email: string;
  Dept: string;
}

export default function TicketHub() {
  const [step, setStep] = useState<1 | 2>(1);
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
        const response = await fetch(url);
        if (!response.ok) continue;
        const data = await response.json();
        if (Array.isArray(data)) {
          const foundRow = data.find((row: any) => {
            return Object.values(row).some(v => v && String(v).trim().toLowerCase() === sanitizedEmail);
          });
          if (foundRow) {
            foundAttendee = {
              Name: foundRow.Name || foundRow.name || foundRow.NAME || "VALID_ATTENDEE",
              RegNo: foundRow.RegNo || foundRow.regno || foundRow.REGNO || "VERIFIED_USER",
              email: sanitizedEmail,
              Dept: foundRow.Department || foundRow.dept || foundRow.DEPT || "SIMATS ENGINEERING",
            };
            break;
          }
        }
      }

      if (foundAttendee) {
        setAttendee(foundAttendee);
        setStep(2);
        try {
          const aiResult = await generateCyberpunkGreeting({ attendeeName: foundAttendee.Name });
          setGreeting(aiResult.greeting);
        } catch (error) {
          setGreeting("Authorized entry permit retrieved. Welcome to the Matrix.");
        }
      } else {
        toast({
          title: "Registry Mismatch",
          description: `Email "${sanitizedEmail}" not found in registries.`,
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
      await document.fonts.ready;
      await document.fonts.load('900 32px Inter');

      const images = Array.from(ticketRef.current.querySelectorAll('img'));
      await Promise.all(images.map(img => {
        return new Promise((resolve) => {
          if (img.complete && img.naturalWidth > 0) resolve(true);
          else {
            img.onload = () => resolve(true);
            img.onerror = () => resolve(true);
          }
        }).then(() => {
          if ('decode' in img) return (img as any).decode().catch(() => {});
          return Promise.resolve();
        });
      }));

      // High-precision stabilization buffer
      await new Promise(r => setTimeout(r, 600));

      const canvas = await html2canvas(ticketRef.current, {
        useCORS: true,
        scale: 3, 
        backgroundColor: "#000000",
        width: 850,
        height: 330,
        logging: false,
        letterRendering: true,
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [850, 330]
      });

      pdf.addImage(imgData, "JPEG", 0, 0, 850, 330);
      pdf.save(`MadMatrix_Permit_${attendee.RegNo}.pdf`);

      toast({
        title: "Permit Generated",
        description: "Official entry document saved to your device.",
      });
    } catch (error) {
      toast({
        title: "Download Interrupted",
        description: "Rendering timeout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDownloading(false);
    }
  };

  const handleShareWhatsApp = () => {
    if (!attendee) return;
    const text = `I've secured my official permit for MadMatrix '26! Authorized entry for ${attendee.Name}. Retrieve yours at: https://www.madmatrix.site/`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const resetPortal = () => {
    setStep(1);
    setEmail("");
    setAttendee(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] p-4 max-w-6xl mx-auto space-y-12">
      {/* Stage 1: Email Entry */}
      {step === 1 && (
        <div className="w-full flex flex-col items-center space-y-8 animate-in fade-in zoom-in duration-500">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-primary">Authorized Retrieval Portal</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase">
              MadMatrix<span className="text-primary">'26</span>
            </h1>
            <p className="text-muted-foreground font-body text-sm max-w-md mx-auto">
              Authorized portal for digital entry permits. Please enter your registered email.
            </p>
          </div>

          <Card className="w-full max-w-2xl bg-black/60 border-primary/30 backdrop-blur-xl shadow-xl overflow-hidden cyber-scanline">
            <CardContent className="p-8">
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Terminal className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary opacity-50" />
                  <Input
                    type="email"
                    placeholder="REGISTERED_EMAIL_ID"
                    className="pl-10 h-14 bg-black/40 border-primary/20 text-primary placeholder:text-primary/30 font-mono focus-visible:ring-primary text-lg uppercase"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={loading || !email}
                  className="h-14 px-10 bg-primary text-white font-bold hover:bg-red-700 transition-all rounded-md shadow-lg disabled:opacity-50 text-sm tracking-widest uppercase flex items-center justify-center"
                >
                  {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Search className="mr-2 h-5 w-5" />VERIFY_ACCESS</>}
                </button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Stage 2-5: Results & Footer */}
      {step === 2 && attendee && (
        <div className="w-full space-y-12 animate-in slide-in-from-bottom-8 duration-700">
          {/* Stage 2: Data Preview Table */}
          <div className="max-w-4xl mx-auto w-full space-y-6">
            <div className="flex items-center gap-4 text-primary mb-2">
              <ShieldCheck className="h-6 w-6" />
              <h2 className="text-2xl font-black uppercase tracking-tighter">Credential Verification</h2>
            </div>
            <Card className="bg-black/40 border-primary/20 backdrop-blur-lg overflow-hidden">
              <Table>
                <TableBody>
                  <TableRow className="border-primary/10 hover:bg-white/5">
                    <TableCell className="font-mono text-primary/60 text-xs w-1/3">ATTENDEE_NAME</TableCell>
                    <TableCell className="font-black text-white uppercase">{attendee.Name}</TableCell>
                  </TableRow>
                  <TableRow className="border-primary/10 hover:bg-white/5">
                    <TableCell className="font-mono text-primary/60 text-xs">REGISTER_NUMBER</TableCell>
                    <TableCell className="font-bold text-white/90">{attendee.RegNo}</TableCell>
                  </TableRow>
                  <TableRow className="border-primary/10 hover:bg-white/5">
                    <TableCell className="font-mono text-primary/60 text-xs">DEPARTMENT</TableCell>
                    <TableCell className="font-bold text-primary">{attendee.Dept}</TableCell>
                  </TableRow>
                  <TableRow className="border-transparent hover:bg-white/5">
                    <TableCell className="font-mono text-primary/60 text-xs">STATUS</TableCell>
                    <TableCell className="text-green-500 font-bold flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                      AUTHORIZED_ENTRY
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </div>

          {/* Stage 3: Ticket Generation */}
          <div className="w-full flex flex-col items-center space-y-8">
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

            {/* Stage 4: Download Action */}
            <div className="flex flex-wrap items-center justify-center gap-4 w-full max-w-2xl">
              <Button
                onClick={handleDownload}
                disabled={downloading}
                className="flex-1 min-w-[200px] h-14 bg-primary text-white font-bold hover:bg-red-700 shadow-lg uppercase tracking-widest text-xs"
              >
                {downloading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" />RENDERING_HD_ASSETS...</> : <><Download className="mr-2 h-5 w-5" />DOWNLOAD TICKET (SCALE_3X)</>}
              </Button>
              <Button
                onClick={handleShareWhatsApp}
                className="flex-1 min-w-[200px] h-14 bg-[#25D366] text-white font-bold hover:bg-[#128C7E] shadow-lg uppercase tracking-widest text-xs"
              >
                <Share2 className="mr-2 h-5 w-5" />WHATSAPP SHARE
              </Button>
              <Button
                variant="outline"
                onClick={resetPortal}
                className="w-full h-12 border-primary/20 text-primary/60 hover:text-primary hover:border-primary/40 uppercase tracking-widest text-[10px]"
              >
                Return to Search
              </Button>
            </div>

            {greeting && (
              <div className="max-w-md mx-auto p-6 bg-primary/5 border border-primary/20 rounded-xl flex flex-col items-center gap-4 text-center">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <UserCheck className="h-5 w-5 text-primary" />
                </div>
                <p className="text-[10px] text-muted-foreground font-mono uppercase italic leading-relaxed">{greeting}</p>
              </div>
            )}
          </div>

          {/* Stage 5: Footer Info */}
          <footer className="w-full max-w-4xl mx-auto pt-12 border-t border-primary/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-muted-foreground">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-white">
                  <Info className="h-4 w-4 text-primary" />
                  <h3 className="font-black uppercase tracking-widest text-sm">About MadMatrix '26</h3>
                </div>
                <p className="text-xs leading-relaxed">
                  MadMatrix is a National Level Technical Symposium conducted annually by the 
                  <span className="text-white"> Department of Pure and Applied Mathematics </span> 
                  at SIMATS Engineering. It serves as a flagship platform for innovative minds to 
                  compete and showcase technical prowess.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-white">
                  <MapPin className="h-4 w-4 text-primary" />
                  <h3 className="font-black uppercase tracking-widest text-sm">Coordination Control</h3>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span>Student Coordinator</span>
                    <span className="text-white font-bold">Nithishwaran</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Direct Uplink</span>
                    <span className="text-primary font-bold">+91 87543 30333</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Digital Node</span>
                    <a href="https://www.madmatrix.site" className="text-primary hover:underline font-mono">www.madmatrix.site</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 text-center opacity-30">
              <p className="text-[9px] font-mono text-primary tracking-[0.4em] uppercase">
                &copy; 2026 MADMATRIX SYMPOSIUM | SIMATS ENGINEERING CAMPUS
              </p>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}

