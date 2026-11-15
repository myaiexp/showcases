// Bounds contains, intersects, overlaps and equals, on pixel rectangles
import { Bounds, Point } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { animate, BLUE, createPlane, GREEN, gridLines, ORANGE } from '../../shared/plane.ts';

const VIEW = [-10, -10, 260, 160] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Bounds is a rectangle in pixels. Slide the green box right: it overlaps, then only touches (intersects true, overlaps false), then separates. A box inside the blue one is also contained.' });
  const plane = createPlane(stage, VIEW);
  gridLines(plane.base, VIEW, 10);
  const fixed = new Bounds([20, 20], [120, 100]);

  let x = 60;
  let w = 50;
  const draw = (): void => {
    plane.clear();
    const d = plane.live;
    const other = new Bounds([x, 45], [x + w, 75]);
    d.rect(fixed.min, fixed.max, { stroke: BLUE, fill: BLUE, opacity: 0.2, width: 2 });
    d.rect(other.min, other.max, { stroke: GREEN, fill: GREEN, opacity: 0.25, width: 2 });
    const flags = { contains: fixed.contains(other), intersects: fixed.intersects(other), overlaps: fixed.overlaps(other), equals: fixed.equals(other) };
    d.text(new Point(20, 14), `contains ${String(flags.contains)}  intersects ${String(flags.intersects)}`, { fill: ORANGE, size: 9 });
    d.text(new Point(20, 128), `overlaps ${String(flags.overlaps)}  equals ${String(flags.equals)}`, { fill: ORANGE, size: 9 });
    stage.say(`blue.contains(green) ${String(flags.contains)}, intersects ${String(flags.intersects)}, overlaps ${String(flags.overlaps)}`);
  };
  stage.slider('green x', 0, 200, 5, x, (v) => { x = v; draw(); });
  stage.slider('green width', 10, 120, 5, w, (v) => { w = v; draw(); });
  draw();

  if (stage.preview) {
    // Passes through inside (60), overlap (90), touching (120) and apart (160).
    animate(stage, (t) => {
      x = 60 + 100 * (0.5 - 0.5 * Math.cos(t * 0.6));
      x = Math.round(x / 5) * 5;
      draw();
    });
  }
  return () => stage.dispose();
};

export default mount;
