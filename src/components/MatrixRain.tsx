"use client";

import React, { useEffect, useRef } from "react";

export const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Character configuration
    const characters = ["0", "1"];
    const fontSize = 16;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = new Array(columns).fill(1).map(() => Math.floor(Math.random() * -100));

    const draw = () => {
      // Semi-transparent black for the trailing effect - ensures background stays dark
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `bold ${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        
        // Randomly determine if this character is the "head" of the drop (brighter)
        const isHead = Math.random() > 0.95;
        
        if (isHead) {
          ctx.fillStyle = "#ffffff"; // Pure white head
          ctx.shadowBlur = 10;
          ctx.shadowColor = "#ffffff";
        } else {
          // Varying shades of white/light-gray for the trail
          const brightness = Math.floor(Math.random() * 50) + 205; 
          ctx.fillStyle = `rgba(${brightness}, ${brightness}, ${brightness}, 0.6)`;
          ctx.shadowBlur = 0;
        }
        
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top if it reaches the bottom, with random delay
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        drops[i]++;
      }
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      const newColumns = Math.floor(width / fontSize);
      if (newColumns > drops.length) {
        const extra = new Array(newColumns - drops.length).fill(1).map(() => Math.floor(Math.random() * -height / fontSize));
        drops.push(...extra);
      }
    };

    window.addEventListener("resize", handleResize);
    const interval = setInterval(draw, 45);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-25"
    />
  );
};
