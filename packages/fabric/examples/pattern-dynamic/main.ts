// Patterns: a Pattern whose source canvas is repainted every frame
import { Canvas, Pattern, Rect, Triangle } from 'fabric';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'The pattern source is a plain <canvas>. Paint on it again, mark the objects dirty, render: the fill changes with it. Objects with a pattern fill should not be cached.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage, '');

  const source = document.createElement('canvas');
  source.width = source.height = 60;
  const g = source.getContext('2d')!;
  const paint = (t: number): void => {
    g.fillStyle = `hsl(${(t * 60) % 360},70%,92%)`;
    g.fillRect(0, 0, 60, 60);
    g.fillStyle = `hsl(${(t * 60 + 180) % 360},70%,50%)`;
    g.beginPath();
    g.arc(30 + Math.cos(t * 2) * 18, 30 + Math.sin(t * 2) * 18, 9, 0, Math.PI * 2);
    g.fill();
  };
  paint(0);

  const pattern = new Pattern({ source, repeat: 'repeat' });
  // caching would keep the first paint: draw these straight on the canvas
  const rect = new Rect({ left: 110, top: 120, width: 150, height: 170, fill: pattern, objectCaching: false });
  const tri = new Triangle({ left: 265, top: 120, width: 130, height: 150, fill: pattern, objectCaching: false });
  canvas.add(rect, tri);

  stage.loop((_dt, t) => {
    paint(t);
    rect.dirty = tri.dirty = true;
    canvas.requestRenderAll();
    say(`frame at ${t.toFixed(1)} s`);
  });

  return stage.dispose;
};

export default mount;
