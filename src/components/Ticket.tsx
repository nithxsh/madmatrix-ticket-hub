
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
    // QR points to the official site
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent("https://www.madmatrix.site/")}&size=150x150&color=000000&bgcolor=ffffff`;
    
    // Official branding assets
    const campusBgUrl = "https://www.saveetha.ac.in/images/saveetha/saveetha-engineering-college.jpg";

    return (
      <div
        ref={ref}
        id={id}
        className="relative w-[800px] flex flex-col overflow-hidden rounded-sm shadow-[0_0_60px_rgba(255,0,0,0.4)] bg-[#050000] select-none border border-white/10"
        style={{ height: "380px" }}
      >
        {/* Campus Background Image with 0.5 opacity */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img 
            src={campusBgUrl} 
            alt="Campus Background" 
            className="w-full h-full object-cover opacity-50"
            crossOrigin="anonymous"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80" />
        </div>

        {/* Official Header Branding Bar - Logos Removed, Text at Corners */}
        <div className="relative h-[85px] bg-white z-30 flex items-center justify-between px-6 border-b-[4px] border-primary">
          <div className="flex flex-col justify-center">
                <span className="text-[#0a2e5c] font-black text-3xl tracking-tighter leading-none uppercase">SIMATS</span>
                <span className="text-[#0a2e5c] text-[12px] font-bold tracking-[0.3em] uppercase leading-tight mt-1">ENGINEERING</span>
          </div>

          <div className="flex flex-col items-end text-right">
                <span className="text-[#0a2e5c] font-black text-3xl tracking-tighter leading-none uppercase">SIMATS</span>
                <span className="text-[#0a2e5c] text-[7px] font-bold uppercase leading-tight max-w-[180px] mt-1 opacity-80">
                  SAVEETHA INSTITUTE OF MEDICAL AND TECHNICAL SCIENCES
                </span>
                <span className="text-[#0a2e5c] text-[5px] font-medium uppercase opacity-60 mt-0.5">
                  (DECLARED AS DEEMED TO BE UNIVERSITY UNDER SECTION 3 OF UGC ACT 1956)
                </span>
          </div>
        </div>

        {/* Main Body */}
        <div className="flex-1 flex overflow-hidden relative z-10">
          <div className="flex-[2.2] flex flex-col items-center justify-between p-6 py-8 relative">
            <div className="text-center">
               <h3 className="text-primary font-black text-6xl tracking-tighter drop-shadow-[0_0_15px_rgba(255,0,0,0.5)] uppercase italic leading-none">
                 MADMATRIX
               </h3>
               <p className="text-white font-bold text-[10px] tracking-[0.5em] uppercase opacity-70 mt-1">NATIONAL LEVEL SYMPOSIUM</p>
            </div>

            <div className="w-full max-w-[85%] mx-auto py-3 border-y border-white/10 flex flex-col items-center gap-1 bg-black/40 backdrop-blur-sm rounded-md">
               <span className="text-white/40 font-mono text-[9px] tracking-[0.3em] uppercase">AUTHORIZED PERSON</span>
               <span className="text-white font-black text-2xl tracking-tight uppercase leading-tight text-center">
                 {name}
               </span>
            </div>

            <div className="w-full flex flex-col items-center">
              <div className="flex items-center gap-6 text-white/90">
                <div className="flex flex-col items-center">
                  <span className="font-black text-lg tracking-tighter">MAR 13-14</span>
                  <span className="text-[8px] font-bold uppercase opacity-50">DATES</span>
                </div>
                <div className="w-px h-6 bg-white/20"></div>
                <div className="flex flex-col items-center">
                  <span className="font-black text-lg tracking-tighter uppercase">SIMATS</span>
                  <span className="text-[8px] font-bold uppercase opacity-50">CAMPUS</span>
                </div>
              </div>
              <div className="mt-4 w-full pt-2 border-t border-primary/20 text-center">
                <p className="text-primary font-black text-[11px] tracking-[0.2em] uppercase">
                  VENUE: SIMATS ENGINEERING CAMPUS, CHENNAI
                </p>
              </div>
            </div>
          </div>

          <div className="w-px h-full border-l border-dashed border-white/20 opacity-30"></div>

          <div className="flex-1 bg-black/60 backdrop-blur-md flex flex-col items-center justify-between p-4 py-6 relative overflow-hidden">
            <div className="w-full text-center space-y-1">
              <p className="text-white font-black text-[10px] uppercase tracking-tighter leading-tight">SIMATS ENGINEERING</p>
              <p className="text-primary font-black text-[12px] uppercase tracking-tight">MAR 13-14, 2026</p>
            </div>

            <div className="flex items-center justify-center py-2">
              <div className="bg-white p-2 rounded-sm shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                 <img 
                  src={qrUrl} 
                  alt="Registration QR" 
                  className="w-24 h-24"
                  crossOrigin="anonymous"
                />
              </div>
            </div>

            <div className="text-center px-1 space-y-1">
               <p className="text-[10px] text-white font-bold uppercase leading-tight tracking-tight">
                 YOUR PAYMENT HAS BEEN RECEIVED.
               </p>
               <p className="text-[8px] text-white/80 font-medium uppercase tracking-tighter">
                 THANKS FOR REGISTERING!
               </p>
               <span className="text-primary font-black tracking-[0.2em] mt-1 block text-[11px] uppercase">GET INTO MATRIX !</span>
            </div>

            <div className="text-center space-y-0.5 pb-2">
               <p className="text-[9px] text-primary font-black font-mono tracking-tighter">{regNo}</p>
               <div className="flex items-center justify-center gap-1">
                 <div className="h-1 w-1 rounded-full bg-[#22c55e] animate-pulse"></div>
                 <p className="text-[8px] text-[#22c55e] font-black uppercase tracking-tighter">VERIFIED_ENTRY</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Ticket.displayName = "Ticket";
