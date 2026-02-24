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
        className="relative w-full max-w-[750px] aspect-[2.1/1] overflow-hidden rounded-sm shadow-[0_0_50px_rgba(255,0,0,0.2)] bg-black select-none border border-white/5"
      >
        {/* Main Background Texture */}
        <div className="absolute inset-0 z-0 bg-[#0a0000]">
          <div 
            className="absolute inset-0 opacity-5" 
            style={{ 
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)',
              backgroundSize: '12px 12px' 
            }}
          />
        </div>

        {/* Top Branding Bar (SIMATS) */}
        <div className="absolute top-0 left-0 right-0 h-[18%] bg-[#f8f9fa] z-30 flex items-center justify-between px-6 border-b-[3px] border-primary">
          <div className="flex items-center gap-3">
             <div className="h-10 w-10 bg-[#e31e24] rounded-sm flex items-center justify-center text-white font-black text-xl">SE</div>
             <div className="flex flex-col">
                <span className="text-[#0a2e5c] font-black text-xl tracking-tighter leading-none uppercase">SIMATS ENGINEERING</span>
                <span className="text-[#0a2e5c] text-[8px] font-bold uppercase tracking-tight opacity-80 mt-1">APPROVED BY AICTE | IET-UK ACCREDITATION</span>
             </div>
          </div>
          <div className="flex gap-2">
            <div className="h-8 px-3 bg-[#f9c513] rounded-sm flex items-center justify-center text-[8px] font-black text-black uppercase shadow-sm">Platinum I-Gauge</div>
            <div className="h-8 px-3 bg-[#00a3e0] rounded-sm flex items-center justify-center text-[8px] font-black text-white uppercase shadow-sm">NBA Accreditation</div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="absolute inset-0 z-20 pt-[18%] flex">
          {/* Left Section (Main Ticket) */}
          <div className="flex-[2.5] h-full relative p-6 flex flex-col items-center justify-between text-center pb-8">
            <div className="mt-2">
               <h3 className="text-primary font-black text-5xl md:text-6xl tracking-tighter drop-shadow-[0_0_15px_rgba(255,0,0,0.8)] uppercase italic leading-none">
                 MADMATRIX
               </h3>
               <p className="text-white font-bold text-[11px] tracking-[0.4em] uppercase opacity-90 mt-1">NATIONAL LEVEL SYMPOSIUM</p>
            </div>

            <div className="w-full max-w-sm mx-auto my-2 py-3 border-y border-white/10 flex flex-col gap-1">
               <span className="text-white/40 font-mono text-[9px] tracking-widest uppercase">AUTHORIZED PERSONNEL:</span>
               <span className="text-white font-black text-2xl md:text-3xl tracking-tight uppercase leading-none break-words">
                 {name}
               </span>
            </div>

            <div className="w-full flex items-center justify-center gap-6 text-white">
              <div className="flex flex-col items-center">
                 <p className="font-black text-xl tracking-tighter leading-none">MAR 13th & 14th</p>
                 <p className="text-[9px] font-bold uppercase opacity-50 mt-1">YEAR 2026</p>
              </div>
              <div className="w-px h-8 bg-white/20"></div>
              <div className="flex flex-col items-center">
                 <p className="font-black text-xl tracking-tighter leading-none">09:00 AM</p>
                 <p className="text-[9px] font-bold uppercase opacity-50 mt-1">REPORTING</p>
              </div>
            </div>

            {/* Venue at the bottom */}
            <div className="mt-4">
              <p className="text-primary font-black text-[11px] tracking-[0.15em] uppercase border-t border-primary/20 pt-2 px-4">
                VENUE: SIMATS ENGINEERING CAMPUS
              </p>
            </div>

            {/* AI Greeting Overlay */}
            {greeting && (
              <div className="absolute bottom-1.5 left-6 right-6 opacity-30">
                <p className="text-[7px] text-white italic truncate font-mono">
                  DECODED_MSG: {greeting}
                </p>
              </div>
            )}
          </div>

          {/* Perforation Line */}
          <div className="w-px h-full border-l-2 border-dashed border-white/10 z-40 opacity-50"></div>

          {/* Right Section (Stub) */}
          <div className="flex-1 h-full bg-black/60 flex flex-col items-center justify-between p-4 py-8">
            <div className="text-center">
               <p className="text-white font-black text-lg leading-none tracking-tighter uppercase">MAD</p>
               <p className="text-primary font-black text-lg leading-none tracking-tighter uppercase">MATRIX</p>
            </div>

            <div className="bg-white p-1 rounded-sm shadow-[0_0_20px_rgba(255,255,255,0.15)] transform hover:scale-105 transition-transform">
               <img 
                src={qrUrl} 
                alt="Registration QR" 
                className="w-20 h-20 md:w-24 md:h-24"
              />
            </div>

            <div className="text-center">
               <p className="text-[8px] text-white/50 font-mono uppercase tracking-widest">SCAN TO VERIFY</p>
               <p className="text-[10px] text-primary font-black font-mono mt-1">{regNo}</p>
               <p className="text-[9px] text-[#22c55e] font-black uppercase mt-1 tracking-tighter">VERIFIED</p>
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
