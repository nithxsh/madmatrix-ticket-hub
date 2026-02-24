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
    // Updated QR color to match new Red/Crimson theme
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(regNo)}&size=150x150&color=ff0000&bgcolor=000000`;

    useEffect(() => {
      setSecureId(Math.random().toString(36).substring(7).toUpperCase());
    }, []);

    return (
      <div
        ref={ref}
        id={id}
        className="relative w-full max-w-[600px] aspect-[1.8/1] overflow-hidden rounded-xl shadow-[0_0_50px_rgba(255,0,0,0.2)] bg-black select-none border border-primary/30"
      >
        {/* Ticket Template Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/template.png"
            alt="Ticket Template"
            className="w-full h-full object-cover opacity-60 grayscale brightness-50 contrast-125"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://picsum.photos/seed/madmatrix-red/800/400";
            }}
          />
        </div>

        {/* Deep Red Overlays */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-background/60 via-transparent to-primary/5"></div>

        {/* Content Container */}
        <div className="absolute inset-0 z-20 p-8 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold drop-shadow-[0_0_8px_rgba(255,0,0,0.5)]">
                MadMatrix '26 Attendee
              </p>
              <h2 className="text-3xl md:text-4xl font-headline font-black text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] uppercase leading-tight">
                {name}
              </h2>
            </div>
            
            {/* QR Code Container */}
            <div className="bg-black p-1.5 rounded-lg border border-primary/40 shadow-[0_0_20px_rgba(255,0,0,0.3)]">
              <img 
                src={qrUrl} 
                alt="Registration QR Code" 
                className="w-20 h-20 md:w-28 md:h-28"
              />
            </div>
          </div>

          <div className="flex justify-between items-end">
            <div className="space-y-4 max-w-[60%]">
              {greeting && (
                <div className="bg-black/60 backdrop-blur-md p-3 rounded border-l-2 border-primary shadow-lg">
                  <p className="text-xs italic text-secondary font-medium leading-relaxed">
                    "{greeting}"
                  </p>
                </div>
              )}
              <div className="flex gap-6">
                <div>
                  <p className="text-[8px] uppercase tracking-widest text-primary/80">Registration Number</p>
                  <p className="text-sm font-mono font-bold text-white tracking-wider">{regNo}</p>
                </div>
                <div>
                  <p className="text-[8px] uppercase tracking-widest text-primary/80">Access Level</p>
                  <p className="text-sm font-bold text-secondary tracking-widest uppercase">Verified</p>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="text-[10px] font-mono text-primary/60">
                SECURE_ID: {secureId || "INITIALIZING..."}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Ticket.displayName = "Ticket";