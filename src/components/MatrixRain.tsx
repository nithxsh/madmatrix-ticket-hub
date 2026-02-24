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

    // Deep red/maroon theme configuration
    const characters = ["0", "1"];
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = new Array(columns).fill(1);

    const draw = () => {
      // Semi-transparent black with a very faint maroon tint to create the trailing effect
      ctx.fillStyle = "rgba(10, 2, 2, 0.1)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `bold ${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        
        // Randomly determine if this character is the "head" of the drop (brighter)
        const isHead = Math.random() > 0.98;
        
        if (isHead) {
          ctx.fillStyle = "#ff4d4d"; // Bright red head
          ctx.shadowBlur = 10;
          ctx.shadowColor = "#ff0000";
        } else {
          // Varying shades of deep maroon/red for the trail
          const redValue = Math.floor(Math.random() * 100) + 100;
          ctx.fillStyle = `rgb(${redValue}, 0, 0)`;
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
      // Re-initialize or adjust drops array if width changes significantly
      if (newColumns > drops.length) {
        const extra = new Array(newColumns - drops.length).fill(1).map(() => Math.random() * (height / fontSize));
        drops.push(...extra);
      }
    };

    window.addEventListener("resize", handleResize);
    const interval = setInterval(draw, 33); // ~30fps for smooth digital flow

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-20 pointer-events-none opacity-60"
    />
  );
};
