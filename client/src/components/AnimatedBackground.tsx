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

    const animateWaves = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create multiple wave layers
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);

        const waveHeight = 100 + i * 20;
        const frequency = 0.01 + i * 0.005;
        const speed = 0.02 + i * 0.01;
        const opacity = 0.1 - i * 0.02;

        for (let x = 0; x <= canvas.width; x += 2) {
          const y = canvas.height - waveHeight + 
                   Math.sin((x * frequency) + (time * speed)) * 50 +
                   Math.sin((x * frequency * 2) + (time * speed * 1.5)) * 25;
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

      time += 1;
      animationId = requestAnimationFrame(animateWaves);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animateWaves();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
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
