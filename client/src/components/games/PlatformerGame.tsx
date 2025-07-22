import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
  vx: number;
  vy: number;
  onGround: boolean;
}

interface Platform {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Coin {
  x: number;
  y: number;
  collected: boolean;
}

export default function PlatformerGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [coins, setCoins] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const keysRef = useRef<{ [key: string]: boolean }>({});
  
  const playerRef = useRef<Player>({ x: 50, y: 100, width: 20, height: 20, vx: 0, vy: 0, onGround: false });
  const coinsRef = useRef<Coin[]>([
    { x: 120, y: 140, collected: false },
    { x: 200, y: 120, collected: false },
    { x: 150, y: 80, collected: false },
    { x: 250, y: 60, collected: false }
  ]);
  
  const platforms: Platform[] = [
    { x: 0, y: 180, width: 300, height: 20 }, // Ground
    { x: 100, y: 150, width: 60, height: 10 },
    { x: 180, y: 130, width: 60, height: 10 },
    { x: 130, y: 90, width: 60, height: 10 },
    { x: 220, y: 70, width: 60, height: 10 },
  ];

  const checkCollision = (rect1: any, rect2: any): boolean => {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
  };

  const gameLoop = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const player = playerRef.current;
    const keys = keysRef.current;
    const gameCoins = coinsRef.current;

    // Handle input
    if (keys['a'] || keys['A']) {
      player.vx = -3;
    } else if (keys['d'] || keys['D']) {
      player.vx = 3;
    } else {
      player.vx *= 0.8; // Friction
    }

    if ((keys['w'] || keys['W']) && player.onGround) {
      player.vy = -12;
      player.onGround = false;
    }

    // Apply gravity
    player.vy += 0.8;

    // Update position
    player.x += player.vx;
    player.y += player.vy;

    // Platform collision
    player.onGround = false;
    for (const platform of platforms) {
      if (checkCollision(player, platform)) {
        // Landing on top
        if (player.vy > 0 && player.y < platform.y) {
          player.y = platform.y - player.height;
          player.vy = 0;
          player.onGround = true;
        }
        // Hitting from bottom
        else if (player.vy < 0 && player.y > platform.y) {
          player.y = platform.y + platform.height;
          player.vy = 0;
        }
        // Side collisions
        else if (player.vx > 0) {
          player.x = platform.x - player.width;
          player.vx = 0;
        } else if (player.vx < 0) {
          player.x = platform.x + platform.width;
          player.vx = 0;
        }
      }
    }

    // Boundaries
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    if (player.y > canvas.height) {
      // Reset player position if they fall
      player.x = 50;
      player.y = 100;
      player.vx = 0;
      player.vy = 0;
    }

    // Collect coins
    for (const coin of gameCoins) {
      if (!coin.collected && checkCollision(player, { ...coin, width: 15, height: 15 })) {
        coin.collected = true;
        setCoins(prev => prev + 1);
      }
    }

    // Draw everything
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw platforms
    ctx.fillStyle = '#666';
    for (const platform of platforms) {
      ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    }

    // Draw player
    ctx.fillStyle = 'red';
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Draw coins
    ctx.fillStyle = 'gold';
    for (const coin of gameCoins) {
      if (!coin.collected) {
        ctx.beginPath();
        ctx.arc(coin.x + 7.5, coin.y + 7.5, 7.5, 0, 2 * Math.PI);
        ctx.fill();
      }
    }

    // Draw UI
    ctx.fillStyle = 'white';
    ctx.font = '12px monospace';
    ctx.fillText(`コイン: ${coins}`, 10, 20);

    // Win condition
    if (gameCoins.every(coin => coin.collected)) {
      ctx.fillStyle = 'lime';
      ctx.font = '16px monospace';
      ctx.fillText('全てのコインを集めました！', 80, 100);
    }
  };

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

  const startGame = () => {
    setIsPlaying(true);
    setCoins(0);
    playerRef.current = { x: 50, y: 100, width: 20, height: 20, vx: 0, vy: 0, onGround: false };
    coinsRef.current = [
      { x: 120, y: 140, collected: false },
      { x: 200, y: 120, collected: false },
      { x: 150, y: 80, collected: false },
      { x: 250, y: 60, collected: false }
    ];
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
        <span className="text-red-400 mr-2">🏃</span>プラットフォーマー
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
          className="bg-red-600 hover:bg-red-700 text-sm"
        >
          {isPlaying ? '停止' : '開始'}
        </Button>
        <span className="ml-4 text-sm">コイン: {coins}</span>
      </div>
      <p className="text-xs text-gray-400 mt-2">A/D移動、Wジャンプ</p>
    </div>
  );
}