import { useRef, useEffect } from 'react';

interface GameCanvasProps {
  width: number;
  height: number;
  onDraw: (ctx: CanvasRenderingContext2D) => void;
  className?: string;
}

export default function GameCanvas({ width, height, onDraw, className = '' }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    onDraw(ctx);
  });

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={`game-canvas ${className}`}
    />
  );
}
