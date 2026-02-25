
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
            className="w-full h-full object-cover opacity-25"
            crossOrigin="anonymous"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Header - Recreated based on reference image */}
        <div className="relative h-[65px] bg-white z-30 overflow-hidden flex items-center px-8 border-b-2 border-[#ff0000]">
          {/* Left Side: SIMATS ENGINEERING */}
          <div className="flex flex-col items-start">
            <span className="text-[#0a2e5c] font-black text-2xl tracking-tighter leading-none">SIMATS</span>
            <span className="text-[#0a2e5c] text-[9px] font-bold tracking-[0.2em] uppercase leading-none mt-0.5">ENGINEERING</span>
          </div>

          <div className="flex-1"></div>

          {/* Right Side: SIMATS Deemed to be University */}
          <div className="flex flex-col items-end text-right">
            <span className="text-[#0a2e5c] font-black text-2xl tracking-tighter leading-none">SIMATS</span>
            <span className="text-[#0a2e5c] text-[8px] font-bold uppercase tracking-[0.05em] leading-none mb-1">DEEMED TO BE UNIVERSITY</span>
            <span className="text-[#0a2e5c] text-[5.5px] font-medium uppercase tracking-tight opacity-80 leading-none">
              SAVEETHA INSTITUTE OF MEDICAL AND TECHNICAL SCIENCES
            </span>
          </div>
        </div>

        {/* Ticket Body - Remaining height 265px */}
        <div className="relative z-10 flex h-[265px] w-[850px]">
          {/* Main Section - 600px width */}
          <div className="w-[600px] h-full flex flex-col items-center justify-between py-6 px-8">
            <div className="text-center">
               <h3 className="text-primary font-black text-5xl tracking-tighter uppercase italic leading-none">
                 MADMATRIX
               </h3>
               <p className="text-white font-bold text-[8px] tracking-[0.4em] uppercase opacity-70 mt-1">NATIONAL LEVEL SYMPOSIUM</p>
            </div>

            {/* Name and Authorized Person Label */}
            <div className="w-full flex flex-col items-center">
               <span className="text-white/40 font-mono text-[8px] tracking-[0.2em] uppercase mb-1">AUTHORIZED PERSON</span>
               <div className="w-32 h-[1px] bg-white/20 mb-2"></div>
               <span className="text-white font-black text-3xl tracking-tight uppercase leading-none text-center px-4 break-words">
                 {name || "WELCOME MADMATRIX !"}
               </span>
               <div className="w-32 h-[1px] bg-white/20 mt-3"></div>
            </div>

            <div className="w-full flex items-center justify-center gap-12 text-white">
              <div className="flex flex-col items-center">
                <span className="font-black text-xl tracking-tighter">MAR 13-14</span>
                <span className="text-[7px] font-bold uppercase opacity-50 tracking-widest">DATES</span>
              </div>
              <div className="w-[1px] h-8 bg-white/20"></div>
              <div className="flex flex-col items-center">
                <span className="font-black text-xl tracking-tighter uppercase">SIMATS</span>
                <span className="text-[7px] font-bold uppercase opacity-50 tracking-widest">CAMPUS</span>
              </div>
            </div>

            <div className="text-center">
               <p className="text-primary font-black text-[9px] tracking-[0.2em] uppercase">
                 VENUE: SIMATS ENGINEERING CAMPUS, CHENNAI
               </p>
            </div>
          </div>

          {/* Vertical Divider - Perforated Look */}
          <div className="w-[2px] h-full flex flex-col justify-between py-2">
            <div className="flex-1 border-l-2 border-dashed border-white/20"></div>
          </div>

          {/* Stub Section - 248px width */}
          <div className="w-[248px] h-full bg-black/40 flex flex-col items-center pt-6 pb-4 px-4">
            <div className="text-center mb-6">
              <p className="text-white font-black text-[8px] uppercase tracking-tighter opacity-50">SIMATS ENGINEERING</p>
              <p className="text-primary font-black text-[10px] uppercase tracking-tight">MAR 13-14, 2026</p>
            </div>

            <div className="bg-white p-1.5 rounded-sm shadow-xl mb-6">
               <img 
                src={qrUrl} 
                alt="QR" 
                className="w-20 h-20 block"
                crossOrigin="anonymous"
                width="80"
                height="80"
              />
            </div>

            <div className="text-center space-y-0.5 mb-4">
               <p className="text-[8px] text-white font-black uppercase leading-tight">
                 PAYMENT RECEIVED
               </p>
               <span className="text-primary font-black tracking-[0.1em] text-[9px] uppercase">GET INTO MATRIX !</span>
            </div>

            <div className="text-center mt-auto">
               <p className="text-xs text-primary font-black font-mono tracking-tighter leading-none">{regNo}</p>
               <div className="flex items-center justify-center gap-1 mt-1">
                 <div className="h-1 w-1 rounded-full bg-[#22c55e]"></div>
                 <p className="text-[7px] text-[#22c55e] font-black uppercase tracking-tighter">VERIFIED_ENTRY</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Ticket.displayName = "Ticket";
