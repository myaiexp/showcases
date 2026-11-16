// absolutePan puts a canvas pixel at the top left; relativePan nudges
import { Canvas, Point } from 'fabric';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';
import { buildWorld, WORLD_H, WORLD_W } from '../../shared/zoom-world.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    hint: 'absolutePan(p) puts the canvas pixel p at the top-left corner: with a zoom of z, world point (x, y) is at pixel (x * z, y * z). relativePan(v) moves the view by v pixels.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  canvas.add(...buildWorld());
  const say = status(stage);

  const zoom = stage.preview ? 0.8 : 1.5;
  canvas.setViewportTransform([zoom, 0, 0, zoom, 0, 0]);
  const show = (what: string): void => {
    const [, , , , e, f] = canvas.viewportTransform;
    if (stage.preview) say(what);
    else say(`${what}\nviewportTransform e, f = ${Math.round(e)}, ${Math.round(f)} · world point at top-left = ${Math.round(-e / zoom)}, ${Math.round(-f / zoom)}`);
  };
  show('start');

  // Brings a world point to the top-left corner of the pane.
  const goTo = (x: number, y: number): void => {
    canvas.absolutePan(new Point(x * zoom, y * zoom));
    show(`absolutePan(${Math.round(x * zoom)}, ${Math.round(y * zoom)})`);
  };
  const nudge = (dx: number, dy: number): void => {
    canvas.relativePan(new Point(dx, dy));
    show(`relativePan(${dx}, ${dy})`);
  };

  if (stage.bar) {
    let wx = 400;
    let wy = 240;
    slider(stage.bar, 'world x', 0, WORLD_W, 10, wx, (v) => (wx = v));
    slider(stage.bar, 'world y', 0, WORLD_H, 10, wy, (v) => (wy = v));
    button(stage.bar, 'absolutePan to it', () => goTo(wx, wy));
    button(stage.bar, 'origin', () => goTo(0, 0));
    button(stage.bar, 'relativePan(60, 0)', () => nudge(60, 0));
    button(stage.bar, 'relativePan(-60, 0)', () => nudge(-60, 0));
    button(stage.bar, 'relativePan(0, 60)', () => nudge(0, 60));
    button(stage.bar, 'relativePan(0, -60)', () => nudge(0, -60));
  } else {
    const steps: (() => void)[] = [
      () => goTo(500, 300),
      () => nudge(120, 0),
      () => nudge(0, 90),
      () => goTo(0, 0),
      () => goTo(700, 380),
      () => nudge(-150, -60),
    ];
    let n = 0;
    stage.every(1100, () => steps[n++ % steps.length]!());
  }

  return stage.dispose;
};

export default mount;
