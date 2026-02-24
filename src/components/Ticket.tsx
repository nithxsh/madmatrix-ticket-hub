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
        {/* Main Background Texture - Fixed broken external image with CSS pattern */}
        <div className="absolute inset-0 z-0 bg-[#1a0505]">
          <div 
            className="absolute inset-0 opacity-10" 
            style={{ 
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)',
              backgroundSize: '8px 8px' 
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60"></div>
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
            <div className="space-y-0.5 mb-2">
               <h3 className="text-primary font-black text-4xl md:text-5xl tracking-tighter drop-shadow-[0_0_15px_rgba(255,0,0,0.6)] uppercase italic">
                 MADMATRIX
               </h3>
               <p className="text-white font-bold text-[10px] tracking-[0.3em] uppercase opacity-90">NATIONAL LEVEL SYMPOSIUM</p>
            </div>

            <div className="w-full max-w-xs mx-auto my-3 py-1.5 border-y border-white/20">
               <span className="text-white/60 font-mono text-[8px] tracking-widest uppercase block mb-1">AUTHORIZED PERSONNEL:</span>
               <span className="text-white font-black text-xl tracking-wide uppercase leading-none">{name}</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-center gap-3 text-white">
                <div className="flex flex-col items-end">
                   <p className="font-black text-sm tracking-tighter">MAR 13th & 14th</p>
                   <p className="text-[8px] font-bold uppercase opacity-60">Year 2026</p>
                </div>
                <div className="w-px h-6 bg-white/30"></div>
                <div className="flex flex-col items-start">
                   <p className="font-black text-sm tracking-tighter">09:00 AM</p>
                   <p className="text-[8px] font-bold uppercase opacity-60">Reporting</p>
                </div>
              </div>
              
              <div className="space-y-0.5">
                <p className="text-primary font-black text-[9px] tracking-widest uppercase">VENUE: SIMATS Engineering Campus</p>
                <p className="text-white/40 font-mono text-[7px] tracking-[0.4em] uppercase">MADMATRIX26.IN</p>
              </div>
            </div>

            {/* AI Greeting Overlay */}
            {greeting && (
              <div className="absolute bottom-3 left-6 right-6">
                <p className="text-[8px] text-secondary/70 italic line-clamp-1 font-mono">
                  DECODED_MSG: {greeting}
                </p>
              </div>
            )}
          </div>

          {/* Perforation Line */}
          <div className="w-px h-full border-l-2 border-dashed border-white/20 z-40 opacity-50"></div>

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
                className="w-16 h-16 md:w-20 md:h-20"
              />
            </div>

            <div className="text-center">
               <p className="text-[7px] text-white/60 font-mono uppercase tracking-tighter">Scan to Verify</p>
               <p className="text-[8px] text-primary font-bold font-mono mt-1">{regNo}</p>
            </div>
          </div>
        </div>

        {/* Secure ID footer */}
        <div className="absolute bottom-1 left-2 z-50">
          <p className="text-[6px] font-mono text-white/20 uppercase tracking-widest">
            NODE_SEC_ID: {secureId || "PENDING"}
          </p>
        </div>
      </div>
    );
  }
);

Ticket.displayName = "Ticket";