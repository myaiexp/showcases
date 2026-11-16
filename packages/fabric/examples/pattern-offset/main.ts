// Patterns: offsetX and offsetY slide the tile inside the object
import { Canvas, Pattern, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { tile } from '../../shared/images.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'The offsets move the pattern from the object top left corner. With no-repeat that is where the single tile lands.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage, '');

  const pattern = new Pattern({ source: tile('stripes', 36, '#3b7dd8', '#f6f3ec'), repeat: 'repeat' });
  const lone = new Pattern({ source: tile('checks', 36, '#8e6bd8', '#f6f3ec'), repeat: 'no-repeat' });
  const a = new Rect({ left: 100, top: 120, width: 160, height: 190, fill: pattern, stroke: '#2b2b2b', strokeWidth: 2 });
  const b = new Rect({ left: 270, top: 120, width: 140, height: 190, fill: lone, stroke: '#2b2b2b', strokeWidth: 2 });
  canvas.add(a, b);

  const move = (x: number, y: number): void => {
    pattern.offsetX = lone.offsetX = x;
    pattern.offsetY = lone.offsetY = y;
    a.dirty = b.dirty = true; // the fill was edited in place
    say(`offsetX ${x.toFixed(0)}  offsetY ${y.toFixed(0)}`);
    canvas.requestRenderAll();
  };

  move(0, 0);
  if (stage.preview) stage.loop((_dt, t) => move(50 + 50 * Math.sin(t * 1.2), 70 + 60 * Math.cos(t * 0.9)));
  else {
    let x = 0, y = 0;
    slider(stage.bar!, 'offsetX', 0, 120, 1, x, (v) => move((x = v), y));
    slider(stage.bar!, 'offsetY', 0, 150, 1, y, (v) => move(x, (y = v)));
  }

  return stage.dispose;
};

export default mount;
