"use client";

import React from "react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

interface TicketProps {
  name: string;
  regNo: string;
  id: string;
}

export const Ticket = React.forwardRef<HTMLDivElement, TicketProps>(
  ({ name, regNo, id }, ref) => {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent("https://www.madmatrix.site/")}&size=250x250&color=000000&bgcolor=ffffff`;
    
    const bgImage = PlaceHolderImages.find(img => img.id === "ticket-template")?.imageUrl || "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1080";

    return (
      <div
        ref={ref}
        id={id}
        className={cn(
          "relative overflow-hidden bg-black select-none border border-white/10 shadow-2xl",
          "md:w-[1000px] md:h-[400px] md:min-w-[1000px] md:min-h-[400px]",
          "w-[95vw] h-auto min-h-[500px] p-[10px] md:p-0",
          "transform md:scale-100 scale-[0.9] origin-top"
        )}
        style={{ 
          fontFamily: "'Inter', sans-serif",
          zIndex: 1,
          backgroundColor: "#000000"
        }}
      >
        {/* 1. Background Layer */}
        <div 
          style={{ 
            position: "absolute", 
            top: 0, 
            left: 0, 
            width: "100%", 
            height: "100%", 
            zIndex: 0 
          }}
        >
          <img 
            src={bgImage} 
            alt="" 
            className="w-full h-full object-cover opacity-20"
            crossOrigin="anonymous"
          />
        </div>

        {/* 2. Absolute Header - Edge-Lock with Responsive stacking classes */}
        <div 
          className={cn(
            "flex flex-col md:flex-row items-center justify-between",
            "absolute top-0 left-0 w-full min-h-[75px] bg-white border-b-[3px] border-[#ff0000] z-10 box-border p-[10px_30px]"
          )}
        >
          {/* Left Branding */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span style={{ color: "#0a2e5c", fontWeight: 900, fontSize: "28px", letterSpacing: "-0.05em", lineHeight: 1, display: "block" }}>SIMATS</span>
            <span style={{ color: "#0a2e5c", fontSize: "10px", fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "2px", display: "block" }}>ENGINEERING</span>
          </div>

          {/* Right Branding */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right mt-2 md:mt-0">
            <div style={{ display: "block" }}>
              <span style={{ color: "#0a2e5c", fontWeight: 900, fontSize: "24px", letterSpacing: "-0.05em", lineHeight: 1 }}>SIMATS</span>
              <span style={{ color: "#0a2e5c", fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginLeft: "4px" }}>DEEMED TO BE UNIVERSITY</span>
            </div>
            <span style={{ color: "#0a2e5c", fontSize: "6.5px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0", opacity: 0.9, display: "block", marginTop: "2px" }}>
              SAVEETHA INSTITUTE OF MEDICAL AND TECHNICAL SCIENCES
            </span>
          </div>
        </div>

        {/* 3. Main Body - MadMatrix Branding */}
        <div 
          className={cn(
            "absolute z-15 text-center px-4",
            "md:top-[110px] md:left-0 md:w-[650px] md:px-0",
            "top-[120px] left-0 w-full"
          )}
        >
           <h3 className={cn(
             "text-primary font-black uppercase italic leading-none m-0",
             "text-4xl md:text-[72px] tracking-tighter"
           )}>
             MADMATRIX
           </h3>
           <p className="text-white/60 font-bold text-[8px] md:text-[10px] tracking-[0.6em] uppercase mt-[10px]">NATIONAL LEVEL SYMPOSIUM</p>
        </div>

        {/* 4. Name Layer - Strict Absolute Positioning */}
        <div className={cn(
          "absolute z-[100] text-center",
          "md:top-[220px] md:left-0 md:w-[650px]",
          "top-[190px] left-0 w-full"
        )}>
           <span className="text-white/40 font-mono text-[8px] tracking-[0.4em] uppercase block">AUTHORIZED PERSON</span>
           <div className="min-h-[40px] md:h-[60px] flex items-center justify-center mt-[5px]">
             <span className={cn(
               "text-white font-black uppercase leading-none whitespace-nowrap tracking-tighter",
               "text-[1.2rem] md:text-[38px]"
             )}>
               {name || "WELCOME MADMATRIX !"}
             </span>
           </div>
        </div>

        {/* 5. Bottom Info - Split-Anchor Pixel Positioning */}
        <div className={cn(
          "absolute text-center text-white z-15",
          "md:left-[100px] md:bottom-[40px] md:w-[150px]",
          "left-[5%] bottom-[20px] w-auto"
        )}>
           <span className="font-black text-xl md:text-[28px] tracking-tighter leading-none block">MAR 13-14</span>
           <span className="text-[8px] font-bold uppercase opacity-50 tracking-[0.2em] block mt-[4px]">EVENT DATES</span>
        </div>

        <div className={cn(
          "absolute text-center text-white z-15",
          "md:left-[350px] md:bottom-[40px] md:w-[150px]",
          "left-[50%] bottom-[20px] w-auto -translate-x-1/2 md:translate-x-0"
        )}>
           <span className="font-black text-xl md:text-[28px] tracking-tighter leading-none uppercase block">SIMATS</span>
           <span className="text-[8px] font-bold uppercase opacity-50 tracking-[0.2em] block mt-[4px]">LOCATION</span>
        </div>

        {/* 6. Vertical Dashed Divider */}
        <div className="hidden md:block absolute left-[680px] top-[75px] width-[2px] height-[325px] border-l-[2px] border-dashed border-white/20 z-10"></div>

        {/* 7. Right Panel (QR Stub) - Strict Absolute Coordinate System */}
        <div 
          id="qr-panel"
          className={cn(
            "absolute z-20 text-center",
            "md:right-[40px] md:top-[110px] md:w-[220px]",
            "right-[20px] top-[260px] w-[100px]"
          )}
        >
          <div className="bg-white p-2 md:p-[10px] rounded-[4px] mx-auto w-full max-w-[160px] shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
             <img 
              src={qrUrl} 
              alt="QR" 
              crossOrigin="anonymous"
              className="w-full h-auto block image-pixelated"
            />
          </div>

          <div className="mt-[10px] md:mt-[20px]">
             <p className="text-[8px] md:text-[11px] text-white font-black uppercase m-0 tracking-[0.2em]">
               ENTRY GRANTED
             </p>
             <p className="text-primary font-black text-[8px] md:text-[12px] uppercase tracking-[0.25em] mt-[5px]">
               GET INTO MATRIX !
             </p>
          </div>

          <div className="mt-[10px] md:mt-[20px] flex flex-col items-center gap-[4px] md:gap-[8px]">
             <p className="text-sm md:text-[16px] text-primary font-black font-mono m-0">{regNo}</p>
             <div className="flex items-center gap-[4px] md:gap-[8px]">
               <div className="h-[5px] w-[5px] md:h-[7px] md:w-[7px] rounded-full bg-[#22c55e] shadow-[0_0_5px_#22c55e]"></div>
               <p className="text-[6px] md:text-[8px] text-[#22c55e] font-black uppercase m-0 tracking-[0.15em]">SECURED_CREDENTIAL</p>
             </div>
          </div>
        </div>
      </div>
    );
  }
);

Ticket.displayName = "Ticket";
