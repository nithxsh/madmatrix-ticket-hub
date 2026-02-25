
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
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent("https://www.madmatrix.site/")}&size=250x250&color=000000&bgcolor=ffffff`;
    
    const bgImage = PlaceHolderImages.find(img => img.id === "ticket-template")?.imageUrl || "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1080";

    return (
      <div
        ref={ref}
        id={id}
        className="relative overflow-hidden bg-black select-none border border-white/10 shadow-2xl"
        style={{ 
          width: "1000px", 
          height: "400px", 
          minWidth: "1000px", 
          minHeight: "400px",
          fontFamily: "'Inter', sans-serif",
          boxSizing: "border-box",
          position: "relative",
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
            width: "1000px", 
            height: "400px", 
            zIndex: 0 
          }}
        >
          <img 
            src={bgImage} 
            alt="" 
            className="w-full h-full object-cover opacity-20"
            crossOrigin="anonymous"
            style={{ width: "1000px", height: "400px", display: "block" }}
          />
        </div>

        {/* 2. Absolute Header - Edge-Lock */}
        <div 
          style={{ 
            position: "absolute", 
            top: 0, 
            left: 0, 
            width: "1000px", 
            height: "75px", 
            backgroundColor: "white", 
            borderBottom: "3px solid #ff0000",
            zIndex: 10,
            boxSizing: "border-box"
          }}
        >
          {/* Left Branding */}
          <div 
            style={{ 
              position: "absolute", 
              left: "30px", 
              top: "15px", 
              textAlign: "left" 
            }}
          >
            <span style={{ color: "#0a2e5c", fontWeight: 900, fontSize: "28px", letterSpacing: "-0.05em", lineHeight: 1, display: "block" }}>SIMATS</span>
            <span style={{ color: "#0a2e5c", fontSize: "10px", fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "2px", display: "block" }}>ENGINEERING</span>
          </div>

          {/* Right Branding */}
          <div 
            style={{ 
              position: "absolute", 
              right: "30px", 
              top: "15px", 
              textAlign: "right" 
            }}
          >
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
          style={{ 
            position: "absolute", 
            top: "110px", 
            left: "0", 
            width: "650px", 
            textAlign: "center",
            zIndex: 15
          }}
        >
           <h3 style={{ color: "hsl(var(--primary))", fontWeight: 900, fontSize: "72px", letterSpacing: "-0.05em", textTransform: "uppercase", fontStyle: "italic", margin: 0, lineHeight: 1 }}>
             MADMATRIX
           </h3>
           <p style={{ color: "rgba(255,255,255,0.6)", fontWeight: 700, fontSize: "10px", letterSpacing: "0.6em", textTransform: "uppercase", margin: "10px 0 0 0" }}>NATIONAL LEVEL SYMPOSIUM</p>
        </div>

        {/* 4. Name Layer - Strict Absolute Positioning */}
        <div style={{ 
          position: "absolute", 
          top: "220px", 
          left: 0, 
          width: "650px", 
          textAlign: "center",
          zIndex: 100 
        }}>
           <span style={{ color: "rgba(255,255,255,0.4)", fontFamily: "monospace", fontSize: "8px", letterSpacing: "0.4em", textTransform: "uppercase", display: "block" }}>AUTHORIZED PERSON</span>
           <div style={{ height: "60px", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "5px" }}>
             <span style={{ color: "white", fontWeight: 900, fontSize: "38px", letterSpacing: "-0.02em", textTransform: "uppercase", lineHeight: 1, whiteSpace: "nowrap" }}>
               {name || "WELCOME MADMATRIX !"}
             </span>
           </div>
        </div>

        {/* 5. Bottom Info - Split-Anchor Pixel Positioning */}
        <div style={{ 
          position: "absolute", 
          left: "100px", 
          bottom: "40px", 
          width: "150px", 
          textAlign: "center", 
          color: "white", 
          zIndex: 15 
        }}>
           <span style={{ fontWeight: 900, fontSize: "28px", letterSpacing: "-0.05em", lineHeight: 1, display: "block" }}>MAR 13-14</span>
           <span style={{ fontSize: "8px", fontWeight: 700, textTransform: "uppercase", opacity: 0.5, letterSpacing: "0.2em", display: "block", marginTop: "4px" }}>EVENT DATES</span>
        </div>

        <div style={{ 
          position: "absolute", 
          left: "350px", 
          bottom: "40px", 
          width: "150px", 
          textAlign: "center", 
          color: "white", 
          zIndex: 15 
        }}>
           <span style={{ fontWeight: 900, fontSize: "28px", letterSpacing: "-0.05em", lineHeight: 1, textTransform: "uppercase", display: "block" }}>SIMATS</span>
           <span style={{ fontSize: "8px", fontWeight: 700, textTransform: "uppercase", opacity: 0.5, letterSpacing: "0.2em", display: "block", marginTop: "4px" }}>LOCATION</span>
        </div>

        {/* 6. Vertical Dashed Divider */}
        <div style={{ position: "absolute", left: "680px", top: "75px", width: "2px", height: "325px", borderLeft: "2px dashed rgba(255,255,255,0.2)", zIndex: 10 }}></div>

        {/* 7. Right Panel (QR Stub) - Strict Absolute Coordinate System */}
        <div 
          id="qr-panel"
          style={{ 
            position: "absolute", 
            right: "40px", 
            top: "110px", 
            width: "220px", 
            textAlign: "center",
            zIndex: 20
          }}
        >
          <div style={{ background: "white", padding: "10px", borderRadius: "4px", margin: "0 auto", width: "160px", height: "160px", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
             <img 
              src={qrUrl} 
              alt="QR" 
              crossOrigin="anonymous"
              style={{ 
                width: "140px", 
                height: "140px", 
                display: "block",
                imageRendering: "pixelated"
              }}
            />
          </div>

          <div style={{ marginTop: "20px" }}>
             <p style={{ fontSize: "11px", color: "white", fontWeight: 900, textTransform: "uppercase", margin: 0, letterSpacing: "0.2em" }}>
               ENTRY GRANTED
             </p>
             <p style={{ color: "hsl(var(--primary))", fontWeight: 900, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.25em", marginTop: "5px" }}>
               GET INTO MATRIX !
             </p>
          </div>

          <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
             <p style={{ fontSize: "16px", color: "hsl(var(--primary))", fontWeight: 900, fontFamily: "monospace", margin: 0 }}>{regNo}</p>
             <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
               <div style={{ height: "7px", width: "7px", borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 5px #22c55e" }}></div>
               <p style={{ fontSize: "8px", color: "#22c55e", fontWeight: 900, textTransform: "uppercase", margin: 0, letterSpacing: "0.15em" }}>SECURED_CREDENTIAL</p>
             </div>
          </div>
        </div>
      </div>
    );
  }
);

Ticket.displayName = "Ticket";
