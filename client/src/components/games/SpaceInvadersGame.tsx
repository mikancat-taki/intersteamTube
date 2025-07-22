import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Bullet extends GameObject {
  dy: number;
}

interface Enemy extends GameObject {
  dx: number;
  dy: number;
}

export default function SpaceInvadersGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const keysRef = useRef<{ [key: string]: boolean }>({});
  
  const playerRef = useRef<GameObject>({ x: 135, y: 170, width: 30, height: 15 });
  const bulletsRef = useRef<Bullet[]>([]);
  const enemiesRef = useRef<Enemy[]>([]);

  const createEnemies = () => {
    const enemies: Enemy[] = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 8; col++) {
        enemies.push({
          x: col * 35 + 20,
          y: row * 30 + 30,
          width: 20,
          height: 15,
          dx: 1,
          dy: 0
        });
      }
    }
    return enemies;
  };

  const checkCollision = (rect1: GameObject, rect2: GameObject): boolean => {
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
    const bullets = bulletsRef.current;
    const enemies = enemiesRef.current;
    const keys = keysRef.current;

    // Move player
    if (keys['a'] && player.x > 0) player.x -= 5;
    if (keys['d'] && player.x < canvas.width - player.width) player.x += 5;

    // Shoot
    if (keys[' ']) {
      if (bullets.length < 3) {
        bullets.push({
          x: player.x + player.width / 2 - 2,
          y: player.y,
          width: 4,
          height: 10,
          dy: -7
        });
      }
      keys[' '] = false; // Prevent continuous shooting
    }

    // Move bullets
    for (let i = bullets.length - 1; i >= 0; i--) {
      bullets[i].y += bullets[i].dy;
      if (bullets[i].y < 0) {
        bullets.splice(i, 1);
      }
    }

    // Move enemies
    let changeDirection = false;
    for (const enemy of enemies) {
      enemy.x += enemy.dx;
      if (enemy.x <= 0 || enemy.x >= canvas.width - enemy.width) {
        changeDirection = true;
      }
    }

    if (changeDirection) {
      for (const enemy of enemies) {
        enemy.dx = -enemy.dx;
        enemy.y += 20;
      }
    }

    // Check bullet-enemy collisions
    for (let i = bullets.length - 1; i >= 0; i--) {
      for (let j = enemies.length - 1; j >= 0; j--) {
        if (checkCollision(bullets[i], enemies[j])) {
          bullets.splice(i, 1);
          enemies.splice(j, 1);
          setScore(prev => prev + 10);
          break;
        }
      }
    }

    // Check enemy-player collisions
    for (const enemy of enemies) {
      if (checkCollision(enemy, player) || enemy.y > canvas.height - 30) {
        setLives(prev => {
          const newLives = prev - 1;
          if (newLives <= 0) {
            setIsPlaying(false);
            if (gameLoopRef.current) {
              clearInterval(gameLoopRef.current);
              gameLoopRef.current = null;
            }
            alert(`ゲームオーバー！ スコア: ${score}`);
          }
          return newLives;
        });
        break;
      }
    }

    // Win condition
    if (enemies.length === 0) {
      setScore(prev => prev + 100);
      enemiesRef.current = createEnemies();
    }

    // Draw everything
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player
    ctx.fillStyle = 'lime';
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Draw bullets
    ctx.fillStyle = 'yellow';
    for (const bullet of bullets) {
      ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    }

    // Draw enemies
    ctx.fillStyle = 'red';
    for (const enemy of enemies) {
      ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    }

    // Draw UI
    ctx.fillStyle = 'white';
    ctx.font = '12px monospace';
    ctx.fillText(`スコア: ${score}`, 10, 20);
    ctx.fillText(`ライフ: ${lives}`, 10, 35);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.key.toLowerCase()] = true;
      if (e.key === ' ') {
        keysRef.current[' '] = true;
        e.preventDefault();
      }
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key.toLowerCase()] = false;
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
    setScore(0);
    setLives(3);
    playerRef.current = { x: 135, y: 170, width: 30, height: 15 };
    bulletsRef.current = [];
    enemiesRef.current = createEnemies();
    gameLoopRef.current = setInterval(gameLoop, 50);
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
        <span className="text-cyan-400 mr-2">🚀</span>スペースシューター
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
          className="bg-cyan-600 hover:bg-cyan-700 text-sm"
        >
          {isPlaying ? '停止' : '開始'}
        </Button>
        <div className="text-xs mt-2">
          <span>スコア: {score}</span>
          <span className="ml-3">ライフ: {lives}</span>
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-2">A/D移動、Spaceで射撃</p>
    </div>
  );
}
