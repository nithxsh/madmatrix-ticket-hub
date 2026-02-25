
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
        className="relative flex flex-col overflow-hidden bg-black select-none border border-white/10"
        style={{ 
          width: "850px", 
          height: "330px", 
          minWidth: "850px", 
          minHeight: "330px",
          fontFamily: "'Inter', sans-serif"
        }}
      >
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0 pointer-events-none w-[850px] h-[330px] bg-black">
          <img 
            src={bgImage} 
            alt="" 
            className="w-full h-full object-cover opacity-20"
            crossOrigin="anonymous"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Header - Rigid Grid Layout */}
        <div className="relative h-[65px] bg-white z-30 flex items-center px-10 border-b-2 border-[#ff0000] justify-between">
          {/* Left Side: SIMATS ENGINEERING */}
          <div className="flex flex-col items-start justify-center">
            <span className="text-[#0a2e5c] font-black text-2xl tracking-tighter leading-none">SIMATS</span>
            <span className="text-[#0a2e5c] text-[9px] font-extrabold tracking-[0.2em] uppercase leading-none mt-0.5">ENGINEERING</span>
          </div>

          {/* Right Side: SIMATS Deemed to be University */}
          <div className="flex flex-col items-end text-right justify-center">
            <div className="flex flex-col items-end">
              <span className="text-[#0a2e5c] font-black text-2xl tracking-tighter leading-none">SIMATS</span>
              <span className="text-[#0a2e5c] text-[8px] font-bold uppercase tracking-[0.05em] leading-none mb-1">DEEMED TO BE UNIVERSITY</span>
            </div>
            <span className="text-[#0a2e5c] text-[5.5px] font-semibold uppercase tracking-tight opacity-90 leading-none">
              SAVEETHA INSTITUTE OF MEDICAL AND TECHNICAL SCIENCES
            </span>
          </div>
        </div>

        {/* Ticket Body - Grid Main + Stub */}
        <div className="relative z-10 flex h-[265px] w-[850px]">
          {/* Main Section - Center Aligned Container */}
          <div className="w-[600px] h-full flex flex-col items-center justify-between py-6 px-10">
            <div className="text-center w-full">
               <h3 className="text-primary font-black text-6xl tracking-tighter uppercase italic leading-none drop-shadow-md">
                 MADMATRIX
               </h3>
               <p className="text-white font-bold text-[8px] tracking-[0.5em] uppercase opacity-60 mt-2">NATIONAL LEVEL SYMPOSIUM</p>
            </div>

            {/* Personnel Container - Fixed Positioning */}
            <div className="w-full flex flex-col items-center justify-center">
               <span className="text-white/40 font-mono text-[7px] tracking-[0.3em] uppercase mb-2">AUTHORIZED PERSON</span>
               <div className="w-24 h-[1px] bg-white/10 mb-3"></div>
               <span className="text-white font-black text-3xl tracking-tight uppercase leading-none text-center max-w-[500px] truncate">
                 {name || "WELCOME MADMATRIX !"}
               </span>
               <div className="w-24 h-[1px] bg-white/10 mt-4"></div>
            </div>

            {/* Info Grid */}
            <div className="w-full flex items-center justify-center gap-16 text-white">
              <div className="flex flex-col items-center">
                <span className="font-black text-2xl tracking-tighter">MAR 13-14</span>
                <span className="text-[7px] font-bold uppercase opacity-50 tracking-widest">EVENT DATES</span>
              </div>
              <div className="w-[1px] h-10 bg-white/10"></div>
              <div className="flex flex-col items-center">
                <span className="font-black text-2xl tracking-tighter uppercase">SIMATS</span>
                <span className="text-[7px] font-bold uppercase opacity-50 tracking-widest">LOCATION</span>
              </div>
            </div>

            <div className="text-center">
               <p className="text-primary font-black text-[10px] tracking-[0.25em] uppercase">
                 SIMATS ENGINEERING CAMPUS, CHENNAI
               </p>
            </div>
          </div>

          {/* Vertical Divider - Perforated Look */}
          <div className="w-[2px] h-full flex flex-col justify-between py-2">
            <div className="flex-1 border-l-2 border-dashed border-white/20"></div>
          </div>

          {/* Stub Section */}
          <div className="w-[248px] h-full bg-black/40 flex flex-col items-center pt-8 pb-4 px-6">
            <div className="text-center mb-6">
              <p className="text-white font-black text-[7px] uppercase tracking-tighter opacity-40">SIMATS ENGINEERING</p>
              <p className="text-primary font-black text-[11px] uppercase tracking-tight">MARCH 13-14, 2026</p>
            </div>

            {/* QR Container - Standard Centering */}
            <div className="bg-white p-2 rounded-sm shadow-2xl mb-6">
               <img 
                src={qrUrl} 
                alt="QR_VERIFY" 
                className="w-20 h-20 block"
                crossOrigin="anonymous"
                width="80"
                height="80"
              />
            </div>

            <div className="text-center space-y-1 mb-6">
               <p className="text-[9px] text-white font-black uppercase leading-tight tracking-widest">
                 ENTRY GRANTED
               </p>
               <span className="text-primary font-black tracking-[0.15em] text-[10px] uppercase">GET INTO MATRIX !</span>
            </div>

            <div className="text-center mt-auto w-full">
               <p className="text-sm text-primary font-black font-mono tracking-tighter leading-none">{regNo}</p>
               <div className="flex items-center justify-center gap-1.5 mt-2">
                 <div className="h-1.5 w-1.5 rounded-full bg-[#22c55e]"></div>
                 <p className="text-[7px] text-[#22c55e] font-black uppercase tracking-tighter">SECURED_CREDENTIAL</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Ticket.displayName = "Ticket";
