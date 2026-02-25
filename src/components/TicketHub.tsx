"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, Terminal, Loader2, Download, Share2, UserCheck, ShieldCheck, Phone, Globe, User, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Ticket } from "@/components/Ticket";
import { useToast } from "@/hooks/use-toast";
import { generateCyberpunkGreeting } from "@/ai/flows/generate-cyberpunk-greeting";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface Attendee {
  Name: string;
  RegNo: string;
  email: string;
  Dept: string;
}

const DecryptText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState("");
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

  useEffect(() => {
    let iteration = 0;
    let interval: NodeJS.Timeout;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (index < iteration) {
                return text[index];
              }
              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3;
      }, 30);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, delay]);

  return <span className="font-mono">{displayText}</span>;
};

const MatrixTerminalFooter = () => {
  return (
    <footer className="w-full max-w-4xl mx-auto pt-12 pb-12 border-t border-primary/20 mt-20">
      <div className="bg-black/80 border border-primary/30 p-8 rounded-lg cyber-scanline shadow-[0_0_30px_rgba(255,0,0,0.1)]">
        <div className="flex items-center gap-3 mb-6 text-primary">
          <Terminal className="h-5 w-5 animate-pulse" />
          <span className="font-mono text-sm tracking-tighter uppercase">[SYSTEM_DECRYPTION_ACTIVE]</span>
        </div>

        <div className="space-y-6 font-mono text-xs md:text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-primary/60"><span className="text-primary">[SYMPOSIUM_ID]:</span> <DecryptText text="MADMATRIX_2026" delay={200} /></p>
              <p className="text-primary/60 leading-relaxed">
                <span className="text-primary">[CONDUCTED_BY]:</span> <br />
                <DecryptText text="DEPT_OF_PURE_AND_APPLIED_MATHEMATICS // SIMATS_ENGINEERING" delay={400} />
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-primary/60 leading-relaxed italic">
                <span className="text-primary">[MISSION_LOG]:</span> <br />
                <DecryptText text="A flagship National Level Technical Symposium engineered to bridge the gap between theoretical mathematics and high-speed innovation." delay={600} />
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-primary/10">
            <div className="flex items-center gap-2 mb-4 text-primary">
              <Cpu className="h-4 w-4" />
              <span className="uppercase tracking-widest text-[10px]">Coordination Command Center</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col space-y-1">
                <span className="text-[10px] text-primary/40 uppercase">System Admin</span>
                <div className="flex items-center gap-2 text-white">
                  <User className="h-3 w-3 text-primary" />
                  <span className="font-bold tracking-wider underline decoration-primary/30">NITHISHWARAN</span>
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <span className="text-[10px] text-primary/40 uppercase">Uplink Path</span>
                <a 
                  href="tel:+918754330333" 
                  className="group flex items-center justify-between px-4 py-2 border border-primary/20 bg-primary/5 hover:bg-primary/20 transition-all rounded cyber-glitch"
                >
                  <div className="flex items-center gap-2">
                    <Phone className="h-3 w-3 text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold text-white">+91 87543 30333</span>
                  </div>
                </a>
              </div>

              <div className="flex flex-col space-y-2">
                <span className="text-[10px] text-primary/40 uppercase">Digital Node</span>
                <a 
                  href="https://www.madmatrix.site" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between px-4 py-2 border border-primary/20 bg-primary/5 hover:bg-primary/20 transition-all rounded cyber-glitch"
                >
                  <div className="flex items-center gap-2">
                    <Globe className="h-3 w-3 text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold text-white">WWW.MADMATRIX.SITE</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center border-t border-primary/5 pt-4">
          <p className="text-[9px] font-mono text-primary/30 tracking-[0.5em] uppercase">
            &copy; 2026_ESTABLISHMENT_NODE // MAD_MATRIX_ROOT
          </p>
        </div>
      </div>
    </footer>
  );
};

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
      
      const images = Array.from(ticketRef.current.querySelectorAll('img'));
      await Promise.all(images.map(img => {
        return new Promise((resolve) => {
          if (img.complete) resolve(true);
          else {
            img.onload = () => resolve(true);
            img.onerror = () => resolve(true);
          }
        }).then(() => {
          if ('decode' in img) return (img as any).decode().catch(() => {});
          return Promise.resolve();
        });
      }));

      await new Promise(r => setTimeout(r, 600));

      const canvas = await html2canvas(ticketRef.current, {
        useCORS: true,
        scale: 3, 
        backgroundColor: "#000000",
        width: 1000,
        height: 400,
        windowWidth: 1000,
        logging: false,
        letterRendering: true,
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [1000, 400]
      });

      pdf.addImage(imgData, "JPEG", 0, 0, 1000, 400);
      pdf.save(`MadMatrix_Permit_${attendee.RegNo}.pdf`);

      toast({
        title: "Permit Generated",
        description: "Official entry document saved to your device.",
      });
    } catch (error) {
      toast({
        title: "Download Interrupted",
        description: "Layout stabilization failed. Please try again.",
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

      {step === 2 && attendee && (
        <div className="w-full space-y-12 animate-in slide-in-from-bottom-8 duration-700">
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

          <div className="w-full flex flex-col items-center space-y-8">
            <div className="p-6 bg-white/5 rounded-xl border border-white/10 overflow-x-auto w-full flex justify-center shadow-2xl backdrop-blur-sm">
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
                className="flex-1 min-w-[200px] h-14 bg-primary text-white font-bold hover:bg-red-700 shadow-lg uppercase tracking-widest text-xs"
              >
                {downloading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" />RENDERING_ASSETS...</> : <><Download className="mr-2 h-5 w-5" />DOWNLOAD HD TICKET (SCALE_3X)</>}
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
          
          <MatrixTerminalFooter />
        </div>
      )}
    </div>
  );
}