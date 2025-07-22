import { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawStaticBackground = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create static wave layers
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);

        const waveHeight = 100 + i * 20;
        const frequency = 0.01 + i * 0.005;
        const opacity = 0.08 - i * 0.02;

        for (let x = 0; x <= canvas.width; x += 4) {
          const y = canvas.height - waveHeight + 
                   Math.sin(x * frequency) * 40 +
                   Math.sin(x * frequency * 2) * 20;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();

        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, `rgba(147, 51, 234, ${opacity})`);
        gradient.addColorStop(1, `rgba(59, 130, 246, ${opacity * 0.5})`);

        ctx.fillStyle = gradient;
        ctx.fill();
      }
      
      // Add subtle stars
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height * 0.7;
        ctx.beginPath();
        ctx.arc(x, y, Math.random() * 1.5, 0, 2 * Math.PI);
        ctx.fill();
      }
    };

    resizeCanvas();
    drawStaticBackground();
    
    window.addEventListener('resize', () => {
      resizeCanvas();
      drawStaticBackground();
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ pointerEvents: 'none' }}
    />
  );
}
