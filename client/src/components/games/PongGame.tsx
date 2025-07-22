import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

interface Ball {
  x: number;
  y: number;
  dx: number;
  dy: number;
}

interface Paddle {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function PongGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [leftScore, setLeftScore] = useState(0);
  const [rightScore, setRightScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const keysRef = useRef<{ [key: string]: boolean }>({});
  
  const ballRef = useRef<Ball>({ x: 150, y: 100, dx: 3, dy: 2 });
  const leftPaddleRef = useRef<Paddle>({ x: 10, y: 80, width: 10, height: 40 });
  const rightPaddleRef = useRef<Paddle>({ x: 280, y: 80, width: 10, height: 40 });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.key] = true;
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key] = false;
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const gameLoop = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const ball = ballRef.current;
    const leftPaddle = leftPaddleRef.current;
    const rightPaddle = rightPaddleRef.current;
    const keys = keysRef.current;

    // Move paddles
    if (keys['w'] && leftPaddle.y > 0) leftPaddle.y -= 5;
    if (keys['s'] && leftPaddle.y < canvas.height - leftPaddle.height) leftPaddle.y += 5;
    if (keys['ArrowUp'] && rightPaddle.y > 0) rightPaddle.y -= 5;
    if (keys['ArrowDown'] && rightPaddle.y < canvas.height - rightPaddle.height) rightPaddle.y += 5;

    // Move ball
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Ball collision with top/bottom
    if (ball.y <= 0 || ball.y >= canvas.height) ball.dy = -ball.dy;

    // Ball collision with paddles
    if (ball.x <= leftPaddle.x + leftPaddle.width && 
        ball.y >= leftPaddle.y && ball.y <= leftPaddle.y + leftPaddle.height) {
      ball.dx = -ball.dx;
    }
    if (ball.x >= rightPaddle.x && 
        ball.y >= rightPaddle.y && ball.y <= rightPaddle.y + rightPaddle.height) {
      ball.dx = -ball.dx;
    }

    // Scoring
    if (ball.x < 0) {
      setRightScore(prev => prev + 1);
      ballRef.current = { x: 150, y: 100, dx: 3, dy: 2 };
    }
    if (ball.x > canvas.width) {
      setLeftScore(prev => prev + 1);
      ballRef.current = { x: 150, y: 100, dx: -3, dy: 2 };
    }

    // Draw
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    
    // Draw paddles
    ctx.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
    ctx.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
    
    // Draw ball
    ctx.fillRect(ball.x, ball.y, 8, 8);

    // Draw center line
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.strokeStyle = 'white';
    ctx.stroke();
    ctx.setLineDash([]);
  };

  const startGame = () => {
    setIsPlaying(true);
    setLeftScore(0);
    setRightScore(0);
    ballRef.current = { x: 150, y: 100, dx: 3, dy: 2 };
    leftPaddleRef.current = { x: 10, y: 80, width: 10, height: 40 };
    rightPaddleRef.current = { x: 280, y: 80, width: 10, height: 40 };
    
    gameLoopRef.current = setInterval(gameLoop, 16);
  };

  const stopGame = () => {
    setIsPlaying(false);
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
      gameLoopRef.current = null;
    }
  };

  return (
    <div className="glass rounded-xl p-4">
      <h3 className="text-lg font-semibold mb-3 flex items-center">
        <span className="text-blue-400 mr-2">⚪</span>ポンゲーム
      </h3>
      <canvas 
        ref={canvasRef}
        className="game-canvas w-full" 
        width={300} 
        height={200} 
      />
      <div className="mt-3 text-center">
        <Button 
          onClick={isPlaying ? stopGame : startGame} 
          className="bg-blue-600 hover:bg-blue-700 text-sm"
        >
          {isPlaying ? '停止' : '開始'}
        </Button>
        <span className="ml-4 text-sm">スコア: {leftScore}-{rightScore}</span>
      </div>
      <p className="text-xs text-gray-400 mt-2">W/Sキーで左側、↑/↓で右側</p>
    </div>
  );
}
