import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface Card {
  id: number;
  color: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd'];

  const initializeGame = () => {
    const gameCards: Card[] = [];
    colors.forEach((color, index) => {
      gameCards.push(
        { id: index * 2, color, isFlipped: false, isMatched: false },
        { id: index * 2 + 1, color, isFlipped: false, isMatched: false }
      );
    });
    
    // Shuffle cards
    const shuffled = gameCards.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedCards([]);
    setMatches(0);
    setIsPlaying(true);
  };

  const handleCardClick = (cardId: number) => {
    if (!isPlaying || flippedCards.length >= 2) return;
    
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);
    
    setCards(prev => prev.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    ));

    if (newFlippedCards.length === 2) {
      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards.find(c => c.id === firstId);
      const secondCard = cards.find(c => c.id === secondId);

      setTimeout(() => {
        if (firstCard?.color === secondCard?.color) {
          // Match found
          setCards(prev => prev.map(c => 
            c.id === firstId || c.id === secondId 
              ? { ...c, isMatched: true } 
              : c
          ));
          setMatches(prev => prev + 1);
          
          if (matches + 1 === 8) {
            alert('おめでとうございます！全てクリア！');
            setIsPlaying(false);
          }
        } else {
          // No match, flip back
          setCards(prev => prev.map(c => 
            c.id === firstId || c.id === secondId 
              ? { ...c, isFlipped: false } 
              : c
          ));
        }
        setFlippedCards([]);
      }, 1000);
    }
  };

  return (
    <div className="glass rounded-xl p-4">
      <h3 className="text-lg font-semibold mb-3 flex items-center">
        <span className="text-purple-400 mr-2">🧠</span>記憶ゲーム
      </h3>
      <div className="grid grid-cols-4 gap-2 mb-3">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className="w-12 h-12 rounded cursor-pointer flex items-center justify-center transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: card.isFlipped || card.isMatched ? card.color : '#374151',
              opacity: card.isMatched ? 0.6 : 1
            }}
          >
            {!card.isFlipped && !card.isMatched && '?'}
          </div>
        ))}
      </div>
      <div className="text-center">
        <Button 
          onClick={initializeGame} 
          className="bg-purple-600 hover:bg-purple-700 text-sm"
        >
          開始
        </Button>
        <span className="ml-4 text-sm">マッチ: {matches}</span>
      </div>
    </div>
  );
}
