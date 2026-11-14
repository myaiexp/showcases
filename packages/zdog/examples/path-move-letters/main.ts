// Pen-lift letters: block letters, one Shape each, with move commands
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox } from '../../shared/controls.ts';

type P = { x: number; y: number };
type Cmd = P | { move: P };

// each letter is a list of strokes; every stroke after the first starts with a move
const LETTERS: { x: number; color: string; strokes: P[][] }[] = [
  {
    x: -78,
    color: '#E62',
    strokes: [
      [{ x: -20, y: -36 }, { x: -20, y: 36 }],
      [{ x: 20, y: -36 }, { x: 20, y: 36 }],
      [{ x: -20, y: 0 }, { x: 20, y: 0 }],
    ],
  },
  {
    x: -8,
    color: '#EA0',
    strokes: [
      [{ x: -14, y: -36 }, { x: 14, y: -36 }],
      [{ x: 0, y: -36 }, { x: 0, y: 36 }],
      [{ x: -14, y: 36 }, { x: 14, y: 36 }],
    ],
  },
  {
    x: 52,
    color: '#a35ac9',
    strokes: [
      [{ x: 0, y: -36 }, { x: 0, y: 14 }],
      [{ x: 0, y: 34 }, { x: 0, y: 36 }],
    ],
  },
];

function toPath(strokes: P[][], lift: boolean): Cmd[] {
  const path: Cmd[] = [];
  strokes.forEach((stroke, i) => {
    stroke.forEach((p, j) => {
      // a move lifts the pen; a plain point draws a line from wherever the pen was
      path.push(j === 0 && i > 0 && lift ? { move: p } : p);
    });
  });
  return path;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag to turn the letters.' });
  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom * 1.25,
    rotate: { x: -0.1, y: -0.4 },
    dragRotate: true,
  });

  let lift = true;
  const made: Zdog.Anchor[] = [];
  const build = (): void => {
    for (const m of made.splice(0)) m.remove();
    for (const l of LETTERS) {
      const path = toPath(l.strokes, lift);
      const letter = new Zdog.Anchor({ addTo: illo, translate: { x: l.x } });
      // a darker copy pushed back makes the strokes read as a block
      new Zdog.Shape({ addTo: letter, path, closed: false, stroke: 14, color: '#6d3a86', translate: { z: -14 } });
      new Zdog.Shape({ addTo: letter, path, closed: false, stroke: 14, color: l.color, translate: { z: 6 } });
      made.push(letter);
    }
  };
  build();

  if (stage.bar) checkbox(stage.bar, 'lift the pen (move)', lift, (v) => { lift = v; build(); });
  else stage.every(1800, () => { lift = !lift; build(); });

  stage.loop((_dt, t) => {
    if (stage.preview) illo.rotate.y = -0.4 + Math.sin(t * 0.8) * 0.5;
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;
