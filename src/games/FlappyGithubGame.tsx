import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

const CANVAS_WIDTH = 420;
const CANVAS_HEIGHT = 320;
const PIPE_WIDTH = 52;
const PIPE_GAP = 110;
const GITHUB_LOGO_PATH =
  'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.758-1.333-1.758-1.089-.745.084-.73.084-.73 1.205.084 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.107-.776.42-1.305.763-1.605-2.665-.303-5.467-1.332-5.467-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.654 1.653.243 2.874.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.807 5.625-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12z';

type Pipe = {
  x: number;
  gapY: number;
  scored: boolean;
};

const FlappyGithubGame = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState<'idle' | 'running' | 'over'>('idle');
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!canvas || !context) {
      return;
    }

    let animationFrame = 0;
    const gravity = 0.28;
    const flapStrength = -5.5;
    let birdY = CANVAS_HEIGHT / 2;
    let birdVelocity = 0;
    let pipes: Pipe[] = [];
    let spawnTimer = 0;
    let lastTime = 0;
    let currentStatus: 'idle' | 'running' | 'over' = 'idle';
    let currentScore = 0;

    setScore(0);
    setStatus('idle');

    const resetScene = () => {
      birdY = CANVAS_HEIGHT / 2;
      birdVelocity = 0;
      pipes = [];
      spawnTimer = 0;
      currentStatus = 'idle';
      currentScore = 0;
      setScore(0);
      setStatus('idle');
    };

    const spawnPipe = () => {
      const topMargin = 30;
      const gapY = Math.random() * (CANVAS_HEIGHT - PIPE_GAP - topMargin * 2) + topMargin + PIPE_GAP / 2;
      pipes.push({ x: CANVAS_WIDTH, gapY, scored: false });
    };

    const flap = () => {
      if (currentStatus === 'over') {
        return;
      }
      birdVelocity = flapStrength;
      if (currentStatus === 'idle') {
        currentStatus = 'running';
        setStatus('running');
      }
    };

    const drawBackground = () => {
      context.fillStyle = '#0f172a';
      context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      context.strokeStyle = 'rgba(255,255,255,0.05)';
      for (let i = 0; i < CANVAS_HEIGHT; i += 20) {
        context.beginPath();
        context.moveTo(0, i);
        context.lineTo(CANVAS_WIDTH, i);
        context.stroke();
      }
    };

    const drawBird = () => {
      context.save();
      context.translate(100, birdY);
      context.fillStyle = '#000000';
      context.beginPath();
      context.arc(0, 0, 20, 0, Math.PI * 2);
      context.fill();
      context.fillStyle = '#ffffff';
      const githubPath = new Path2D(GITHUB_LOGO_PATH);
      context.save();
      const scaleFactor = 1.6;
      context.scale(scaleFactor, scaleFactor);
      context.translate(-12, -12);
      context.fill(githubPath);
      context.restore();
      context.restore();
    };

    const drawPipeSection = (x: number, y: number, height: number, orientation: 'top' | 'bottom') => {
      const gradient = context.createLinearGradient(x, 0, x + PIPE_WIDTH, 0);
      gradient.addColorStop(0, '#15803d');
      gradient.addColorStop(0.5, '#16a34a');
      gradient.addColorStop(1, '#15803d');
      context.fillStyle = gradient;
      context.fillRect(x, y, PIPE_WIDTH, height);

      const capHeight = 16;
      const capGradient = context.createLinearGradient(x, y, x + PIPE_WIDTH + 8, y + capHeight);
      capGradient.addColorStop(0, '#22c55e');
      capGradient.addColorStop(1, '#16a34a');
      context.fillStyle = capGradient;
      if (orientation === 'top') {
        context.fillRect(x - 4, y + height - capHeight, PIPE_WIDTH + 8, capHeight);
      } else {
        context.fillRect(x - 4, y, PIPE_WIDTH + 8, capHeight);
      }

      context.fillStyle = 'rgba(255,255,255,0.15)';
      context.fillRect(x + 6, y + (orientation === 'top' ? 0 : capHeight), 6, height - capHeight);
    };

    const drawPipes = () => {
      pipes.forEach((pipe) => {
        const topHeight = pipe.gapY - PIPE_GAP / 2;
        const bottomY = pipe.gapY + PIPE_GAP / 2;
        drawPipeSection(pipe.x, 0, topHeight, 'top');
        drawPipeSection(pipe.x, bottomY, CANVAS_HEIGHT - bottomY, 'bottom');
      });
    };

    const update = (delta: number) => {
      if (currentStatus !== 'running') {
        return;
      }

      spawnTimer += delta;
      if (spawnTimer > 1600) {
        spawnPipe();
        spawnTimer = 0;
      }

      pipes = pipes
        .map((pipe) => ({ ...pipe, x: pipe.x - 2.4 }))
        .filter((pipe) => pipe.x + PIPE_WIDTH > 0);

      pipes.forEach((pipe) => {
        const topHeight = pipe.gapY - PIPE_GAP / 2;
        const bottomY = pipe.gapY + PIPE_GAP / 2;
        if (!pipe.scored && pipe.x + PIPE_WIDTH < 100) {
          pipe.scored = true;
          currentScore += 1;
          setScore(currentScore);
        }
        const collisionX = 100 + 12 > pipe.x && 100 - 12 < pipe.x + PIPE_WIDTH;
        const collisionY = birdY - 12 < topHeight || birdY + 12 > bottomY;
        if (collisionX && collisionY) {
          currentStatus = 'over';
          setStatus('over');
        }
      });

      birdVelocity += gravity;
      birdY += birdVelocity;

      if (birdY + 12 >= CANVAS_HEIGHT || birdY - 12 <= 0) {
        currentStatus = 'over';
        setStatus('over');
      }
    };

    const draw = () => {
      drawBackground();
      drawPipes();
      drawBird();
      context.fillStyle = '#e2e8f0';
      context.font = 'bold 22px Inter, sans-serif';
      context.fillText(String(currentScore), CANVAS_WIDTH - 60, 36);

      if (currentStatus === 'idle') {
        context.font = '16px Inter, sans-serif';
        context.fillText('Clique pour lancer le vol', 24, CANVAS_HEIGHT - 30);
      }

      if (currentStatus === 'over') {
        context.fillStyle = 'rgba(15, 23, 42, 0.75)';
        context.fillRect(30, CANVAS_HEIGHT / 2 - 40, CANVAS_WIDTH - 60, 80);
        context.fillStyle = '#f97316';
        context.font = 'bold 20px Inter, sans-serif';
        context.fillText('Perdu ! Clique rejouer.', 60, CANVAS_HEIGHT / 2 + 6);
      }
    };

    const loop = (timestamp: number) => {
      animationFrame = requestAnimationFrame(loop);
      const delta = timestamp - lastTime;
      lastTime = timestamp;
      update(delta);
      draw();
    };

    const handlePointer = (event: PointerEvent) => {
      event.preventDefault();
      if (currentStatus === 'over') {
        resetScene();
      }
      flap();
    };

    canvas.addEventListener('pointerdown', handlePointer);
    draw();
    animationFrame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrame);
      canvas.removeEventListener('pointerdown', handlePointer);
    };
  }, [resetKey]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Score : <span className="font-semibold text-foreground">{score}</span></span>
        <span className={status === 'running' ? 'text-emerald-400' : status === 'idle' ? 'text-primary' : 'text-destructive'}>
          {status === 'idle' ? 'Pret' : status === 'running' ? 'En vol' : 'Perdu'}
        </span>
      </div>
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="mx-auto w-full max-w-xl rounded-lg border border-primary/30 bg-slate-900 shadow-inner"
      />
      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={() => setResetKey((prev) => prev + 1)}>
          Rejouer
        </Button>
      </div>
    </div>
  );
};

export default FlappyGithubGame;
