"use client";

import React, { useState, useEffect } from "react";

interface TicketProps {
  name: string;
  regNo: string;
  greeting?: string;
  id: string;
}

export const Ticket = React.forwardRef<HTMLDivElement, TicketProps>(
  ({ name, regNo, greeting, id }, ref) => {
    const [secureId, setSecureId] = useState("");
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(regNo)}&size=150x150&color=ffffff&bgcolor=000000`;

    useEffect(() => {
      setSecureId(Math.random().toString(36).substring(7).toUpperCase());
    }, []);

    return (
      <div
        ref={ref}
        id={id}
        className="relative w-full max-w-[700px] aspect-[2.1/1] overflow-hidden rounded-sm shadow-[0_0_50px_rgba(139,0,0,0.3)] bg-black select-none border border-white/10"
      >
        {/* Main Background Texture */}
        <div className="absolute inset-0 z-0 bg-[#1a0505]">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-40"></div>
        </div>

        {/* Top Branding Bar (SIMATS) */}
        <div className="absolute top-0 left-0 right-0 h-[18%] bg-white/95 z-30 flex items-center justify-between px-6 border-b-2 border-primary">
          <div className="flex items-center gap-3">
             <div className="h-8 w-8 bg-primary rounded-sm flex items-center justify-center text-white font-black text-xs">SE</div>
             <div className="flex flex-col">
                <span className="text-[#0a2e5c] font-black text-lg tracking-tight leading-none uppercase">SIMATS ENGINEERING</span>
                <span className="text-[#0a2e5c] text-[7px] font-bold uppercase tracking-tighter opacity-80">Approved By AICTE | IET-UK Accreditation</span>
             </div>
          </div>
          <div className="flex gap-2">
            <div className="h-6 px-2 bg-[#f9c513] rounded-sm flex items-center justify-center text-[6px] font-black text-black uppercase">Platinum I-Gauge</div>
            <div className="h-6 px-2 bg-[#00a3e0] rounded-sm flex items-center justify-center text-[6px] font-black text-white uppercase">NBA Accreditation</div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="absolute inset-0 z-20 pt-[18%] flex">
          {/* Left Section (Main Ticket) */}
          <div className="flex-[2.5] h-full relative p-6 flex flex-col items-center justify-center text-center">
            <div className="space-y-0.5">
               <h3 className="text-primary font-black text-4xl md:text-5xl tracking-tighter drop-shadow-[0_0_15px_rgba(255,0,0,0.6)] uppercase italic">
                 MADMATRIX
               </h3>
               <p className="text-white font-bold text-[10px] tracking-[0.3em] uppercase opacity-90">NATIONAL LEVEL SYMPOSIUM</p>
            </div>

            <div className="my-3 py-1 px-4 border-y border-white/20">
               <span className="text-white/80 font-mono text-[10px] tracking-widest uppercase">Admit One:</span>
               <span className="ml-2 text-white font-black text-lg tracking-wide uppercase">{name}</span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center gap-3 text-white">
                <p className="font-bold text-sm tracking-tighter">MAR 13th & 14th, 2026</p>
                <div className="w-px h-3 bg-white/30"></div>
                <p className="font-bold text-sm tracking-tighter">09:00 AM</p>
              </div>
              <p className="text-primary font-black text-[10px] tracking-widest uppercase">Venue: SIMATS Engineering Campus</p>
              <p className="text-white/40 font-mono text-[8px] tracking-[0.4em]">MADMATRIX26.IN</p>
            </div>

            {/* AI Greeting Overlay */}
            {greeting && (
              <div className="absolute bottom-4 left-6 right-6">
                <p className="text-[8px] text-secondary/70 italic line-clamp-1 font-mono">
                  msg: {greeting}
                </p>
              </div>
            )}
          </div>

          {/* Perforation Line */}
          <div className="w-px h-full border-l-2 border-dashed border-white/20 z-40"></div>

          {/* Right Section (Stub) */}
          <div className="flex-1 h-full bg-black/40 flex flex-col items-center justify-between p-4 py-8">
            <div className="text-center">
               <p className="text-white font-black text-xs leading-none">MAD</p>
               <p className="text-primary font-black text-xs leading-none">MATRIX</p>
            </div>

            <div className="bg-white p-1 rounded-sm shadow-[0_0_15px_rgba(255,255,255,0.2)]">
               <img 
                src={qrUrl} 
                alt="Registration QR" 
                className="w-20 h-20"
              />
            </div>

            <div className="text-center">
               <p className="text-[7px] text-white/60 font-mono uppercase tracking-tighter">Scan for Details</p>
               <p className="text-[8px] text-primary font-bold font-mono mt-1">{regNo}</p>
            </div>
          </div>
        </div>

        {/* Secure ID footer */}
        <div className="absolute bottom-1 left-2 z-50">
          <p className="text-[6px] font-mono text-white/20 uppercase tracking-widest">
            SEC_TOKEN: {secureId || "PENDING"}
          </p>
        </div>
      </div>
    );
  }
);

Ticket.displayName = "Ticket";
