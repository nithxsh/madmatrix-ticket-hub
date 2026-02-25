
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
        style={{ 
          width: "850px", 
          height: "480px", 
          minWidth: "850px", 
          minHeight: "480px",
          fontFamily: "'Inter', sans-serif"
        }}
      >
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0 pointer-events-none w-[850px] h-[480px] bg-black">
          <img 
            src={bgImage} 
            alt="" 
            className="w-full h-full object-cover opacity-25"
            crossOrigin="anonymous"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Header - Fixed Height 95px with Absolute Positioning for Alignment Stability */}
        <div className="relative h-[95px] bg-white z-30">
          {/* Left Corner Branding */}
          <div className="absolute left-10 top-1/2 -translate-y-1/2 flex flex-col">
            <span className="text-[#0a2e5c] font-black text-2xl tracking-tighter leading-none">SIMATS</span>
            <span className="text-[#0a2e5c] text-[10px] font-bold tracking-[0.2em] uppercase">ENGINEERING</span>
          </div>

          {/* Right Corner Branding */}
          <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col items-end text-right">
            <span className="text-[#0a2e5c] font-black text-2xl tracking-tighter leading-none">SIMATS</span>
            <span className="text-[#0a2e5c] text-[8px] font-bold uppercase opacity-80 leading-none">DEEMED TO BE UNIVERSITY</span>
            <span className="text-[#0a2e5c] text-[6px] font-medium uppercase mt-1 opacity-60 leading-tight">
              SAVEETHA INSTITUTE OF MEDICAL AND TECHNICAL SCIENCES
            </span>
          </div>
        </div>

        {/* Red Separator Bar - Fixed Height 8px */}
        <div className="h-2 w-full bg-[#ff0000] z-30"></div>

        {/* Ticket Body - Fixed height 377px */}
        <div className="relative z-10 flex h-[377px] w-[850px]">
          {/* Main Section - Fixed Width 600px */}
          <div className="w-[600px] h-full flex flex-col items-center justify-between py-10 px-8">
            <div className="text-center">
               <h3 className="text-primary font-black text-7xl tracking-tighter uppercase italic leading-none">
                 MADMATRIX
               </h3>
               <p className="text-white font-bold text-xs tracking-[0.5em] uppercase opacity-80 mt-2">NATIONAL LEVEL SYMPOSIUM</p>
            </div>

            {/* Name and Authorized Person Label - Increased Spacing for PDF Stability */}
            <div className="w-full flex flex-col items-center mt-4">
               <span className="text-white/40 font-mono text-[9px] tracking-[0.3em] uppercase mb-1">AUTHORIZED PERSON</span>
               <div className="w-48 h-[1px] bg-white/20 mb-4"></div>
               <span className="text-white font-black text-4xl tracking-tight uppercase leading-none text-center px-4">
                 {name || "WELCOME MADMATRIX !"}
               </span>
               <div className="w-48 h-[1px] bg-white/20 mt-5"></div>
            </div>

            <div className="w-full flex items-center justify-center gap-16 text-white mb-2">
              <div className="flex flex-col items-center">
                <span className="font-black text-2xl tracking-tighter">MAR 13-14</span>
                <span className="text-[9px] font-bold uppercase opacity-50 tracking-widest">DATES</span>
              </div>
              <div className="w-[1px] h-10 bg-white/20"></div>
              <div className="flex flex-col items-center">
                <span className="font-black text-2xl tracking-tighter uppercase">SIMATS</span>
                <span className="text-[9px] font-bold uppercase opacity-50 tracking-widest">CAMPUS</span>
              </div>
            </div>

            <div className="text-center">
               <p className="text-primary font-black text-xs tracking-[0.2em] uppercase">
                 VENUE: SIMATS ENGINEERING CAMPUS, CHENNAI
               </p>
            </div>
          </div>

          {/* Vertical Divider Line */}
          <div className="w-[2px] h-full flex flex-col justify-between py-4">
            <div className="flex-1 border-l-2 border-dashed border-white/20"></div>
          </div>

          {/* Stub Section - Fixed Width 248px with Explicit Layout */}
          <div className="w-[248px] h-full bg-black/40 flex flex-col items-center pt-10 pb-8 px-6">
            <div className="text-center mb-10">
              <p className="text-white font-black text-[10px] uppercase tracking-tighter opacity-60">SIMATS ENGINEERING</p>
              <p className="text-primary font-black text-xs uppercase tracking-tight">MAR 13-14, 2026</p>
            </div>

            <div className="bg-white p-2 rounded-sm shadow-xl mb-10">
               <img 
                src={qrUrl} 
                alt="QR" 
                className="w-24 h-24 block"
                crossOrigin="anonymous"
                width="96"
                height="96"
              />
            </div>

            <div className="text-center space-y-1 mb-10">
               <p className="text-[9px] text-white font-black uppercase leading-tight">
                 PAYMENT RECEIVED
               </p>
               <span className="text-primary font-black tracking-[0.1em] text-[10px] uppercase">GET INTO MATRIX !</span>
            </div>

            <div className="text-center mt-auto">
               <p className="text-sm text-primary font-black font-mono tracking-tighter">{regNo}</p>
               <div className="flex items-center justify-center gap-1 mt-1">
                 <div className="h-1.5 w-1.5 rounded-full bg-[#22c55e]"></div>
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
