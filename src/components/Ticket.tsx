
"use client";

import React from "react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

interface TicketProps {
  name: string;
  regNo: string;
  id: string;
}

export const Ticket = React.forwardRef<HTMLDivElement, TicketProps>(
  ({ name, regNo, id }, ref) => {
    // QR code points to official symposium URL
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent("https://www.madmatrix.site/")}&size=250x250&color=000000&bgcolor=ffffff`;
    
    const bgImage = PlaceHolderImages.find(img => img.id === "ticket-template")?.imageUrl || "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1080";

    return (
      <div
        ref={ref}
        id={id}
        className="relative flex flex-col overflow-hidden bg-black select-none border border-white/10 shadow-2xl"
        style={{ width: "850px", height: "480px", minWidth: "850px", minHeight: "480px" }}
      >
        {/* Background Image Container - Explicit dimensions for html2canvas */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none w-full h-full bg-black">
          <img 
            src={bgImage} 
            alt="Ticket Background" 
            className="w-full h-full object-cover opacity-30"
            crossOrigin="anonymous"
            width="850"
            height="480"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Clean Logo-free Header with Branding Pinned to Corners */}
        <div className="relative h-[95px] bg-white z-30 flex items-center justify-between px-10">
          <div className="flex flex-col">
            <span className="text-[#0a2e5c] font-black text-2xl tracking-tighter leading-none">SIMATS</span>
            <span className="text-[#0a2e5c] text-[10px] font-bold tracking-[0.2em] uppercase">ENGINEERING</span>
          </div>

          <div className="flex flex-col items-end text-right">
            <span className="text-[#0a2e5c] font-black text-2xl tracking-tighter leading-none">SIMATS</span>
            <span className="text-[#0a2e5c] text-[8px] font-bold uppercase opacity-80">DEEMED TO BE UNIVERSITY</span>
            <span className="text-[#0a2e5c] text-[6px] font-medium uppercase mt-1 opacity-60">
              SAVEETHA INSTITUTE OF MEDICAL AND TECHNICAL SCIENCES
            </span>
          </div>
        </div>

        {/* Red Separator Bar */}
        <div className="h-2 w-full bg-[#ff0000] z-30"></div>

        <div className="flex-1 flex overflow-hidden relative z-10">
          {/* Main Ticket Info Section */}
          <div className="flex-[2.5] flex flex-col items-center justify-between p-8 py-10 relative">
            <div className="text-center">
               <h3 className="text-primary font-black text-7xl tracking-tighter uppercase italic leading-none">
                 MADMATRIX
               </h3>
               <p className="text-white font-bold text-xs tracking-[0.6em] uppercase opacity-80 mt-2">NATIONAL LEVEL SYMPOSIUM</p>
            </div>

            {/* Name and Authorized Person Label */}
            <div className="w-full flex flex-col items-center gap-1">
               <span className="text-white/40 font-mono text-[10px] tracking-[0.4em] uppercase">AUTHORIZED PERSON</span>
               <div className="w-[85%] h-[1px] bg-white/20 my-1"></div>
               <span className="text-white font-black text-4xl tracking-tight uppercase leading-tight text-center">
                 {name || "WELCOME MADMATRIX !"}
               </span>
               <div className="w-[85%] h-[1px] bg-white/20 my-1"></div>
            </div>

            <div className="w-full flex items-center justify-center gap-16 text-white">
              <div className="flex flex-col items-center">
                <span className="font-black text-2xl tracking-tighter">MAR 13-14</span>
                <span className="text-[10px] font-bold uppercase opacity-50 tracking-widest">DATES</span>
              </div>
              <div className="w-[1px] h-10 bg-white/20"></div>
              <div className="flex flex-col items-center">
                <span className="font-black text-2xl tracking-tighter uppercase">SIMATS</span>
                <span className="text-[10px] font-bold uppercase opacity-50 tracking-widest">CAMPUS</span>
              </div>
            </div>

            <div className="absolute bottom-6 w-full text-center">
               <p className="text-primary font-black text-sm tracking-[0.2em] uppercase">
                 VENUE: SIMATS ENGINEERING CAMPUS, CHENNAI
               </p>
            </div>
          </div>

          {/* Ticket Stub Divider */}
          <div className="w-[1px] h-full border-l-2 border-dashed border-white/20"></div>

          {/* Ticket Stub Section */}
          <div className="flex-1 bg-black/40 flex flex-col items-center justify-between p-6 py-10 relative">
            <div className="w-full text-center space-y-1">
              <p className="text-white font-black text-xs uppercase tracking-tighter">SIMATS ENGINEERING</p>
              <p className="text-primary font-black text-sm uppercase tracking-tight">MAR 13-14, 2026</p>
            </div>

            <div className="flex items-center justify-center">
              <div className="bg-white p-2 rounded-sm w-32 h-32 flex items-center justify-center shadow-lg">
                 <img 
                  src={qrUrl} 
                  alt="Registration QR" 
                  className="w-28 h-28"
                  crossOrigin="anonymous"
                  width="112"
                  height="112"
                />
              </div>
            </div>

            <div className="text-center px-1 space-y-1">
               <p className="text-[10px] text-white font-bold uppercase leading-tight">
                 YOUR PAYMENT HAS BEEN RECEIVED.
               </p>
               <p className="text-[9px] text-white/70 font-medium uppercase">
                 THANKS FOR REGISTERING!
               </p>
               <span className="text-primary font-black tracking-[0.2em] mt-2 block text-xs uppercase">GET INTO MATRIX !</span>
            </div>

            <div className="text-center space-y-1">
               <p className="text-[12px] text-primary font-black font-mono tracking-tighter">{regNo}</p>
               <div className="flex items-center justify-center gap-1.5">
                 <div className="h-1.5 w-1.5 rounded-full bg-[#22c55e]"></div>
                 <p className="text-[9px] text-[#22c55e] font-black uppercase tracking-tighter">VERIFIED_ENTRY</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Ticket.displayName = "Ticket";
