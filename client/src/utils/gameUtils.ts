export interface Point {
  x: number;
  y: number;
}

export interface GameState {
  isPlaying: boolean;
  score: number;
  level?: number;
}

export const createGameLoop = (callback: () => void, interval: number) => {
  return setInterval(callback, interval);
};

export const clearGameLoop = (gameLoop: NodeJS.Timeout | null) => {
  if (gameLoop) {
    clearInterval(gameLoop);
  }
};

export const generateRandomPosition = (maxX: number, maxY: number, gridSize: number = 1): Point => {
  return {
    x: Math.floor(Math.random() * (maxX / gridSize)) * gridSize,
    y: Math.floor(Math.random() * (maxY / gridSize)) * gridSize
  };
};

export const checkCollision = (rect1: any, rect2: any): boolean => {
  return rect1.x < rect2.x + rect2.width &&
         rect1.x + rect1.width > rect2.x &&
         rect1.y < rect2.y + rect2.height &&
         rect1.y + rect1.height > rect2.y;
};
