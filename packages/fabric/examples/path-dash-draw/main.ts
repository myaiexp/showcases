// Paths: a dash as long as the path plus an animated strokeDashOffset makes the path draw itself
import { Canvas, Path, util } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [320, 200], hint: 'strokeDashArray [L, L] is one dash and one gap, each as long as the whole path (L). Sliding strokeDashOffset from L to 0 reveals it from the start.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const path = new Path('M 20 150 C 20 20, 120 20, 120 100 S 220 180, 300 50', { fill: 'transparent', stroke: '#e94b3c', strokeWidth: 6, strokeLineCap: 'round', objectCaching: false });
  canvas.add(path);

  // the total length is the last entry of the segment info list
  const length = util.getPathSegmentsInfo(path.path).at(-1)!.length;
  path.set('strokeDashArray', [length, length]);

  const reveal = (p: number): void => {
    path.set('strokeDashOffset', length * (1 - p));
    say(`path length ${length.toFixed(0)} · strokeDashOffset ${(length * (1 - p)).toFixed(0)}`);
    canvas.requestRenderAll();
  };
  reveal(0);
  let play = true;
  const range = stage.bar ? slider(stage.bar, 'progress', 0, 1, 0.01, 0, reveal, (v) => `${Math.round(v * 100)}%`) : null;
  if (stage.bar) checkbox(stage.bar, 'play', true, (v) => (play = v));
  stage.loop((_dt, t) => {
    if (!play) return;
    const p = Math.min(1, (t % 3) / 2.4);
    reveal(p);
    if (range) range.value = String(p);
  });

  return stage.dispose;
};

export default mount;
