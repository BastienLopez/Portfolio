import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';

const ROWS = 20;
const COLS = 10;

type Piece = {
  shape: number[][];
  color: number;
};

const shapes: number[][][] = [
  [[1, 1, 1, 1]],
  [
    [1, 1],
    [1, 1],
  ],
  [
    [0, 1, 0],
    [1, 1, 1],
  ],
  [
    [1, 0, 0],
    [1, 1, 1],
  ],
  [
    [0, 0, 1],
    [1, 1, 1],
  ],
  [
    [0, 1, 1],
    [1, 1, 0],
  ],
  [
    [1, 1, 0],
    [0, 1, 1],
  ],
];

const colorClasses: Record<number, string> = {
  0: 'bg-transparent border border-slate-800/30',
  1: 'bg-cyan-400 border-cyan-300/70',
  2: 'bg-amber-400 border-amber-300/70',
  3: 'bg-violet-500 border-violet-300/70',
  4: 'bg-pink-500 border-pink-300/70',
  5: 'bg-emerald-500 border-emerald-300/70',
  6: 'bg-blue-500 border-blue-300/70',
  7: 'bg-rose-500 border-rose-300/70',
};

const TetrisGame = () => {
  const [board, setBoard] = useState(() => createEmptyBoard());
  const [piece, setPiece] = useState<Piece>(() => createPiece());
  const [position, setPosition] = useState({ x: 3, y: 0 });
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [dropInterval, setDropInterval] = useState(600);

  const ghostPosition = useMemo(() => {
    let ghostY = position.y;
    while (isValidPosition(board, piece.shape, { x: position.x, y: ghostY + 1 })) {
      ghostY += 1;
    }
    return { x: position.x, y: ghostY };
  }, [board, piece.shape, position]);

  const ghostCells = useMemo(() => {
    const cells = new Set<string>();
    piece.shape.forEach((row, y) =>
      row.forEach((value, x) => {
        if (value) {
          const gx = ghostPosition.x + x;
          const gy = ghostPosition.y + y;
          if (gy >= 0 && gy < ROWS && gx >= 0 && gx < COLS) {
            cells.add(`${gx}-${gy}`);
          }
        }
      })
    );
    return cells;
  }, [ghostPosition, piece.shape]);

  const resetGame = useCallback(() => {
    setBoard(createEmptyBoard());
    setPiece(createPiece());
    setPosition({ x: 3, y: 0 });
    setScore(0);
    setLines(0);
    setDropInterval(600);
  }, []);

  const spawnNext = useCallback(
    (nextBoard: number[][]) => {
      const nextPiece = createPiece();
      const startPos = { x: 3, y: 0 };
      if (!isValidPosition(nextBoard, nextPiece.shape, startPos)) {
        resetGame();
        return;
      }
      setPiece(nextPiece);
      setPosition(startPos);
    },
    [resetGame]
  );

  const lockPiece = useCallback(
    (forcedPosition?: { x: number; y: number }) => {
      const targetPosition = forcedPosition ?? position;
      const merged = mergeBoard(board, piece, targetPosition);
    const { board: clearedBoard, cleared } = clearLines(merged);
    setBoard(clearedBoard);
    if (cleared > 0) {
      setScore((prev) => prev + cleared * 120);
      setLines((prev) => prev + cleared);
      setDropInterval((prev) => Math.max(150, prev - cleared * 20));
    }
    spawnNext(clearedBoard);
    },
    [board, piece, position, spawnNext]
  );

  const movePiece = useCallback(
    (offsetX: number, offsetY: number) => {
      const newPos = { x: position.x + offsetX, y: position.y + offsetY };
      if (isValidPosition(board, piece.shape, newPos)) {
        setPosition(newPos);
        return true;
      }
      return false;
    },
    [board, piece.shape, position]
  );

  const rotatePiece = useCallback(() => {
    const rotated = rotateMatrix(piece.shape);
    if (isValidPosition(board, rotated, position)) {
      setPiece((prev) => ({ ...prev, shape: rotated }));
    }
  }, [board, piece.shape, position]);

  const dropPiece = useCallback(() => {
    const moved = movePiece(0, 1);
    if (!moved) {
      lockPiece();
    }
  }, [lockPiece, movePiece]);

  const hardDrop = useCallback(() => {
    lockPiece(ghostPosition);
  }, [ghostPosition, lockPiece]);

  useEffect(() => {
    const interval = setInterval(() => {
      dropPiece();
    }, dropInterval);

    return () => clearInterval(interval);
  }, [dropPiece, dropInterval]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '].includes(event.key)) {
        event.preventDefault();
      }
      switch (event.key) {
        case 'ArrowLeft':
          movePiece(-1, 0);
          break;
        case 'ArrowRight':
          movePiece(1, 0);
          break;
        case 'ArrowDown':
          movePiece(0, 1);
          break;
        case 'ArrowUp':
          rotatePiece();
          break;
        case ' ':
          hardDrop();
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hardDrop, movePiece, rotatePiece]);

  const renderBoard = useMemo(() => {
    const preview = board.map((row) => [...row]);
    piece.shape.forEach((row, y) =>
      row.forEach((value, x) => {
        if (value) {
          const px = position.x + x;
          const py = position.y + y;
          if (py >= 0 && py < ROWS && px >= 0 && px < COLS) {
            preview[py][px] = piece.color;
          }
        }
      })
    );
    return preview;
  }, [board, piece, position]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-primary/20 bg-slate-900/60 px-4 py-3 text-sm">
        <div>
          <p className="text-xs uppercase tracking-widest text-primary">Score</p>
          <p className="text-2xl font-semibold text-foreground">{score}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-primary">Lignes</p>
          <p className="text-2xl font-semibold text-foreground">{lines}</p>
        </div>
        <Button variant="outline" size="sm" onClick={resetGame} className="ml-auto">
          Nouvelle partie
        </Button>
      </div>

      <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
        <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-4 shadow-[0_15px_50px_rgba(15,23,42,0.6)]">
          <div className="grid grid-cols-10 gap-1 md:gap-1.5">
            {renderBoard.map((row, y) =>
              row.map((value, x) => {
                const ghostActive = ghostCells.has(`${x}-${y}`);
                return (
                  <div
                    key={`${x}-${y}`}
                    className={`aspect-square w-7 rounded-[6px] border ${colorClasses[value] ?? colorClasses[0]} ${
                      ghostActive && value === 0 ? 'border-dashed border-primary/30 bg-primary/5' : ''
                    }`}
                  ></div>
                );
              })
            )}
          </div>
        </div>
        <div className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 px-4 py-3 text-sm text-muted-foreground">
          Fleches pour se deplacer, fleche haute pour tourner, barre espace pour drop instant.
        </div>
      </div>
    </div>
  );
};

