// Objects: a Line is made from [x1, y1, x2, y2] and must have a stroke to show up
import { Canvas, Line } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [300, 200],
    hint: 'A line has no fill: only stroke and strokeWidth draw it. The sliders build a new Line from the end points.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  // Changing x1..y2 with set() would move the object around its old position, so each
  // change replaces the line with a new one made from the four coordinates.
  let line: Line | undefined;
  const draw = (x1: number, y1: number, x2: number, y2: number): void => {
    if (line) canvas.remove(line);
    line = new Line([x1, y1, x2, y2], { stroke: '#e94b3c', strokeWidth: 6, strokeLineCap: 'round' });
    canvas.add(line);
    say(`[${x1.toFixed(0)}, ${y1.toFixed(0)}, ${x2.toFixed(0)}, ${y2.toFixed(0)}]`);
  };
  const p = { x1: 40, y1: 160, x2: 260, y2: 40 };
  draw(p.x1, p.y1, p.x2, p.y2);
  if (stage.bar) {
    for (const key of ['x1', 'y1', 'x2', 'y2'] as const) {
      slider(stage.bar, key, 10, key[0] === 'x' ? 290 : 190, 1, p[key], (v) => {
        p[key] = v;
        draw(p.x1, p.y1, p.x2, p.y2);
      });
    }
  } else {
    stage.loop((_dt, t) => draw(40, 160, 150 + 110 * Math.cos(t * 1.4), 100 + 70 * Math.sin(t * 1.4)));
  }

  return stage.dispose;
};

export default mount;
