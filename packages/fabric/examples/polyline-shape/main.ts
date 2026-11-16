// A Polyline joins points without closing the shape
import { Canvas, Polyline } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [300, 200], hint: 'The same points as a Polygon, but the last point is not joined to the first. Turn the fill on to see the implied closing edge.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  let line: Polyline | undefined;
  const draw = (amp: number, filled: boolean): void => {
    if (line) canvas.remove(line);
    const points = Array.from({ length: 9 }, (_, i) => ({ x: i * 30, y: (i % 2 ? -amp : amp) * (0.5 + (i % 4) / 4) }));
    // A Polyline's default fill is black, so "no fill" has to be said out loud.
    line = new Polyline(points, { left: 150, top: 100, fill: filled ? 'rgba(59,125,216,0.35)' : 'transparent', stroke: '#3b7dd8', strokeWidth: 4 });
    canvas.add(line);
    say(`${line.points.length} points · fill ${filled ? 'on' : 'transparent'}`);
  };
  let amp = 50;
  let filled = false;
  draw(amp, filled);
  if (stage.bar) {
    slider(stage.bar, 'amplitude', 10, 80, 1, amp, (v) => draw((amp = v), filled));
    checkbox(stage.bar, 'fill', filled, (v) => draw(amp, (filled = v)));
  } else {
    stage.loop((_dt, t) => draw(20 + 40 * (1 + Math.sin(t * 1.5)) / 1.5, Math.sin(t * 0.7) > 0));
  }

  return stage.dispose;
};

export default mount;
