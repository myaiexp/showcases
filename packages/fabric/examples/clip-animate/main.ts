// A canvas clip path moved by object.animate(), chained back and forth
import { Canvas, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { quad } from '../../shared/clip.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [320, 240], hint: 'Two animations run on the same clip path, one per axis. Canvas clip animation is cheap: no object cache is rebuilt.' });
  const canvas = stage.own(new Canvas(stage.el));
  canvas.controlsAboveOverlay = true;

  const clipPath = new Rect({ width: 100, height: 100, left: 70, top: 50 });
  const group = quad(160, 120, { scaleX: 1.5 });
  canvas.clipPath = clipPath;
  canvas.add(group);

  // clipPath.animate() sets one property, redraws through onChange, and calls onComplete to turn around
  const running: Partial<Record<string, { abort(): void }>> = {};
  const pingPong = (key: 'left' | 'top', a: number, b: number, ms: [number, number]): void => {
    const go = (to: number, ms1: number, back: () => void): void => {
      const run = clipPath.animate({ [key]: to }, { duration: ms1, onChange: () => canvas.requestRenderAll(), onComplete: back })[key]!;
      running[key] = run;
    };
    const forth = (): void => go(b, ms[0], () => go(a, ms[1], forth));
    forth();
  };
  pingPong('left', 70, 270, [900, 1200]);
  pingPong('top', 50, 150, [500, 400]);
  // the clip path is not an object on the canvas, so dispose() does not abort these
  stage.onDispose(() => Object.values(running).forEach((r) => r?.abort()));
  return stage.dispose;
};

export default mount;
