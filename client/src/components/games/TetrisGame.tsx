import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

interface Position {
  x: number;
  y: number;
}

interface Piece {
  shape: number[][];
  x: number;
  y: number;
  color: string;
}

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const SHAPES = [
  { shape: [[1, 1, 1, 1]], color: '#00f5ff' }, // I
  { shape: [[1, 1], [1, 1]], color: '#ffff00' }, // O
  { shape: [[0, 1, 0], [1, 1, 1]], color: '#8b00ff' }, // T
  { shape: [[0, 1, 1], [1, 1, 0]], color: '#00ff00' }, // S
  { shape: [[1, 1, 0], [0, 1, 1]], color: '#ff0000' }, // Z
  { shape: [[1, 0, 0], [1, 1, 1]], color: '#ff8c00' }, // L
  { shape: [[0, 0, 1], [1, 1, 1]], color: '#0000ff' }, // J
];

export default function TetrisGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [board, setBoard] = useState<string[][]>(() => 
    Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(''))
  );
  const [currentPiece, setCurrentPiece] = useState<Piece | null>(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  const createPiece = (): Piece => {
    const shapeData = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    return {
      shape: shapeData.shape,
      x: Math.floor(BOARD_WIDTH / 2) - Math.floor(shapeData.shape[0].length / 2),
      y: 0,
      color: shapeData.color
    };
  };

  const isValidMove = (piece: Piece, deltaX: number, deltaY: number): boolean => {
    const newX = piece.x + deltaX;
    const newY = piece.y + deltaY;

    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const boardX = newX + x;
          const boardY = newY + y;

          if (boardX < 0 || boardX >= BOARD_WIDTH || 
              boardY >= BOARD_HEIGHT || 
              (boardY >= 0 && board[boardY][boardX])) {
            return false;
          }
        }
      }
    }
    return true;
  };

  const placePiece = () => {
    if (!currentPiece) return;

    const newBoard = [...board];
    for (let y = 0; y < currentPiece.shape.length; y++) {
      for (let x = 0; x < currentPiece.shape[y].length; x++) {
        if (currentPiece.shape[y][x]) {
          const boardX = currentPiece.x + x;
          const boardY = currentPiece.y + y;
          if (boardY >= 0) {
            newBoard[boardY][boardX] = currentPiece.color;
          }
        }
      }
    }

    // Clear lines
    let linesCleared = 0;
    for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
      if (newBoard[y].every(cell => cell !== '')) {
        newBoard.splice(y, 1);
        newBoard.unshift(Array(BOARD_WIDTH).fill(''));
        linesCleared++;
        y++; // Check same line again
      }
    }

    if (linesCleared > 0) {
      setScore(prev => prev + linesCleared * 100 * level);
    }

    setBoard(newBoard);
    setCurrentPiece(createPiece());
  };

  const gameLoop = () => {
    if (!currentPiece) return;

    if (isValidMove(currentPiece, 0, 1)) {
      setCurrentPiece(prev => prev ? { ...prev, y: prev.y + 1 } : null);
    } else {
      placePiece();
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (!isPlaying || !currentPiece) return;

    switch (e.key) {
      case 'a':
      case 'A':
        if (isValidMove(currentPiece, -1, 0)) {
          setCurrentPiece(prev => prev ? { ...prev, x: prev.x - 1 } : null);
        }
        break;
      case 'd':
      case 'D':
        if (isValidMove(currentPiece, 1, 0)) {
          setCurrentPiece(prev => prev ? { ...prev, x: prev.x + 1 } : null);
        }
        break;
      case 's':
      case 'S':
        if (isValidMove(currentPiece, 0, 1)) {
          setCurrentPiece(prev => prev ? { ...prev, y: prev.y + 1 } : null);
        }
        break;
      case 'w':
      case 'W':
        // Rotate piece (simplified)
        const rotated = currentPiece.shape[0].map((_, index) =>
          currentPiece.shape.map(row => row[index]).reverse()
        );
        const rotatedPiece = { ...currentPiece, shape: rotated };
        if (isValidMove({ ...rotatedPiece, x: rotatedPiece.x, y: rotatedPiece.y }, 0, 0)) {
          setCurrentPiece(rotatedPiece);
        }
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, currentPiece]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const CELL_SIZE = 15;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw board
    for (let y = 0; y < BOARD_HEIGHT; y++) {
      for (let x = 0; x < BOARD_WIDTH; x++) {
        if (board[y][x]) {
          ctx.fillStyle = board[y][x];
          ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
        }
      }
    }

    // Draw current piece
    if (currentPiece) {
      ctx.fillStyle = currentPiece.color;
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (currentPiece.shape[y][x]) {
            const drawX = (currentPiece.x + x) * CELL_SIZE;
            const drawY = (currentPiece.y + y) * CELL_SIZE;
            ctx.fillRect(drawX, drawY, CELL_SIZE - 1, CELL_SIZE - 1);
          }
        }
      }
    }

    // Draw grid
    ctx.strokeStyle = '#333';
    for (let x = 0; x <= BOARD_WIDTH; x++) {
      ctx.beginPath();
      ctx.moveTo(x * CELL_SIZE, 0);
      ctx.lineTo(x * CELL_SIZE, BOARD_HEIGHT * CELL_SIZE);
      ctx.stroke();
    }
    for (let y = 0; y <= BOARD_HEIGHT; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * CELL_SIZE);
      ctx.lineTo(BOARD_WIDTH * CELL_SIZE, y * CELL_SIZE);
      ctx.stroke();
    }
  }, [board, currentPiece]);

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setLevel(1);
    setBoard(Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill('')));
    setCurrentPiece(createPiece());
    gameLoopRef.current = setInterval(gameLoop, 800);
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
        <span className="text-yellow-400 mr-2">🧩</span>ブロックパズル
      </h3>
      <canvas 
        ref={canvasRef}
        className="game-canvas w-full" 
        width={150} 
        height={300} 
      />
      <div className="mt-3 text-center">
        <Button 
          onClick={isPlaying ? stopGame : startGame}
          className="bg-yellow-600 hover:bg-yellow-700 text-sm"
        >
          {isPlaying ? '停止' : '開始'}
        </Button>
        <div className="text-xs mt-2">
          <span>スコア: {score}</span>
          <span className="ml-3">レベル: {level}</span>
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-2">A/D移動、S加速、W回転</p>
    </div>
  );
}
