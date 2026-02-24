
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
    // QR Code now points to the official website
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent("https://www.madmatrix.site/")}&size=150x150&color=000000&bgcolor=ffffff`;
    const simatsLogoUrl = "https://upload.wikimedia.org/wikipedia/en/5/52/Saveetha_Institute_of_Medical_and_Technical_Sciences_logo.png";
    const campusBgUrl = "https://www.saveetha.ac.in/images/saveetha/saveetha-engineering-college.jpg";

    useEffect(() => {
      setSecureId(Math.random().toString(36).substring(7).toUpperCase());
    }, []);

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
          />
          {/* Gradient Overlay for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80" />
        </div>

        {/* Updated Top Branding Bar (Matching provided header image) */}
        <div className="relative h-[85px] bg-white z-30 flex items-center justify-between px-8 border-b-[4px] border-primary">
          {/* Left: SIMATS Engineering Logo & Text */}
          <div className="flex items-center gap-4">
             <img 
              src={simatsLogoUrl} 
              alt="SE Logo" 
              className="h-14 w-14 object-contain"
             />
             <div className="flex flex-col justify-center border-l-2 border-[#0a2e5c]/20 pl-4">
                <span className="text-[#0a2e5c] font-black text-3xl tracking-tighter leading-none uppercase">SIMATS</span>
                <span className="text-[#0a2e5c] text-[12px] font-bold tracking-[0.3em] uppercase leading-tight mt-1">ENGINEERING</span>
             </div>
          </div>

          {/* Right: SIMATS University Seal & Text */}
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end text-right">
                <span className="text-[#0a2e5c] font-black text-3xl tracking-tighter leading-none uppercase">SIMATS</span>
                <span className="text-[#0a2e5c] text-[7px] font-bold uppercase leading-tight max-w-[180px] mt-1 opacity-80">
                  SAVEETHA INSTITUTE OF MEDICAL AND TECHNICAL SCIENCES
                </span>
                <span className="text-[#0a2e5c] text-[5px] font-medium uppercase opacity-60 mt-0.5">
                  (DECLARED AS DEEMED TO BE UNIVERSITY UNDER SECTION 3 OF UGC ACT 1956)
                </span>
             </div>
             <img 
              src={simatsLogoUrl} 
              alt="SIMATS Seal" 
              className="h-14 w-14 object-contain"
             />
          </div>
        </div>

        {/* Main Body */}
        <div className="flex-1 flex overflow-hidden relative z-10">
          {/* Left Content (Primary Info) */}
          <div className="flex-[2.2] flex flex-col items-center justify-between p-6 py-8 relative">
            <div className="text-center z-10">
               <h3 className="text-primary font-black text-6xl tracking-tighter drop-shadow-[0_0_15px_rgba(255,0,0,0.5)] uppercase italic leading-none">
                 MADMATRIX
               </h3>
               <p className="text-white font-bold text-[10px] tracking-[0.5em] uppercase opacity-70 mt-1">NATIONAL LEVEL SYMPOSIUM</p>
            </div>

            <div className="w-full max-w-[85%] mx-auto py-3 border-y border-white/10 flex flex-col items-center gap-1 z-10 bg-black/40 backdrop-blur-sm rounded-md">
               <span className="text-white/40 font-mono text-[9px] tracking-[0.3em] uppercase">AUTHORIZED PERSONNEL:</span>
               <span className="text-white font-black text-2xl tracking-tight uppercase leading-tight text-center">
                 {name}
               </span>
            </div>

            <div className="w-full flex flex-col items-center z-10">
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

          {/* Perforation Line */}
          <div className="w-px h-full border-l border-dashed border-white/20 opacity-30"></div>

          {/* Right Stub (Verification & Receipt) */}
          <div className="flex-1 bg-black/60 backdrop-blur-md flex flex-col items-center justify-between p-4 py-6 relative overflow-hidden">
            {/* Top Branding/Date - Centered */}
            <div className="w-full text-center space-y-1">
              <p className="text-white font-black text-[10px] uppercase tracking-tighter leading-tight">SIMATS ENGINEERING</p>
              <p className="text-primary font-black text-[12px] uppercase tracking-tight">MAR 13-14, 2026</p>
            </div>

            {/* QR Code - Centered container */}
            <div className="flex items-center justify-center py-2">
              <div className="bg-white p-2 rounded-sm shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                 <img 
                  src={qrUrl} 
                  alt="Registration QR" 
                  className="w-24 h-24"
                />
              </div>
            </div>

            {/* Confirmation Text - Centered & Sharp */}
            <div className="text-center px-1 space-y-1">
               <p className="text-[10px] text-white font-bold uppercase leading-tight tracking-tight">
                 YOUR PAYMENT HAS BEEN RECEIVED.
               </p>
               <p className="text-[8px] text-white/80 font-medium uppercase tracking-tighter">
                 THANKS FOR REGISTERING!
               </p>
               <span className="text-primary font-black tracking-[0.2em] mt-1 block text-[11px] uppercase">GET INTO MATRIX !</span>
            </div>

            {/* Verification Status */}
            <div className="text-center space-y-0.5 pb-2">
               <p className="text-[9px] text-primary font-black font-mono tracking-tighter">{regNo}</p>
               <div className="flex items-center justify-center gap-1">
                 <div className="h-1 w-1 rounded-full bg-[#22c55e] animate-pulse"></div>
                 <p className="text-[8px] text-[#22c55e] font-black uppercase tracking-tighter">VERIFIED_ENTRY</p>
               </div>
            </div>

            {/* Secure ID footer */}
            <div className="absolute bottom-1 left-0 right-0 text-center">
              <p className="text-[6px] font-mono text-white/10 uppercase tracking-widest">
                ID: {secureId || "PENDING"}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Ticket.displayName = "Ticket";
