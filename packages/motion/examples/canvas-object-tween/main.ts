// A plain { x, y, r, color } object animated by animate() and drawn to a canvas on update
import { animate, delay, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint } from '../../shared/ui.ts';
import './style.css';

const COLOURS = ['#ff5d73', '#ffb347', '#3ddc97', '#3da5ff', '#b66bff'];
const W = 260;
const H = 170;

const mount: Mount = (el, { preview }) => {
  const canvas = document.createElement('canvas');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  canvas.style.width = `${W}px`;
  canvas.style.height = `${H}px`;
  el.append(canvas);
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  ctx.scale(dpr, dpr);

  // The thing we animate: not an element, just data.
  const ball = { x: 50, y: 85, r: 18, color: COLOURS[0] as string };

  const draw = (): void => {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    ctx.fillRect(0, H - 6, W, 6);
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, Math.max(ball.r, 1), 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.shadowColor = ball.color;
    ctx.shadowBlur = 16;
    ctx.fill();
    ctx.shadowBlur = 0;
  };
  draw();

  let n = 0;
  let removeClick = (): void => {};
  const scope = scopeMotion(el, () => {
    const sendTo = (x: number, y: number): void => {
      n++;
      animate(ball, { x, y, r: 10 + Math.random() * 22, color: COLOURS[n % COLOURS.length] as string }, { type: 'spring', bounce: 0.35, visualDuration: 0.8, onUpdate: draw });
    };

    if (preview) {
      const tick = (): void => {
        sendTo(30 + Math.random() * (W - 60), 30 + Math.random() * (H - 60));
        delay(tick, 1.3);
      };
      delay(tick, 0.5);
      return;
    }
    const onClick = (e: MouseEvent): void => {
      const r = canvas.getBoundingClientRect();
      sendTo(((e.clientX - r.left) / r.width) * W, ((e.clientY - r.top) / r.height) * H);
    };
    canvas.addEventListener('click', onClick);
    removeClick = () => canvas.removeEventListener('click', onClick);
    hint(el, 'Click anywhere on the canvas. A new animate(ball, {...}) call interrupts the last one and carries its velocity.');
  });

  return () => {
    scope.cancel();
    removeClick();
  };
};

export default mount;
