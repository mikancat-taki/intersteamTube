import { Button } from '@/components/ui/button';

export default function PlatformerGame() {
  const startGame = () => {
    alert('プラットフォーマーゲームは開発中です！');
  };

  return (
    <div className="glass rounded-xl p-4">
      <h3 className="text-lg font-semibold mb-3 flex items-center">
        <span className="text-red-400 mr-2">🏃</span>プラットフォーマー
      </h3>
      <canvas className="game-canvas w-full" width={300} height={200} />
      <div className="mt-3 text-center">
        <Button 
          onClick={startGame} 
          className="bg-red-600 hover:bg-red-700 text-sm"
        >
          開始
        </Button>
        <span className="ml-4 text-sm">コイン: 0</span>
      </div>
      <p className="text-xs text-gray-400 mt-2">A/D移動、Wジャンプ</p>
    </div>
  );
}
