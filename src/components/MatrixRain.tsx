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

    const characters = ["0", "1"];
    const fontSize = 16;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = new Array(columns).fill(1);

    const draw = () => {
      // Semi-transparent black to create trailing effect
      // Using a deep maroon tint for the trail
      ctx.fillStyle = "rgba(15, 2, 2, 0.1)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        
        // Vary the red intensity for depth
        const redIntensity = Math.floor(Math.random() * 155) + 100;
        ctx.fillStyle = `rgb(${redIntensity}, 0, 0)`;
        
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      // Re-initialize drops on resize to fill new columns
      const newColumns = Math.floor(width / fontSize);
      if (newColumns > drops.length) {
        const extra = new Array(newColumns - drops.length).fill(1);
        drops.push(...extra);
      }
    };

    window.addEventListener("resize", handleResize);
    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-20 pointer-events-none opacity-40"
    />
  );
};