"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, Terminal, Loader2, Download, Share2, UserCheck, ShieldCheck, Phone, Globe, User, Cpu, Activity, Zap, ShieldAlert, Mail, MessageSquare, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Ticket } from "@/components/Ticket";
import { useToast } from "@/hooks/use-toast";
import { generateCyberpunkGreeting } from "@/ai/flows/generate-cyberpunk-greeting";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface Attendee {
  Name: string;
  RegNo: string;
  email: string;
  Dept: string;
  Event?: string;
  Status?: string;
}

const DecryptText = ({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) => {
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

  return <span className={cn("font-mono", className)}>{displayText}</span>;
};

const MatrixTerminalFooter = () => {
  const coordinators = [
    { name: "Dhanush R", phone: "9025718226" },
    { name: "Kevin Mathew", phone: "8610871590" },
    { name: "Infant A", phone: "7548855208" },
    { name: "Prasithi Kumaran", phone: "8248372122" },
    { name: "Vivaa", phone: "9363315750" },
    { name: "K L Dinesh Eswar", phone: "7200295986" },
    { name: "Sugantharaj", phone: "9150184324" }
  ];

  return (
    <footer className="w-full max-w-5xl mx-auto pt-12 pb-24 space-y-12">
      {/* System Admin Registry */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 text-primary">
          <ShieldCheck className="h-5 w-5 animate-pulse" />
          <span className="font-mono text-sm tracking-widest uppercase">[SYSTEM_ADMIN_REGISTRY]</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {coordinators.map((coord, idx) => (
            <div key={idx} className="group relative bg-black/40 border border-primary/20 p-4 rounded-lg backdrop-blur-md hover:border-primary/50 transition-all overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              <p className="text-[10px] font-mono text-primary/40 uppercase mb-1">NODE_{idx + 1}</p>
              <h4 className="text-white font-bold uppercase tracking-tight group-hover:cyber-glitch">{coord.name}</h4>
              <a 
                href={`tel:+91${coord.phone}`} 
                className="inline-flex items-center gap-2 text-primary/60 font-mono text-xs mt-3 group-hover:text-primary transition-colors border border-primary/20 px-2 py-1 rounded hover:bg-primary/10"
              >
                <Phone className="h-3 w-3" /> UPLINK: {coord.phone}
              </a>
            </div>
          ))}
          <div className="group relative bg-primary/10 border-2 border-primary/40 p-4 rounded-lg backdrop-blur-md">
             <p className="text-[10px] font-mono text-primary uppercase mb-1">FACULTY_CONVENOR</p>
             <h4 className="text-white font-bold uppercase tracking-tight">Dr. K. Sudar Mozhi</h4>
             <a 
              href="tel:+919080730749" 
              className="inline-flex items-center gap-2 text-primary font-mono text-xs mt-3 border border-primary/40 px-2 py-1 rounded hover:bg-primary/20 transition-all"
             >
              <Phone className="h-3 w-3" /> UPLINK: 9080730749
             </a>
          </div>
        </div>
      </div>

      {/* Support & Inquiry Terminal */}
      <div className="bg-black/80 border border-primary/30 p-8 rounded-lg cyber-scanline relative overflow-hidden shadow-[0_0_50px_rgba(255,0,0,0.1)]">
        <div className="flex items-center gap-3 mb-8 text-primary">
          <Terminal className="h-5 w-5 animate-pulse" />
          <span className="font-mono text-sm tracking-tighter uppercase">[SUPPORT_&_INQUIRY_TERMINAL]</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-xs md:text-sm">
          <div className="space-y-4">
            <a 
              href="mailto:support@madmatrix.site" 
              className="flex items-start gap-4 p-4 bg-white/5 rounded border border-white/5 hover:border-primary/20 transition-all cursor-pointer group"
            >
              <Mail className="h-5 w-5 text-primary shrink-0 group-hover:scale-110 transition-transform" />
              <div>
                <p className="text-primary uppercase text-[10px] font-bold mb-1">HELP_DESK</p>
                <p className="text-white">support@madmatrix.site</p>
              </div>
            </a>
            <a 
              href="mailto:organizer@madmatrix.site" 
              className="flex items-start gap-4 p-4 bg-white/5 rounded border border-white/5 hover:border-primary/20 transition-all cursor-pointer group"
            >
              <MessageSquare className="h-5 w-5 text-primary shrink-0 group-hover:scale-110 transition-transform" />
              <div>
                <p className="text-primary uppercase text-[10px] font-bold mb-1">SPONSOR_ENQUIRY</p>
                <p className="text-white">organizer@madmatrix.site</p>
              </div>
            </a>
          </div>
          <div className="space-y-4">
            <a 
              href="mailto:madmatrix2026@gmail.com" 
              className="flex items-start gap-4 p-4 bg-white/5 rounded border border-white/5 hover:border-primary/20 transition-all cursor-pointer group"
            >
              <Cpu className="h-5 w-5 text-primary shrink-0 group-hover:scale-110 transition-transform" />
              <div>
                <p className="text-primary uppercase text-[10px] font-bold mb-1">PRIMARY_NODE</p>
                <p className="text-white">madmatrix2026@gmail.com</p>
              </div>
            </a>
            <a 
              href="https://www.madmatrix.site" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-start gap-4 p-4 bg-white/5 rounded border border-white/5 hover:border-primary/20 transition-all cursor-pointer group"
            >
              <Globe className="h-5 w-5 text-primary shrink-0 group-hover:scale-110 transition-transform" />
              <div>
                <p className="text-primary uppercase text-[10px] font-bold mb-1">OFFICIAL_UPLINK</p>
                <span className="text-white hover:text-primary transition-colors underline underline-offset-4">www.madmatrix.site</span>
              </div>
            </a>
          </div>
        </div>

        <div className="mt-12 text-center border-t border-primary/10 pt-6">
          <p className="text-[9px] font-mono text-primary/30 tracking-[1em] uppercase">
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
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isDecypting, setIsDecrypting] = useState(false);
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
    setLoadingProgress(0);
    setAttendee(null);
    setGreeting("");

    let foundAttendee: Attendee | null = null;

    const endpoints = [
      { url: "https://sheetdb.io/api/v1/06ca0hvc7hw5j", name: "MAIN VAULT" },
      { url: "https://sheetdb.io/api/v1/06ca0hvc7hw5j?sheet=onstage", name: "ONSTAGE EVENTS" },
      { url: "https://sheetdb.io/api/v1/06ca0hvc7hw5j?sheet=offstage", name: "OFFSTAGE EVENTS" },
      { url: "https://sheetdb.io/api/v1/06ca0hvc7hw5j?sheet=MOBILE%20GAMES%20%26%20mad%20sports", name: "MOBILE GAMES" },
      { url: "https://sheetdb.io/api/v1/06ca0hvc7hw5j?sheet=SPORTS%20FORM", name: "SPORTS FORM" }
    ];

    try {
      for (let i = 0; i < endpoints.length; i++) {
        setLoadingProgress(Math.floor((i / endpoints.length) * 100));
        const response = await fetch(endpoints[i].url);
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
              Event: endpoints[i].name,
              Status: "AUTHORIZED_ENTRY"
            };
            break;
          }
        }
      }

      if (foundAttendee) {
        setLoadingProgress(100);
        setIsDecrypting(true);
        setTimeout(async () => {
          setAttendee(foundAttendee);
          setStep(2);
          setIsDecrypting(false);
          setLoading(false);
          try {
            const aiResult = await generateCyberpunkGreeting({ attendeeName: foundAttendee!.Name });
            setGreeting(aiResult.greeting);
          } catch (error) {
            setGreeting("Access permit retrieved. Welcome to the Matrix.");
          }
        }, 1500);
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
      if (!foundAttendee) setLoading(false);
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
          if (img.complete && img.naturalWidth > 0) resolve(true);
          else {
            img.onload = () => resolve(true);
            img.onerror = () => resolve(true);
          }
        });
      }));

      await new Promise(r => setTimeout(r, 600));

      const canvas = await html2canvas(ticketRef.current, {
        useCORS: true,
        scale: 3, 
        backgroundColor: "#000000",
        width: 1000,
        height: 400,
        windowWidth: 1200,
        logging: true,
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
    setLoading(false);
    setLoadingProgress(0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] p-4 max-w-6xl mx-auto space-y-12">
      {/* Help Uplink FAB */}
      <div className="fixed bottom-6 right-6 z-[100] group">
        <div className="absolute -top-12 right-0 bg-primary/90 text-white text-[10px] px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity font-mono whitespace-nowrap">
          [SYSTEM_ADMIN]: NITHISHWARAN
        </div>
        <a 
          href="tel:+918754330333"
          className="h-14 w-14 bg-primary flex items-center justify-center rounded-full shadow-[0_0_20px_rgba(255,0,0,0.5)] hover:scale-110 transition-transform active:scale-95 border border-white/20"
        >
          <Phone className="h-6 w-6 text-white" />
        </a>
      </div>

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
              Secure access portal for digital permits. Verification via registered encryption node required.
            </p>
          </div>

          <Card className="w-full max-w-2xl bg-black/60 border-primary/30 backdrop-blur-xl shadow-xl overflow-hidden cyber-scanline">
            <CardContent className="p-8">
              {!loading ? (
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
                    disabled={!email}
                    className="h-14 px-10 bg-primary text-white font-bold hover:bg-red-700 transition-all rounded-md shadow-lg disabled:opacity-50 text-sm tracking-widest uppercase flex items-center justify-center"
                  >
                    <Search className="mr-2 h-5 w-5" />VERIFY_ACCESS
                  </button>
                </form>
              ) : (
                <div className="space-y-6 py-4">
                  <div className="flex justify-between items-center text-xs font-mono text-primary/80 uppercase">
                    <span>[RETRIVING_DATA_FROM_EXCEL_DATABASE...]</span>
                    <span>{loadingProgress}%</span>
                  </div>
                  <Progress value={loadingProgress} className="h-2 bg-primary/10" />
                  {isDecypting && (
                    <div className="flex items-center justify-center gap-2 text-green-500 font-mono text-sm animate-pulse">
                      <ShieldCheck className="h-4 w-4" />
                      [ACCESS_GRANTED]
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {step === 2 && attendee && (
        <div className="w-full space-y-12 animate-in slide-in-from-bottom-8 duration-700">
          {/* Identity Node Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto w-full">
            <Card className="bg-white/5 border-primary/30 backdrop-blur-xl hover:bg-white/10 transition-all group overflow-hidden relative cyber-scanline shadow-[0_0_20px_rgba(255,0,0,0.1)]">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-primary/60 font-mono text-[10px] mb-4 uppercase tracking-widest">
                  <User className="h-3 w-3" /> [IDENTITY]
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-white uppercase tracking-tighter cyber-glitch">
                    <DecryptText text={attendee.Name} delay={100} />
                  </h3>
                  <p className="text-[10px] text-primary/60 font-mono uppercase">{attendee.RegNo}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-primary/30 backdrop-blur-xl hover:bg-white/10 transition-all group overflow-hidden relative shadow-[0_0_20px_rgba(255,0,0,0.1)]">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-blue-500/60 font-mono text-[10px] mb-4 uppercase tracking-widest">
                  <Zap className="h-3 w-3" /> [ASSIGNED_EVENT]
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-white uppercase tracking-tighter">
                    {attendee.Event || "MAIN SYMPOSIUM"}
                  </h3>
                  <p className="text-[10px] text-blue-500/60 font-mono uppercase">{attendee.Dept}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-primary/30 backdrop-blur-xl hover:bg-white/10 transition-all group overflow-hidden relative shadow-[0_0_20px_rgba(255,0,0,0.1)]">
              <div className="absolute top-0 left-0 w-1 h-full bg-green-500" />
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-green-500/60 font-mono text-[10px] mb-4 uppercase tracking-widest">
                  <ShieldCheck className="h-3 w-3" /> [CLEARANCE]
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]" />
                    <h3 className="text-xl font-black text-white uppercase tracking-tighter">
                      {attendee.Status}
                    </h3>
                  </div>
                  <p className="text-[10px] text-green-500/60 font-mono uppercase">VERIFIED_CREDENTIALS</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ticket Section */}
          <div className="w-full flex flex-col items-center space-y-12 pt-8">
            <div className="p-8 bg-white/5 rounded-2xl border border-white/10 overflow-x-auto w-full flex justify-center shadow-2xl backdrop-blur-md relative">
              <div className="absolute top-4 left-4 flex items-center gap-2 text-[8px] font-mono text-primary/40 uppercase">
                <ShieldAlert className="h-2 w-2 animate-pulse" /> LIVE_PREVIEW_MODE
              </div>
              <div className="p-4 bg-black/40 rounded-lg">
                <Ticket
                  ref={ticketRef}
                  id="madmatrix-ticket"
                  name={attendee.Name}
                  regNo={attendee.RegNo}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 w-full max-w-3xl">
              <Button
                onClick={handleDownload}
                disabled={downloading}
                className="flex-1 min-w-[220px] h-16 bg-primary text-white font-black hover:bg-red-700 shadow-[0_0_20px_rgba(255,0,0,0.3)] uppercase tracking-[0.2em] text-xs transition-all active:scale-95"
              >
                {downloading ? (
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" />RENDERING_ASSETS_3X...</>
                ) : (
                  <><Download className="mr-2 h-5 w-5" />DOWNLOAD HD_PERMIT</>
                )}
              </Button>
              <Button
                onClick={handleShareWhatsApp}
                className="flex-1 min-w-[220px] h-16 bg-[#25D366] text-white font-black hover:bg-[#128C7E] shadow-[0_0_20px_rgba(37,211,102,0.3)] uppercase tracking-[0.2em] text-xs transition-all active:scale-95"
              >
                <Share2 className="mr-2 h-5 w-5" />UPLINK_TO_WHATSAPP
              </Button>
              <Button
                variant="outline"
                onClick={resetPortal}
                className="w-full h-12 border-primary/20 text-primary/60 hover:text-primary hover:border-primary/40 hover:bg-primary/5 uppercase tracking-[0.4em] text-[10px] font-mono"
              >
                [RESET_SYSTEM_NODE]
              </Button>
            </div>

            {greeting && (
              <div className="max-w-2xl mx-auto p-8 bg-primary/5 border border-primary/20 rounded-2xl flex flex-col items-center gap-6 text-center relative cyber-scanline shadow-[0_0_30px_rgba(255,0,0,0.05)]">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center border border-primary/40">
                  <UserCheck className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] text-primary/40 font-mono uppercase tracking-[0.3em]">AI_PERSONALIZED_GREETING</p>
                  <p className="text-xs md:text-sm text-muted-foreground font-mono leading-relaxed italic">
                    "{greeting}"
                  </p>
                </div>
              </div>
            )}
          </div>
          
          <MatrixTerminalFooter />
        </div>
      )}
    </div>
  );
}
