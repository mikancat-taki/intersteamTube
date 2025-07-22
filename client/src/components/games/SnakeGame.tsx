import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

interface Point {
  x: number;
  y: number;
}

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const snakeRef = useRef<Point[]>([{ x: 150, y: 100 }]);
  const directionRef = useRef<Point>({ x: 0, y: 0 });
  const foodRef = useRef<Point>({ x: 100, y: 100 });

  const gridSize = 10;

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPlaying) return;
      
      switch(e.key) {
        case 'ArrowUp':
          directionRef.current = { x: 0, y: -gridSize };
          break;
        case 'ArrowDown':
          directionRef.current = { x: 0, y: gridSize };
          break;
        case 'ArrowLeft':
          directionRef.current = { x: -gridSize, y: 0 };
          break;
        case 'ArrowRight':
          directionRef.current = { x: gridSize, y: 0 };
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying]);

  const gameLoop = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const snake = snakeRef.current;
    const direction = directionRef.current;
    const food = foodRef.current;

    // Move snake
    const head = { 
      x: snake[0].x + direction.x, 
      y: snake[0].y + direction.y 
    };

    // Check walls
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
      endGame();
      return;
    }

    // Check self collision
    for (let segment of snake) {
      if (head.x === segment.x && head.y === segment.y) {
        endGame();
        return;
      }
    }

    snake.unshift(head);

    // Check food
    if (head.x === food.x && head.y === food.y) {
      setScore(prev => prev + 10);
      foodRef.current = {
        x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
        y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize
      };
    } else {
      snake.pop();
    }

    // Draw
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw snake
    ctx.fillStyle = 'lime';
    for (let segment of snake) {
      ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    }
    
    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
  };

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    snakeRef.current = [{ x: 150, y: 100 }];
    directionRef.current = { x: gridSize, y: 0 };
    foodRef.current = { x: 100, y: 100 };
    
    gameLoopRef.current = setInterval(gameLoop, 150);
  };

  const endGame = () => {
    setIsPlaying(false);
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
      gameLoopRef.current = null;
    }
    alert(`ゲームオーバー！ スコア: ${score}`);
  };

  return (
    <div className="glass rounded-xl p-4">
      <h3 className="text-lg font-semibold mb-3 flex items-center">
        <span className="text-green-400 mr-2">🐍</span>スネークゲーム
      </h3>
      <canvas 
        ref={canvasRef}
        className="game-canvas w-full" 
        width={300} 
        height={200} 
      />
      <div className="mt-3 text-center">
        <Button 
          onClick={startGame} 
          disabled={isPlaying}
          className="bg-green-600 hover:bg-green-700 text-sm"
        >
          開始
        </Button>
        <span className="ml-4 text-sm">スコア: {score}</span>
      </div>
      <p className="text-xs text-gray-400 mt-2">矢印キーで操作</p>
    </div>
  );
}