export default TetrisGame;

function createEmptyBoard() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
}

function createPiece(): Piece {
  const index = Math.floor(Math.random() * shapes.length);
  return {
    shape: shapes[index],
    color: index + 1,
  };
}

function rotateMatrix(matrix: number[][]) {
  return matrix[0].map((_, index) => matrix.map((row) => row[index])).reverse();
}

function isValidPosition(board: number[][], shape: number[][], position: { x: number; y: number }) {
  return shape.every((row, y) =>
    row.every((value, x) => {
      if (!value) {
        return true;
      }
      const newX = position.x + x;
      const newY = position.y + y;
      return newX >= 0 && newX < COLS && newY < ROWS && (newY < 0 || board[newY][newX] === 0);
    })
  );
}

function mergeBoard(board: number[][], piece: Piece, position: { x: number; y: number }) {
  const newBoard = board.map((row) => [...row]);
  piece.shape.forEach((row, y) =>
    row.forEach((value, x) => {
      if (value) {
        const ny = position.y + y;
        const nx = position.x + x;
        if (ny >= 0) {
          newBoard[ny][nx] = piece.color;
        }
      }
    })
  );
  return newBoard;
}

function clearLines(board: number[][]) {
  const filtered = board.filter((row) => row.some((cell) => cell === 0));
  const cleared = ROWS - filtered.length;
  const padding = Array.from({ length: cleared }, () => Array(COLS).fill(0));
  return { board: [...padding, ...filtered], cleared };
}
