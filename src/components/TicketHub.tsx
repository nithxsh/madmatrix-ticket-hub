"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, Terminal, Loader2, Download, Share2, UserCheck, ShieldCheck, Phone, Globe, User, Cpu, Activity, Zap, Mail, MessageSquare, ChevronRight, ChevronLeft, LayoutDashboard, Database, ShieldAlert, Rocket } from "lucide-react";
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
import { Slider } from "@/components/ui/slider";

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

const PersistentSupportMenu = () => {
  const scrollToAdmin = () => {
    const adminSection = document.getElementById('admin-registry');
    if (adminSection) {
      adminSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col gap-4">
      <div className="flex flex-col gap-2 p-2 bg-black/60 border border-primary/30 backdrop-blur-xl rounded-full shadow-[0_0_30px_rgba(255,0,0,0.2)]">
        <a 
          href="mailto:support@madmatrix.site?subject=Neural_Link_Support" 
          title="HELP_DESK" 
          className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all group"
        >
          <Mail className="h-5 w-5" />
        </a>
        <a 
          href="mailto:organizer@madmatrix.site?subject=Sponsorship_Uplink" 
          title="SPONSORS" 
          className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all group"
        >
          <ShieldAlert className="h-5 w-5" />
        </a>
        <button 
          onClick={scrollToAdmin}
          title="SYSTEM_NODE" 
          className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all group"
        >
          <Cpu className="h-5 w-5" />
        </button>
      </div>
      <div className="h-20 w-[1px] bg-gradient-to-b from-primary/50 to-transparent mx-auto" />
    </div>
  );
};

const AdminTiltGrid = () => {
  const admins = [
    { role: "Faculty Convenor", name: "Dr. K. Sudar Mozhi", phone: "9080730749", color: "border-blue-500/30" },
    { role: "Student Admin", name: "Dhanush R", phone: "9025718226", color: "border-white/10" },
    { role: "Lead Admin", name: "Nithishwaran", phone: "8754330333", color: "border-primary/40" },
    { role: "Student Admin", name: "Kevin Mathew", phone: "8610871590", color: "border-white/10" },
    { role: "Student Admin", name: "Infant A", phone: "7548855208", color: "border-white/10" },
    { role: "Student Admin", name: "Prasithi Kumaran", phone: "8248372122", color: "border-white/10" },
    { role: "Student Admin", name: "Vivaa", phone: "9363315750", color: "border-white/10" },
    { role: "Student Admin", name: "K L Dinesh Eswar", phone: "7200295986", color: "border-white/10" },
    { role: "Student Admin", name: "Sugantharaj", phone: "9150184324", color: "border-white/10" },
  ];

  return (
    <div id="admin-registry" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl mx-auto py-12">
      <div className="col-span-full mb-6 text-center">
        <div className="flex items-center justify-center gap-3 text-primary">
          <ShieldCheck className="h-5 w-5 animate-pulse" />
          <span className="font-mono text-sm tracking-widest uppercase">[MAIL_TEAM_MOVE]</span>
        </div>
      </div>
      {admins.map((admin, idx) => (
        <div 
          key={idx} 
          className={cn(
            "group relative bg-black/40 border p-6 rounded-xl backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden",
            admin.color,
            "perspective-1000"
          )}
        >
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <p className="text-[10px] font-mono text-primary/60 uppercase mb-2">{admin.role}</p>
          <h4 className="text-white font-bold text-lg uppercase tracking-tight group-hover:cyber-glitch">{admin.name}</h4>
          <a 
            href={`tel:+91${admin.phone}`} 
            className="inline-flex items-center gap-2 text-primary/60 font-mono text-xs mt-4 group-hover:text-primary transition-colors border border-primary/20 px-3 py-2 rounded-md hover:bg-primary/10 w-full justify-center uppercase tracking-tighter"
          >
            <Phone className="h-3 w-3" /> DIRECT_CONTACT: {admin.phone}
          </a>
        </div>
      ))}
    </div>
  );
};

const GlitchOverlay = () => (
  <div className="fixed inset-0 z-[200] pointer-events-none overflow-hidden bg-black/40 backdrop-blur-sm">
    <div className="absolute inset-0 animate-pulse opacity-40 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(255,0,0,0.1)_50.1%)] bg-[length:100%_4px]" />
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="font-mono text-primary text-4xl animate-bounce tracking-[0.5em] uppercase font-black cyber-glitch">
        [SONIC_BOOM_DETECTED]
      </div>
      <div className="mt-4 font-mono text-white/40 text-xs uppercase tracking-[1em]">
        RECALCULATING_NEURAL_PATHWAY
      </div>
    </div>
  </div>
);

export default function TicketHub() {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showSlider, setShowSlider] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
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
              Event: foundRow.Event || foundRow.event || foundRow.EVENT || endpoints[i].name,
              Status: "AUTHORIZED_ENTRY"
            };
            break;
          }
        }
      }

      if (foundAttendee) {
        setAttendee(foundAttendee);
        setIsVerifying(true);
        setTimeout(() => {
          setLoading(false);
          setShowSlider(true);
        }, 1000);
      } else {
        toast({
          title: "Registry Mismatch",
          description: `Email not found in registries.`,
          variant: "destructive",
        });
        setLoading(false);
      }
    } catch (error) {
      toast({
        title: "Registry Offline",
        description: "Could not connect to database services.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const handleLaunch = (value: number[]) => {
    if (value[0] >= 95) {
      setIsLaunching(true);
      setTimeout(async () => {
        setStep(2);
        setIsLaunching(false);
        try {
          const aiResult = await generateCyberpunkGreeting({ attendeeName: attendee!.Name });
          setGreeting(aiResult.greeting);
        } catch (error) {
          setGreeting("Access permit retrieved. Welcome to the Matrix.");
        }
      }, 1500);
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
        windowWidth: 1000,
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
        description: "Official entry document saved.",
      });
    } catch (error) {
      toast({
        title: "Download Interrupted",
        description: "Layout stabilization failed.",
        variant: "destructive",
      });
    } finally {
      setDownloading(false);
    }
  };

  const resetPortal = () => {
    setStep(1);
    setEmail("");
    setAttendee(null);
    setLoading(false);
    setIsVerifying(false);
    setShowSlider(false);
    setIsLaunching(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 max-w-6xl mx-auto space-y-24">
      <PersistentSupportMenu />
      {isLaunching && <GlitchOverlay />}
      
      {step === 1 && (
        <div className="w-full flex flex-col items-center space-y-12 animate-in fade-in zoom-in duration-700">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3">
              <div className="h-2 w-2 rounded-full bg-primary animate-ping" />
              <span className="text-xs font-mono uppercase tracking-[0.4em] text-primary/80">Neural Authorization Portal</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white uppercase leading-none">
              MadMatrix<span className="text-primary italic animate-pulse">'26</span>
            </h1>
            <p className="text-muted-foreground font-mono text-xs md:text-sm max-w-lg mx-auto leading-relaxed uppercase">
              USE THE MAIL ID WHICH YOU USED IN REGISTRATION ( GOOGLE FORMS )
            </p>
          </div>

          <Card className="w-full max-w-2xl bg-black/40 border-primary/20 backdrop-blur-3xl shadow-[0_0_50px_rgba(255,0,0,0.1)] overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <CardContent className="p-10">
              {!showSlider ? (
                <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-6">
                  <div className="relative flex-1">
                    <Terminal className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
                    <Input
                      type="email"
                      placeholder="ENTER_ENCRYPTED_ID"
                      className="pl-12 h-16 bg-white/5 border-primary/10 text-primary placeholder:text-primary/20 font-mono focus-visible:ring-primary text-xl uppercase tracking-widest disabled:opacity-50"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={!email || loading}
                    className="h-16 px-12 bg-primary text-white font-black hover:bg-red-700 transition-all rounded-lg shadow-xl disabled:opacity-30 text-sm tracking-[0.2em] uppercase flex items-center justify-center active:scale-95"
                  >
                    {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Search className="mr-2 h-5 w-5" />DECRYPT</>}
                  </button>
                </form>
              ) : (
                <div className="space-y-10 py-6 animate-in slide-in-from-bottom-4 duration-500 flex flex-col items-center">
                  <div className="w-full flex justify-between items-center text-[10px] font-mono text-green-500 uppercase tracking-widest px-4">
                    <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> [BIO_SYNC_COMPLETE]</span>
                    <span className="animate-pulse">CORE_NEURAL_UPLINK</span>
                  </div>
                  <div className="w-full max-w-md space-y-6">
                    <p className="text-[10px] font-mono text-primary/60 uppercase tracking-[0.3em] text-center">Slide rocket to initiate launch</p>
                    <div className="p-6 bg-white/5 rounded-2xl border border-primary/20 relative overflow-hidden w-full mx-auto md:w-3/4">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent pointer-events-none" />
                      <Slider
                        defaultValue={[0]}
                        max={100}
                        step={1}
                        className="cursor-pointer"
                        onValueChange={handleLaunch}
                      />
                      <div className="mt-6 flex justify-between text-[8px] font-mono text-primary/40 uppercase tracking-widest px-4">
                        <span>INIT_SEQ</span>
                        <span>&gt;&gt;&gt; SLIDE TO LAUNCH &gt;&gt;&gt;</span>
                        <span>EXEC_NODE</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {step === 2 && attendee && (
        <div className="w-full space-y-24 animate-in slide-in-from-bottom-12 duration-1000">
          <div className="w-full max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-8 duration-700">
             <div className="bg-black/60 border border-primary/30 backdrop-blur-2xl p-10 rounded-3xl relative overflow-hidden group hover:shadow-[0_0_40px_rgba(255,0,0,0.15)] transition-all cyber-scanline">
                <div className="absolute top-0 right-0 p-4 text-[8px] font-mono text-primary/30 tracking-[0.5em] uppercase">SYSTEM_LOG_v2.0</div>
                
                <div className="space-y-6 font-mono text-left">
                  <div className="flex flex-col gap-2 border-l-2 border-green-500 pl-6 py-2">
                    <span className="text-green-500/60 text-xs tracking-widest uppercase">[IDENT_SYNC]:</span>
                    <h3 className="text-3xl md:text-5xl font-black text-green-500 uppercase tracking-tighter">
                      <DecryptText text={attendee.Name} />
                    </h3>
                  </div>

                  <div className="flex flex-col gap-2 border-l-2 border-primary pl-6 py-2">
                    <span className="text-primary/60 text-xs tracking-widest uppercase">[ASSIGNED_PROTOCOL]:</span>
                    <h3 className="text-2xl md:text-4xl font-black text-primary uppercase tracking-tighter">
                      {attendee.Event}
                    </h3>
                  </div>

                  <div className="flex flex-col gap-2 border-l-2 border-white/20 pl-6 py-2">
                    <span className="text-white/40 text-xs tracking-widest uppercase">[DEPLOYMENT_ZONE]:</span>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
                        <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-[0.2em]">
                          SIMATS ENGINEERING
                        </h3>
                      </div>
                      <p className="text-[10px] text-primary/60 mt-1">SCAD AUDITORIUM // COMMENCEMENT: 09:00 AM</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-between items-center text-[10px] font-mono text-primary/40 uppercase tracking-widest px-2">
                  <span className="flex items-center gap-2 text-green-500"><ShieldCheck className="h-4 w-4" /> [BIO_SYNC_COMPLETE]</span>
                  <span className="animate-pulse">CORE_NEURAL_UPLINK</span>
                </div>
             </div>
          </div>

          <div className="w-full space-y-16 pt-12">
            <div className="flex flex-col items-center gap-4">
               <span className="text-[10px] font-mono text-primary/40 tracking-[1em] uppercase">PERMIT_ENCRYPTION_LAYER</span>
               <div className="p-8 bg-white/5 rounded-3xl border border-white/10 overflow-x-auto w-full flex justify-center shadow-inner relative group">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity blur-3xl pointer-events-none" />
                <div className="p-4 bg-black/60 rounded-xl backdrop-blur-md relative z-10 border border-white/5">
                  <Ticket
                    ref={ticketRef}
                    id="madmatrix-ticket"
                    name={attendee.Name}
                    regNo={attendee.RegNo}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 w-full max-w-4xl mx-auto">
              <Button
                onClick={handleDownload}
                disabled={downloading}
                className="flex-1 min-w-[280px] h-20 bg-primary text-white font-black hover:bg-red-700 shadow-[0_0_40px_rgba(255,0,0,0.3)] uppercase tracking-[0.3em] text-xs transition-all active:scale-95 rounded-xl"
              >
                {downloading ? (
                  <><Loader2 className="mr-3 h-6 w-6 animate-spin" />RENDERING_HD_PERMIT_3X...</>
                ) : (
                  <><Download className="mr-3 h-6 w-6" />DOWNLOAD_PERMIT_v1.0</>
                )}
              </Button>
              <Button
                onClick={() => {
                  const text = `I've secured my official permit for MadMatrix '26! Authorized entry for ${attendee.Name}. Retrieve yours at: https://www.madmatrix.site/`;
                  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
                }}
                className="flex-1 min-w-[280px] h-20 bg-[#25D366] text-white font-black hover:bg-[#128C7E] shadow-[0_0_30px_rgba(37,211,102,0.2)] uppercase tracking-[0.3em] text-xs transition-all rounded-xl"
              >
                <Share2 className="mr-3 h-6 w-6" />UPLINK_TO_WHATSAPP
              </Button>
              <Button
                variant="ghost"
                onClick={resetPortal}
                className="w-full h-14 text-primary/40 hover:text-primary hover:bg-primary/5 uppercase tracking-[0.5em] text-[10px] font-mono"
              >
                [INITIATE_SYSTEM_RESET]
              </Button>
            </div>

            {greeting && (
              <div className="max-w-2xl mx-auto p-10 bg-white/5 border border-primary/20 rounded-3xl flex flex-col items-center gap-6 text-center shadow-xl">
                <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center border border-primary/40 text-primary">
                  <UserCheck className="h-7 w-7" />
                </div>
                <div className="space-y-3">
                  <p className="text-[10px] text-primary font-mono uppercase tracking-[0.4em]">Personalized_Neuro_Greeting</p>
                  <p className="text-sm md:text-base text-muted-foreground font-mono leading-relaxed italic opacity-80">
                    "{greeting}"
                  </p>
                </div>
              </div>
            )}
          </div>
          
          <AdminTiltGrid />

          <footer className="w-full max-w-5xl mx-auto pb-24 space-y-12">
             <div className="bg-black/80 border border-primary/30 p-12 rounded-3xl cyber-scanline relative overflow-hidden shadow-[0_0_60px_rgba(255,0,0,0.1)]">
                <div className="flex items-center gap-4 mb-10 text-primary">
                  <Terminal className="h-6 w-6 animate-pulse" />
                  <span className="font-mono text-sm tracking-tighter uppercase font-bold">CONTACT US</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono">
                  <div className="space-y-4">
                    <a href="mailto:support@madmatrix.site?subject=Neural_Support_Ticket" className="flex items-center gap-5 p-5 bg-white/5 rounded-xl border border-white/5 hover:border-primary/40 transition-all group">
                      <Mail className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                      <div>
                        <p className="text-primary uppercase text-[10px] font-bold mb-1 tracking-widest">HELP_DESK</p>
                        <p className="text-white text-sm">support@madmatrix.site</p>
                      </div>
                    </a>
                    <a href="mailto:organizer@madmatrix.site?subject=Sponsorship_Link_Request" className="flex items-center gap-5 p-5 bg-white/5 rounded-xl border border-white/5 hover:border-primary/40 transition-all group">
                      <MessageSquare className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                      <div>
                        <p className="text-primary uppercase text-[10px] font-bold mb-1 tracking-widest">SPONSOR_ENQUIRY</p>
                        <p className="text-white text-sm">organizer@madmatrix.site</p>
                      </div>
                    </a>
                  </div>
                  <div className="space-y-4">
                    <a href="mailto:madmatrix2026@gmail.com" className="flex items-center gap-5 p-5 bg-white/5 rounded-xl border border-white/5 hover:border-primary/40 transition-all group">
                      <Cpu className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                      <div>
                        <p className="text-primary uppercase text-[10px] font-bold mb-1 tracking-widest">PRIMARY_NODE</p>
                        <p className="text-white text-sm">madmatrix2026@gmail.com</p>
                      </div>
                    </a>
                    <a href="https://www.madmatrix.site" target="_blank" className="flex items-center gap-5 p-5 bg-white/5 rounded-xl border border-white/5 hover:border-primary/40 transition-all group">
                      <Globe className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                      <div>
                        <p className="text-primary uppercase text-[10px] font-bold mb-1 tracking-widest">OFFICIAL_UPLINK</p>
                        <span className="text-white text-sm hover:text-primary transition-colors underline underline-offset-4">www.madmatrix.site</span>
                      </div>
                    </a>
                  </div>
                </div>

                <div className="mt-16 text-center border-t border-primary/10 pt-10">
                  <p className="text-[10px] font-mono text-primary/30 tracking-[1.5em] uppercase">
                    &copy; 2026_ESTABLISHMENT_NODE // MAD_MATRIX_ROOT
                  </p>
                  <p className="text-[8px] font-mono text-primary/20 mt-4 uppercase">
                    Conducted by: Dept. of Pure & Applied Mathematics | SIMATS Engineering
                  </p>
                </div>
              </div>
          </footer>
        </div>
      )}
    </div>
  );
}