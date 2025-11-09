'use client';

import React, { useEffect, useRef, useCallback } from 'react';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  rotation: number;
  rotationSpeed: number;
  gravity: number;
  life: number;
  maxLife: number;
  shapeType: number; // Store shape type to prevent re-randomization
}

interface ConfettiProps {
  trigger: boolean;
  onComplete?: () => void;
}

const Confetti: React.FC<ConfettiProps> = ({ trigger, onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const hasTriggered = useRef(false);
  const piecesRef = useRef<ConfettiPiece[]>([]);
  const isActiveRef = useRef(false);

  const createConfetti = useCallback(() => {
    // Bright neon and pastel colors
    const colors = [
      '#FF6B6B', // Bright red
      '#4ECDC4', // Bright teal
      '#45B7D1', // Bright blue
      '#96CEB4', // Pastel green
      '#FFEAA7', // Pastel yellow
      '#DDA0DD', // Pastel purple
      '#98D8C8', // Pastel mint
      '#F7DC6F', // Pastel gold
      '#BB8FCE', // Pastel lavender
      '#85C1E9', // Pastel blue
      '#F8C471', // Pastel orange
      '#82E0AA', // Pastel lime
      '#F1948A', // Pastel pink
      '#D7BDE2', // Pastel violet
      '#AED6F1', // Pastel sky blue
      '#F9E79F', // Pastel cream
    ];
    const canvas = canvasRef.current;
    if (!canvas) return;

    console.log('Creating confetti pieces...');
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const newPieces: ConfettiPiece[] = [];
    
    // Create 300-360 confetti pieces (6x more for better coverage)
    const pieceCount = Math.floor(Math.random() * 60) + 300;
    
    for (let i = 0; i < pieceCount; i++) {
      // Create confetti from multiple points for better coverage across screen transitions
      const spawnType = Math.random();
      let startX, startY;
      
      if (spawnType < 0.15) {
        // 15% from top of screen
        startX = Math.random() * window.innerWidth;
        startY = Math.random() * 100;
      } else if (spawnType < 0.3) {
        // 15% from edges for cross-screen travel
        startX = Math.random() < 0.5 ? -50 : window.innerWidth + 50;
        startY = Math.random() * window.innerHeight;
      } else if (spawnType < 0.5) {
        // 20% from bottom half of screen for better coverage
        startX = Math.random() * window.innerWidth;
        startY = window.innerHeight * 0.5 + Math.random() * (window.innerHeight * 0.5);
      } else {
        // 50% from center area
        startX = centerX + (Math.random() - 0.5) * window.innerWidth;
        startY = centerY + (Math.random() - 0.5) * 100;
      }

      newPieces.push({
        id: i,
        x: startX,
        y: startY,
        vx: spawnType < 0.15 ? (Math.random() - 0.5) * 15 : // Top spawns - moderate horizontal
            spawnType < 0.3 ? (Math.random() - 0.5) * 25 : // Edge spawns - high horizontal for cross-screen
            spawnType < 0.5 ? (Math.random() - 0.5) * 18 : // Bottom half spawns - good horizontal spread
            (Math.random() - 0.5) * 20, // Center spawns - high horizontal
        vy: spawnType < 0.15 ? Math.random() * 2 + 1 : // Top spawns - gentle downward
            spawnType < 0.3 ? (Math.random() - 0.5) * 8 : // Edge spawns - varied vertical
            spawnType < 0.5 ? Math.random() * -8 - 2 : // Bottom half spawns - upward movement
            Math.random() * -10 - 3, // Center spawns - upward burst
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4, // Slightly larger pieces
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 15, // Faster rotation
        gravity: 0.25, // Slightly less gravity for longer fall
        life: 0,
        maxLife: Math.random() * 200 + 300, // Extended duration (4+ seconds longer for cross-section persistence)
        shapeType: Math.floor(Math.random() * 3), // Store shape type
      });
    }

    console.log(`Created ${newPieces.length} confetti pieces`);
    piecesRef.current = newPieces;
    isActiveRef.current = true;
    // Start animation loop
    const animate = () => {
      const canvas = canvasRef.current;
      if (!canvas || !isActiveRef.current) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Update pieces - allow them to persist longer and travel across screen
      piecesRef.current = piecesRef.current.map(piece => ({
        ...piece,
        x: piece.x + piece.vx,
        y: piece.y + piece.vy,
        vy: piece.vy + piece.gravity,
        rotation: piece.rotation + piece.rotationSpeed,
        life: piece.life + 1,
      })).filter(piece => 
        piece.life < piece.maxLife && 
        piece.y < window.innerHeight + 200 && // Allow pieces to go further off-screen
        piece.x > -100 && piece.x < window.innerWidth + 100 // Allow horizontal overflow for cross-screen travel
      );

      // Draw the pieces
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      piecesRef.current.forEach(piece => {
        const alpha = 1 - (piece.life / piece.maxLife);
        
        ctx.save();
        ctx.translate(piece.x, piece.y);
        ctx.rotate((piece.rotation * Math.PI) / 180);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = piece.color;
        
        // Use stored shape type
        switch (piece.shapeType) {
          case 0: // Circle
            ctx.beginPath();
            ctx.arc(0, 0, piece.size / 2, 0, Math.PI * 2);
            ctx.fill();
            break;
          case 1: // Square
            ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
            break;
          case 2: // Triangle
            ctx.beginPath();
            ctx.moveTo(0, -piece.size / 2);
            ctx.lineTo(-piece.size / 2, piece.size / 2);
            ctx.lineTo(piece.size / 2, piece.size / 2);
            ctx.closePath();
            ctx.fill();
            break;
        }
        
        ctx.restore();
      });

      // Continue animation if there are still pieces
      if (piecesRef.current.length > 0) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        console.log('Confetti animation complete');
        isActiveRef.current = false;
        hasTriggered.current = false;
        onComplete?.();
      }
    };
    
    animate();
  }, [onComplete]);

  useEffect(() => {
    if (trigger && !isActiveRef.current && !hasTriggered.current) {
      console.log('Confetti triggered!');
      hasTriggered.current = true;
      createConfetti();
    }
  }, [trigger, createConfetti]);


  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      console.log(`Canvas resized to ${canvas.width}x${canvas.height} - covering full viewport`);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1000,
        backgroundColor: 'transparent',
      }}
    />
  );
};

export default Confetti;
