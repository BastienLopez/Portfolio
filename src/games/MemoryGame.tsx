import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';

type Card = {
  id: number;
  symbol: string;
  isMatched: boolean;
  isFlipped: boolean;
};

const pairs = ['<>', '{}', '[]', '()', '+=', '&&', '||', '#!'];

const MemoryGame = () => {
  const [cards, setCards] = useState<Card[]>(() => buildDeck());
  const [selected, setSelected] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [status, setStatus] = useState<'ready' | 'playing' | 'won'>('ready');
  const [isLocked, setIsLocked] = useState(false);

  const matchedCount = useMemo(() => cards.filter((card) => card.isMatched).length / 2, [cards]);

  useEffect(() => {
    setStatus('playing');
  }, []);

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.isMatched)) {
      setStatus('won');
    }
  }, [cards]);

  const restart = () => {
    setCards(buildDeck());
    setMoves(0);
    setSelected([]);
    setStatus('playing');
    setIsLocked(false);
  };

  const handleCardClick = (index: number) => {
    if (isLocked || cards[index].isMatched || cards[index].isFlipped) {
      return;
    }

    const updatedCards = cards.map((card, idx) =>
      idx === index ? { ...card, isFlipped: true } : card
    );
    const updatedSelected = [...selected, index];

    setCards(updatedCards);
    setSelected(updatedSelected);

    if (updatedSelected.length === 2) {
      setIsLocked(true);
      setMoves((prev) => prev + 1);

      const [firstIdx, secondIdx] = updatedSelected;
      const firstCard = updatedCards[firstIdx];
      const secondCard = updatedCards[secondIdx];

      if (firstCard.symbol === secondCard.symbol) {
        setTimeout(() => {
          setCards((previous) =>
            previous.map((card, idx) =>
              updatedSelected.includes(idx) ? { ...card, isMatched: true } : card
            )
          );
          setSelected([]);
          setIsLocked(false);
        }, 350);
      } else {
        setTimeout(() => {
          setCards((previous) =>
            previous.map((card, idx) =>
              updatedSelected.includes(idx) ? { ...card, isFlipped: false } : card
            )
          );
          setSelected([]);
          setIsLocked(false);
        }, 750);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm">
        <div>
          <p className="text-xs uppercase tracking-widest text-primary">Coups</p>
          <p className="text-2xl font-semibold text-foreground">{moves}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-primary">Paires</p>
          <p className="text-2xl font-semibold text-foreground">{matchedCount}/8</p>
        </div>
        <Button variant="outline" size="sm" onClick={restart}>
          Rejouer
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-3 md:gap-4">
        {cards.map((card, index) => (
          <button
            key={card.id}
            className={`relative aspect-square w-full rounded-2xl border border-slate-800/60 bg-slate-900/60 text-2xl font-semibold uppercase tracking-wider transition-all duration-300 ${
              card.isFlipped || card.isMatched ? 'scale-[0.98] border-primary/70 shadow-[0_8px_35px_rgba(15,118,110,0.35)]' : 'hover:-translate-y-1 hover:border-primary/40'
            } ${card.isMatched ? 'bg-gradient-to-br from-emerald-500/70 to-cyan-500/70 text-white' : ''}`}
            onClick={() => handleCardClick(index)}
            type="button"
          >
            <span
              className={`absolute inset-0 flex items-center justify-center text-3xl font-bold transition-opacity ${
                card.isFlipped || card.isMatched ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {card.symbol}
            </span>
            <span
              className={`absolute inset-0 flex items-center justify-center text-xs uppercase tracking-wider text-muted-foreground transition-opacity ${
                card.isFlipped || card.isMatched ? 'opacity-0' : 'opacity-50'
              }`}
            >
              Dev
            </span>
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-dashed border-primary/20 bg-background/80 px-4 py-3 text-sm text-muted-foreground">
        {status === 'won'
          ? 'Bravo ! Toutes les paires sont trouvees.'
          : 'Memorise les cartes et retrouve toutes les paires.'}
      </div>
    </div>
  );
};

export default MemoryGame;

function buildDeck(): Card[] {
  const duplicated = pairs.flatMap((symbol, index) => [
    { id: index * 2, symbol, isMatched: false, isFlipped: false },
    { id: index * 2 + 1, symbol, isMatched: false, isFlipped: false },
  ]);

  return shuffleArray(duplicated);
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
