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
        className="relative w-full max-w-[800px] flex flex-col overflow-hidden rounded-sm shadow-[0_0_60px_rgba(255,0,0,0.3)] bg-[#050000] select-none border border-white/10"
        style={{ aspectRatio: "2.1/1" }}
      >
        {/* Top Branding Bar (SIMATS) */}
        <div className="relative h-[22%] bg-white z-30 flex items-center justify-between px-8 border-b-[4px] border-primary">
          <div className="flex items-center gap-4">
             <div className="h-12 w-12 bg-primary rounded-sm flex items-center justify-center text-white font-black text-2xl">SE</div>
             <div className="flex flex-col">
                <span className="text-[#0a2e5c] font-black text-2xl tracking-tighter leading-none uppercase">SIMATS ENGINEERING</span>
                <span className="text-[#0a2e5c] text-[9px] font-bold uppercase tracking-tight opacity-80 mt-1">APPROVED BY AICTE | IET-UK ACCREDITATION</span>
             </div>
          </div>
          <div className="flex gap-3">
            <div className="h-10 px-4 bg-[#f9c513] rounded-sm flex items-center justify-center text-[9px] font-black text-black uppercase shadow-sm">Platinum I-Gauge</div>
            <div className="h-10 px-4 bg-[#00a3e0] rounded-sm flex items-center justify-center text-[9px] font-black text-white uppercase shadow-sm">NBA Accreditation</div>
          </div>
        </div>

        {/* Main Body */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Content */}
          <div className="flex-[2.5] flex flex-col items-center justify-between p-6 py-8 relative">
            {/* Background Texture Overlay */}
            <div 
              className="absolute inset-0 opacity-10 pointer-events-none" 
              style={{ 
                backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)',
                backgroundSize: '15px 15px' 
              }}
            />

            {/* Symposium Title */}
            <div className="text-center z-10">
               <h3 className="text-primary font-black text-6xl tracking-tighter drop-shadow-[0_0_15px_rgba(255,0,0,0.6)] uppercase italic leading-none">
                 MADMATRIX
               </h3>
               <p className="text-white font-bold text-[12px] tracking-[0.5em] uppercase opacity-90 mt-1">NATIONAL LEVEL SYMPOSIUM</p>
            </div>

            {/* Personnel Info */}
            <div className="w-full max-w-[80%] mx-auto py-4 border-y border-white/10 flex flex-col items-center gap-1 z-10">
               <span className="text-white/40 font-mono text-[10px] tracking-widest uppercase">AUTHORIZED PERSONNEL:</span>
               <span className="text-white font-black text-3xl tracking-tight uppercase leading-tight text-center">
                 {name}
               </span>
            </div>

            {/* Date and Time Section */}
            <div className="w-full flex items-center justify-center gap-10 text-white z-10">
              <div className="flex flex-col items-center">
                 <p className="font-black text-2xl tracking-tighter leading-none">MAR 13th & 14th</p>
                 <p className="text-[10px] font-bold uppercase opacity-50 mt-1">YEAR 2026</p>
              </div>
              <div className="w-px h-10 bg-white/20"></div>
              <div className="flex flex-col items-center">
                 <p className="font-black text-2xl tracking-tighter leading-none">09:00 AM</p>
                 <p className="text-[10px] font-bold uppercase opacity-50 mt-1">REPORTING</p>
              </div>
            </div>

            {/* Venue Footer (Properly Aligned) */}
            <div className="w-full mt-4 z-10 text-center">
              <p className="text-primary font-black text-[12px] tracking-[0.2em] uppercase pt-3 border-t border-primary/20">
                VENUE: SIMATS ENGINEERING CAMPUS
              </p>
              {greeting && (
                <p className="text-[7px] text-white/40 italic font-mono mt-2 truncate max-w-[80%] mx-auto">
                  ENCRYPTED_GREETING: {greeting}
                </p>
              )}
            </div>
          </div>

          {/* Perforation */}
          <div className="w-px h-full border-l-2 border-dashed border-white/20 opacity-30"></div>

          {/* Right Stub */}
          <div className="flex-1 bg-black/40 flex flex-col items-center justify-between p-6 py-10 relative">
            <div className="text-center">
               <p className="text-white font-black text-xl leading-none tracking-tighter uppercase">MAD</p>
               <p className="text-primary font-black text-xl leading-none tracking-tighter uppercase">MATRIX</p>
            </div>

            <div className="bg-white p-1.5 rounded-sm shadow-[0_0_20px_rgba(255,255,255,0.1)]">
               <img 
                src={qrUrl} 
                alt="Registration QR" 
                className="w-24 h-24"
              />
            </div>

            <div className="text-center space-y-1">
               <p className="text-[9px] text-white/50 font-mono uppercase tracking-widest">SCAN TO VERIFY</p>
               <p className="text-[11px] text-primary font-black font-mono">{regNo}</p>
               <div className="flex items-center justify-center gap-1">
                 <div className="h-1.5 w-1.5 rounded-full bg-[#22c55e] animate-pulse"></div>
                 <p className="text-[10px] text-[#22c55e] font-black uppercase tracking-tighter">VERIFIED</p>
               </div>
            </div>

            {/* Secure ID footer */}
            <div className="absolute bottom-2 left-0 right-0 text-center">
              <p className="text-[6px] font-mono text-white/10 uppercase tracking-widest">
                NODE_ID: {secureId || "PENDING"}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Ticket.displayName = "Ticket";
