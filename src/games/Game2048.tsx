import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const GRID_SIZE = 4;
type Board = number[][];
type Direction = 'left' | 'right' | 'up' | 'down';

const Game2048 = () => {
  const [board, setBoard] = useState<Board>(() => addRandomTile(addRandomTile(createEmptyBoard())));
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState<'running' | 'won' | 'over'>('running');

  const resetGame = () => {
    setBoard(addRandomTile(addRandomTile(createEmptyBoard())));
    setScore(0);
    setStatus('running');
  };

  const handleMove = useCallback(
    (direction: Direction) => {
      if (status === 'over') {
        return;
      }

      const { board: movedBoard, moved, gained } = shiftBoard(board, direction);

      if (!moved) {
        return;
      }

      const boardWithTile = addRandomTile(movedBoard);
      setBoard(boardWithTile);
      setScore((prev) => prev + gained);

      const reached2048 = has2048(boardWithTile);
      const canMove = hasMoves(boardWithTile);

      if (reached2048 && status !== 'won') {
        setStatus('won');
      } else if (!canMove) {
        setStatus((prev) => (prev === 'won' ? 'won' : 'over'));
      }
    },
    [board, status]
  );

  useEffect(() => {
    const keyMap: Record<string, Direction> = {
      ArrowUp: 'up',
      ArrowDown: 'down',
      ArrowLeft: 'left',
      ArrowRight: 'right',
    };

    const handleKeydown = (event: KeyboardEvent) => {
      const direction = keyMap[event.key];
      if (!direction) {
        return;
      }
      event.preventDefault();
      handleMove(direction);
    };

    window.addEventListener('keydown', handleKeydown, { passive: false });
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [handleMove]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase text-muted-foreground">Score</p>
          <p className="text-2xl font-semibold text-foreground">{score}</p>
        </div>
        <Button variant="outline" size="sm" onClick={resetGame}>
          Nouvelle partie
        </Button>
      </div>

      <div className="mx-auto w-full max-w-md rounded-3xl bg-slate-900 p-5 shadow-2xl shadow-primary/10">
        <div className="grid grid-cols-4 gap-3">
          {board.map((row, rowIndex) =>
            row.map((value, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`flex aspect-square w-full items-center justify-center rounded-xl text-2xl font-semibold transition-all duration-200 ${getTileColor(
                  value
                )}`}
              >
                {value !== 0 ? value : ''}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="rounded-lg border border-dashed border-primary/30 bg-primary/5 px-4 py-3 text-sm text-muted-foreground">
        {status === 'won'
          ? 'Bravo ! Continue si tu veux pousser le score.'
          : status === 'over'
            ? 'Plus de mouvements possibles. Lance une nouvelle partie.'
            : 'Utilise les fleches pour fusionner les cases.'}
      </div>
    </div>
  );
};

export default Game2048;

function createEmptyBoard(): Board {
  return Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0));
}

function addRandomTile(board: Board): Board {
  const emptyCells: Array<{ x: number; y: number }> = [];

  board.forEach((row, y) =>
    row.forEach((value, x) => {
      if (value === 0) {
        emptyCells.push({ x, y });
      }
    })
  );

  if (emptyCells.length === 0) {
    return board.map((row) => [...row]);
  }

  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  const newValue = Math.random() < 0.9 ? 2 : 4;

  return board.map((row, y) =>
    row.map((value, x) => {
      if (x === randomCell.x && y === randomCell.y) {
        return newValue;
      }
      return value;
    })
  );
}

function shiftBoard(board: Board, direction: Direction) {
  let workingBoard = board.map((row) => [...row]);

  switch (direction) {
    case 'right':
      workingBoard = reverseRows(workingBoard);
      break;
    case 'up':
      workingBoard = transpose(workingBoard);
      break;
    case 'down':
      workingBoard = reverseRows(transpose(workingBoard));
      break;
  }

  let moved = false;
  let gained = 0;

  const processed = workingBoard.map((row) => {
    const { newRow, rowGained, rowMoved } = compressRow(row);
    if (rowMoved) {
      moved = true;
    }
    gained += rowGained;
    return newRow;
  });

  let restored = processed;

  switch (direction) {
    case 'right':
      restored = reverseRows(restored);
      break;
    case 'up':
      restored = transpose(restored);
      break;
    case 'down':
      restored = transpose(reverseRows(restored));
      break;
  }

  return { board: restored, moved, gained };
}

function compressRow(row: number[]) {
  const filtered = row.filter((value) => value !== 0);
  const merged: number[] = [];
  let gained = 0;

  for (let i = 0; i < filtered.length; i++) {
    if (filtered[i] === filtered[i + 1]) {
      const value = filtered[i] * 2;
      merged.push(value);
      gained += value;
      i++;
    } else {
      merged.push(filtered[i]);
    }
  }

  while (merged.length < GRID_SIZE) {
    merged.push(0);
  }

  const rowMoved = merged.some((value, index) => value !== row[index]);
  return { newRow: merged, rowGained: gained, rowMoved };
}

function transpose(board: Board): Board {
  return board[0].map((_, x) => board.map((row) => row[x]));
}

function reverseRows(board: Board): Board {
  return board.map((row) => [...row].reverse());
}

function has2048(board: Board) {
  return board.some((row) => row.some((value) => value >= 2048));
}

function hasMoves(board: Board) {
  if (board.some((row) => row.some((value) => value === 0))) {
    return true;
  }

  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      const current = board[y][x];
      const right = board[y][x + 1];
      const down = board[y + 1]?.[x];
      if (current === right || current === down) {
        return true;
      }
    }
  }

  return false;
}

function getTileColor(value: number) {
  const map: Record<number, string> = {
    0: 'bg-slate-800/60 text-transparent',
    2: 'bg-slate-200 text-slate-900',
    4: 'bg-amber-100 text-amber-900',
    8: 'bg-amber-200 text-amber-900',
    16: 'bg-orange-300 text-orange-900',
    32: 'bg-orange-400 text-white',
    64: 'bg-orange-500 text-white',
    128: 'bg-yellow-400 text-slate-900',
    256: 'bg-yellow-500 text-slate-900',
    512: 'bg-lime-400 text-slate-900',
    1024: 'bg-lime-500 text-slate-900',
    2048: 'bg-emerald-400 text-slate-900',
  };
  return map[value] ?? 'bg-emerald-500 text-white';
}
