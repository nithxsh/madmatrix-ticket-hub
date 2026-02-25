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
          boxSizing: "border-box",
          position: "relative"
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

        {/* Header - Hard-Lock Table Method */}
        <table 
          style={{ 
            width: "850px", 
            height: "65px", 
            background: "white", 
            borderBottom: "2px solid #ff0000",
            borderCollapse: "collapse",
            position: "relative",
            zIndex: 100,
            tableLayout: "fixed"
          }}
        >
          <tbody>
            <tr>
              <td style={{ textAlign: "left", paddingLeft: "40px", verticalAlign: "middle", width: "425px" }}>
                <div style={{ display: "inline-block", textAlign: "left" }}>
                  <span style={{ color: "#0a2e5c", fontWeight: 900, fontSize: "24px", letterSpacing: "-0.05em", lineHeight: 1, display: "block" }}>SIMATS</span>
                  <span style={{ color: "#0a2e5c", fontSize: "9px", fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "2px", display: "block" }}>ENGINEERING</span>
                </div>
              </td>
              <td style={{ textAlign: "right", paddingRight: "40px", verticalAlign: "middle", width: "425px" }}>
                <div style={{ display: "inline-block", textAlign: "right" }}>
                  <div style={{ display: "block" }}>
                    <span style={{ color: "#0a2e5c", fontWeight: 900, fontSize: "24px", letterSpacing: "-0.05em", lineHeight: 1 }}>SIMATS</span>
                    <span style={{ color: "#0a2e5c", fontSize: "8px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginLeft: "4px" }}>DEEMED TO BE UNIVERSITY</span>
                  </div>
                  <span style={{ color: "#0a2e5c", fontSize: "5.5px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0", opacity: 0.9, display: "block", marginTop: "2px" }}>
                    SAVEETHA INSTITUTE OF MEDICAL AND TECHNICAL SCIENCES
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Main Content Area */}
        <div className="relative" style={{ height: "265px", width: "850px" }}>
          
          {/* Main Column */}
          <div style={{ width: "600px", height: "265px", position: "absolute", left: 0, top: 0, zIndex: 10 }}>
            
            {/* Logo Center */}
            <div style={{ position: "absolute", top: "30px", left: "0", width: "600px", textAlign: "center" }}>
               <h3 style={{ color: "hsl(var(--primary))", fontWeight: 900, fontSize: "60px", letterSpacing: "-0.05em", textTransform: "uppercase", fontStyle: "italic", margin: 0, lineHeight: 1 }}>
                 MADMATRIX
               </h3>
               <p style={{ color: "rgba(255,255,255,0.6)", fontWeight: 700, fontSize: "8px", letterSpacing: "0.5em", textTransform: "uppercase", margin: "8px 0 0 0" }}>NATIONAL LEVEL SYMPOSIUM</p>
            </div>

            {/* Attendee Name - Hard-Lock Absolute Layer */}
            <div style={{ 
              position: "absolute", 
              top: "125px", 
              left: "0", 
              width: "600px", 
              textAlign: "center",
              zIndex: 50 
            }}>
               <span style={{ color: "rgba(255,255,255,0.4)", fontFamily: "monospace", fontSize: "7px", letterSpacing: "0.3em", textTransform: "uppercase", display: "block" }}>AUTHORIZED PERSON</span>
               <div style={{ width: "100px", height: "1px", background: "rgba(255,255,255,0.1)", margin: "8px auto" }}></div>
               <div style={{ height: "45px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                 <span style={{ color: "white", fontWeight: 900, fontSize: "32px", letterSpacing: "-0.02em", textTransform: "uppercase", lineHeight: 1 }}>
                   {name || "WELCOME MADMATRIX !"}
                 </span>
               </div>
               <div style={{ width: "100px", height: "1px", background: "rgba(255,255,255,0.1)", margin: "8px auto" }}></div>
            </div>

            {/* Bottom Info Labels - Hard-Lock Fixed Widths */}
            <div style={{ position: "absolute", bottom: "45px", left: "120px", width: "150px", textAlign: "center", color: "white" }}>
               <span style={{ fontWeight: 900, fontSize: "24px", letterSpacing: "-0.05em", lineHeight: 1, display: "block" }}>MAR 13-14</span>
               <span style={{ fontSize: "7px", fontWeight: 700, textTransform: "uppercase", opacity: 0.5, letterSpacing: "0.2em", display: "block" }}>EVENT DATES</span>
            </div>

            <div style={{ position: "absolute", bottom: "45px", right: "120px", width: "150px", textAlign: "center", color: "white" }}>
               <span style={{ fontWeight: 900, fontSize: "24px", letterSpacing: "-0.05em", lineHeight: 1, textTransform: "uppercase", display: "block" }}>SIMATS</span>
               <span style={{ fontSize: "7px", fontWeight: 700, textTransform: "uppercase", opacity: 0.5, letterSpacing: "0.2em", display: "block" }}>LOCATION</span>
            </div>

            <div style={{ position: "absolute", bottom: "15px", left: "0", width: "600px", textAlign: "center" }}>
               <p style={{ color: "hsl(var(--primary))", fontWeight: 900, fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", margin: 0 }}>
                 SIMATS ENGINEERING CAMPUS, CHENNAI
               </p>
            </div>
          </div>

          {/* Vertical Divider */}
          <div style={{ position: "absolute", left: "600px", top: 0, width: "2px", height: "265px", borderLeft: "2px dashed rgba(255,255,255,0.2)" }}></div>

          {/* Stub Section - Hard-Lock Absolute */}
          <div style={{ position: "absolute", left: "602px", top: 0, width: "248px", height: "265px", background: "rgba(0,0,0,0.4)", zIndex: 10 }}>
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

            <div style={{ textAlign: "center" }}>
               <p style={{ fontSize: "9px", color: "white", fontWeight: 900, textTransform: "uppercase", margin: 0, letterSpacing: "0.1em" }}>
                 ENTRY GRANTED
               </p>
               <span style={{ color: "hsl(var(--primary))", fontWeight: 900, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.15em" }}>GET INTO MATRIX !</span>
            </div>

            <div style={{ position: "absolute", bottom: "20px", left: "0", width: "248px", textAlign: "center" }}>
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
