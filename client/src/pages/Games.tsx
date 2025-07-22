import { Gamepad2 } from 'lucide-react';
import SnakeGame from '@/components/games/SnakeGame';
import PongGame from '@/components/games/PongGame';
import MemoryGame from '@/components/games/MemoryGame';
import TetrisGame from '@/components/games/TetrisGame';
import PlatformerGame from '@/components/games/PlatformerGame';
import SpaceInvadersGame from '@/components/games/SpaceInvadersGame';

export default function Games() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="glass rounded-2xl p-6 floating">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Gamepad2 className="text-green-500 mr-2" />
          ブラウザゲーム
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SnakeGame />
          <PongGame />
          <MemoryGame />
          <TetrisGame />
          <PlatformerGame />
          <SpaceInvadersGame />
        </div>
      </div>
    </div>
  );
}
