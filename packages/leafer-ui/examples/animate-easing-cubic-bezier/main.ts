// Animate: a cubic-bezier easing object, drawn and run
import { Leafer } from 'leafer-ui';
import { AnimateEasing } from '@leafer-in/animate'; // the animation plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { knobs } from '../../shared/appearance.ts';
import { replay } from '../../shared/event-kit.ts';
import { plot, track } from '../../shared/animate-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move the four control values: the curve and the slide follow. y values past 0 or 1 overshoot.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const t = track(stage, leafer, stage.height - (stage.preview ? 22 : 36));
  const box = { x: 30, y: 16, w: Math.min(stage.width - 60, stage.preview ? 150 : 260), h: stage.height - (stage.preview ? 80 : 120) };
  const value: [number, number, number, number] = [0.7, -0.4, 0.3, 1.4];
  const easing = (): { name: 'cubic-bezier'; value: [number, number, number, number] } => ({ name: 'cubic-bezier', value: [...value] });
  const curve = plot(leafer, (u) => 0, box);
  const redraw = (): void => {
    const fn = AnimateEasing.get(easing()); // the function the animation will use
    const { x, y, w, h } = box;
    curve.path = Array.from({ length: 61 }, (_, i) => `${i ? 'L' : 'M'} ${x + (w * i) / 60} ${y + h - h * fn(i / 60)}`).join(' ');
  };

  const set = (i: number) => (v: number): void => {
    value[i] = v;
    redraw();
  };
  knobs(stage, [
    { label: 'x1', range: [0, 1, 0.05], value: value[0], set: set(0), swing: 0.25 },
    { label: 'y1', range: [-1, 2, 0.05], value: value[1], set: set(1), swing: 0.5 },
    { label: 'x2', range: [0, 1, 0.05], value: value[2], set: set(2), swing: 0.25 },
    { label: 'y2', range: [-1, 2, 0.05], value: value[3], set: set(3), swing: 0.5 },
  ]);

  replay(stage, 2400, () => {
    t.rect.killAnimate();
    t.rect.x = t.from;
    t.rect.animate({ x: t.to }, { duration: 1.6, easing: easing() });
  });
  return stage.dispose;
};

export default mount;
