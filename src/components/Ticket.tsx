
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
        className="relative overflow-hidden bg-black select-none border border-white/10"
        style={{ 
          width: "850px", 
          height: "330px", 
          minWidth: "850px", 
          minHeight: "330px",
          fontFamily: "'Inter', sans-serif",
          boxSizing: "border-box"
        }}
      >
        {/* Background Layer */}
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ width: "850px", height: "330px" }}>
          <img 
            src={bgImage} 
            alt="" 
            className="w-full h-full object-cover opacity-20"
            crossOrigin="anonymous"
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        {/* Header - Using Table for Hard-Lock Alignment */}
        <table 
          style={{ 
            width: "100%", 
            height: "65px", 
            background: "white", 
            borderBottom: "2px solid #ff0000",
            borderCollapse: "collapse",
            position: "relative",
            zIndex: 50
          }}
        >
          <tbody>
            <tr>
              <td style={{ textAlign: "left", paddingLeft: "40px", verticalAlign: "middle", width: "50%" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ color: "#0a2e5c", fontWeight: 900, fontSize: "24px", letterSpacing: "-0.05em", lineHeight: 1 }}>SIMATS</span>
                  <span style={{ color: "#0a2e5c", fontSize: "9px", fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "2px" }}>ENGINEERING</span>
                </div>
              </td>
              <td style={{ textAlign: "right", paddingRight: "40px", verticalAlign: "middle", width: "50%" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                    <span style={{ color: "#0a2e5c", fontWeight: 900, fontSize: "24px", letterSpacing: "-0.05em", lineHeight: 1 }}>SIMATS</span>
                    <span style={{ color: "#0a2e5c", fontSize: "8px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "2px" }}>DEEMED TO BE UNIVERSITY</span>
                  </div>
                  <span style={{ color: "#0a2e5c", fontSize: "5.5px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0", opacity: 0.9 }}>
                    SAVEETHA INSTITUTE OF MEDICAL AND TECHNICAL SCIENCES
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Ticket Content Container */}
        <div className="relative" style={{ height: "265px", width: "850px", display: "flex" }}>
          
          {/* Main Section */}
          <div style={{ width: "600px", height: "100%", position: "relative", zIndex: 10 }}>
            
            {/* Logo Center */}
            <div style={{ position: "absolute", top: "30px", left: "0", right: "0", textAlign: "center" }}>
               <h3 style={{ color: "hsl(var(--primary))", fontWeight: 900, fontSize: "60px", letterSpacing: "-0.05em", textTransform: "uppercase", fontStyle: "italic", margin: 0, lineHeight: 1 }}>
                 MADMATRIX
               </h3>
               <p style={{ color: "rgba(255,255,255,0.6)", fontWeight: 700, fontSize: "8px", letterSpacing: "0.5em", textTransform: "uppercase", margin: "8px 0 0 0" }}>NATIONAL LEVEL SYMPOSIUM</p>
            </div>

            {/* Personnel - Forced Display Block and High Z-Index */}
            <div style={{ 
              position: "absolute", 
              top: "120px", 
              left: "0", 
              right: "0", 
              textAlign: "center",
              display: "block",
              zIndex: 999 
            }}>
               <span style={{ color: "rgba(255,255,255,0.4)", fontFamily: "monospace", fontSize: "7px", letterSpacing: "0.3em", textTransform: "uppercase" }}>AUTHORIZED PERSON</span>
               <div style={{ width: "100px", height: "1px", background: "rgba(255,255,255,0.1)", margin: "8px auto" }}></div>
               <div style={{ width: "500px", margin: "0 auto", height: "40px", display: "flex", alignItems: "center", justifyItems: "center" }}>
                 <span style={{ color: "white", fontWeight: 900, fontSize: "32px", letterSpacing: "-0.02em", textTransform: "uppercase", lineHeight: 1, width: "100%", textAlign: "center" }}>
                   {name || "WELCOME MADMATRIX !"}
                 </span>
               </div>
               <div style={{ width: "100px", height: "1px", background: "rgba(255,255,255,0.1)", margin: "8px auto" }}></div>
            </div>

            {/* Absolute Positioned Labels */}
            <div style={{ position: "absolute", bottom: "45px", left: "120px", textAlign: "center", color: "white" }}>
               <span style={{ fontWeight: 900, fontSize: "24px", letterSpacing: "-0.05em", lineHeight: 1 }}>MAR 13-14</span>
               <br />
               <span style={{ fontSize: "7px", fontWeight: 700, textTransform: "uppercase", opacity: 0.5, letterSpacing: "0.2em" }}>EVENT DATES</span>
            </div>

            <div style={{ position: "absolute", bottom: "45px", right: "120px", textAlign: "center", color: "white" }}>
               <span style={{ fontWeight: 900, fontSize: "24px", letterSpacing: "-0.05em", lineHeight: 1, textTransform: "uppercase" }}>SIMATS</span>
               <br />
               <span style={{ fontSize: "7px", fontWeight: 700, textTransform: "uppercase", opacity: 0.5, letterSpacing: "0.2em" }}>LOCATION</span>
            </div>

            <div style={{ position: "absolute", bottom: "15px", left: "0", right: "0", textAlign: "center" }}>
               <p style={{ color: "hsl(var(--primary))", fontWeight: 900, fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", margin: 0 }}>
                 SIMATS ENGINEERING CAMPUS, CHENNAI
               </p>
            </div>
          </div>

          {/* Vertical Divider */}
          <div style={{ width: "2px", height: "100%", borderLeft: "2px dashed rgba(255,255,255,0.2)" }}></div>

          {/* Stub Section */}
          <div style={{ width: "248px", height: "100%", background: "rgba(0,0,0,0.4)", position: "relative", zIndex: 10 }}>
            <div style={{ textAlign: "center", marginTop: "30px" }}>
              <p style={{ color: "rgba(255,255,255,0.4)", fontWeight: 900, fontSize: "7px", textTransform: "uppercase", margin: 0 }}>SIMATS ENGINEERING</p>
              <p style={{ color: "hsl(var(--primary))", fontWeight: 900, fontSize: "11px", textTransform: "uppercase", margin: "2px 0 0 0" }}>MARCH 13-14, 2026</p>
            </div>

            <div style={{ background: "white", padding: "8px", borderRadius: "2px", margin: "24px auto", width: "80px", height: "80px" }}>
               <img 
                src={qrUrl} 
                alt="QR" 
                crossOrigin="anonymous"
                style={{ width: "80px", height: "80px", display: "block" }}
              />
            </div>

            <div style={{ textAlign: "center", marginBottom: "20px" }}>
               <p style={{ fontSize: "9px", color: "white", fontWeight: 900, textTransform: "uppercase", margin: 0, letterSpacing: "0.1em" }}>
                 ENTRY GRANTED
               </p>
               <span style={{ color: "hsl(var(--primary))", fontWeight: 900, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.15em" }}>GET INTO MATRIX !</span>
            </div>

            <div style={{ position: "absolute", bottom: "20px", left: "0", right: "0", textAlign: "center" }}>
               <p style={{ fontSize: "14px", color: "hsl(var(--primary))", fontWeight: 900, fontFamily: "monospace", margin: 0 }}>{regNo}</p>
               <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginTop: "4px" }}>
                 <div style={{ height: "6px", width: "6px", borderRadius: "50%", background: "#22c55e" }}></div>
                 <p style={{ fontSize: "7px", color: "#22c55e", fontWeight: 900, textTransform: "uppercase", margin: 0 }}>SECURED_CREDENTIAL</p>
               </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
);

Ticket.displayName = "Ticket";
