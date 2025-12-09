import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

const GRID_SIZE = 20;
const TILE_SIZE = 18;
const CANVAS_SIZE = GRID_SIZE * TILE_SIZE;

type Point = { x: number; y: number };

const SnakeGame = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState<'running' | 'over'>('running');
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!canvas || !context) {
      return;
    }

    let animationFrame = 0;
    let lastTime = 0;
    const step = 120;
    let accumulator = 0;
    let direction: Point = { x: 1, y: 0 };
    let pendingDirection: Point = { x: 1, y: 0 };
    let snake: Point[] = [
      { x: Math.floor(GRID_SIZE / 2), y: Math.floor(GRID_SIZE / 2) },
      { x: Math.floor(GRID_SIZE / 2) - 1, y: Math.floor(GRID_SIZE / 2) },
    ];
    let apple = spawnApple(snake);
    let running = true;

    setScore(0);
    setStatus('running');

    const draw = () => {
      context.fillStyle = '#020817';
      context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

      context.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      for (let i = 0; i <= GRID_SIZE; i++) {
        context.beginPath();
        context.moveTo(i * TILE_SIZE, 0);
        context.lineTo(i * TILE_SIZE, CANVAS_SIZE);
        context.stroke();
        context.beginPath();
        context.moveTo(0, i * TILE_SIZE);
        context.lineTo(CANVAS_SIZE, i * TILE_SIZE);
        context.stroke();
      }

      context.fillStyle = '#f97316';
      context.beginPath();
      context.arc(
        apple.x * TILE_SIZE + TILE_SIZE / 2,
        apple.y * TILE_SIZE + TILE_SIZE / 2,
        TILE_SIZE / 2.5,
        0,
        Math.PI * 2
      );
      context.fill();

      snake.forEach((segment, index) => {
        context.fillStyle = index === 0 ? '#34d399' : '#10b981';
        context.fillRect(
          segment.x * TILE_SIZE + 1,
          segment.y * TILE_SIZE + 1,
          TILE_SIZE - 2,
          TILE_SIZE - 2
        );
      });
    };

    const update = () => {
      if (!running) {
        return;
      }

      direction = pendingDirection;
      const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

      if (
        head.x < 0 ||
        head.x >= GRID_SIZE ||
        head.y < 0 ||
        head.y >= GRID_SIZE ||
        snake.some((segment) => segment.x === head.x && segment.y === head.y)
      ) {
        running = false;
        setStatus('over');
        return;
      }

      snake.unshift(head);

      if (head.x === apple.x && head.y === apple.y) {
        setScore((prev) => prev + 10);
        apple = spawnApple(snake);
      } else {
        snake.pop();
      }
    };

    const loop = (timestamp: number) => {
      animationFrame = requestAnimationFrame(loop);
      const delta = timestamp - lastTime;
      lastTime = timestamp;
      accumulator += delta;

      if (accumulator > step) {
        update();
        draw();
        accumulator = 0;
      }
    };

    const handleKeydown = (event: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        event.preventDefault();
      } else {
        return;
      }

      let nextDirection = pendingDirection;

      switch (event.key) {
        case 'ArrowUp':
          nextDirection = { x: 0, y: -1 };
          break;
        case 'ArrowDown':
          nextDirection = { x: 0, y: 1 };
          break;
        case 'ArrowLeft':
          nextDirection = { x: -1, y: 0 };
          break;
        case 'ArrowRight':
          nextDirection = { x: 1, y: 0 };
          break;
      }

      if (nextDirection.x === -direction.x && nextDirection.y === -direction.y) {
        return;
      }

      pendingDirection = nextDirection;
    };

    window.addEventListener('keydown', handleKeydown, { passive: false });
    draw();
    animationFrame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [resetKey]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm font-medium text-foreground">
        <span>Score : {score}</span>
        <span className={status === 'running' ? 'text-emerald-400' : 'text-destructive'}>
          {status === 'running' ? 'En cours' : 'Game over'}
        </span>
      </div>

      <canvas
        ref={canvasRef}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        className="mx-auto w-full max-w-sm rounded-lg border border-primary/30 bg-slate-900"
      />

      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={() => setResetKey((prev) => prev + 1)}>
          Rejouer
        </Button>
      </div>
    </div>
  );
};

export default SnakeGame;

function spawnApple(snake: Point[]): Point {
  while (true) {
    const apple = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };

    const isOnSnake = snake.some((segment) => segment.x === apple.x && segment.y === apple.y);
    if (!isOnSnake) {
      return apple;
    }
  }
}
