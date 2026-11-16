// Animate: the steps easing and its rounding method
import { Leafer } from 'leafer-ui';
import { AnimateEasing } from '@leafer-in/animate'; // the animation plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select, slider } from '../../shared/controls.ts';
import { readout } from '../../shared/animate-kit.ts';
import { cycle } from '../../shared/basics.ts';
import { replay } from '../../shared/event-kit.ts';
import { plot, track } from '../../shared/animate-kit.ts';

const ROUNDING = ['floor', 'round', 'ceil'] as const;
const PRESETS = [
  [4, 'floor'],
  [4, 'round'],
  [4, 'ceil'],
  [8, 'floor'],
  [3, 'ceil'],
] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change the step count and the rounding: the staircase and the hops change with them.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const t = track(stage, leafer, stage.height - (stage.preview ? 22 : 36));
  const box = { x: 30, y: 16, w: Math.min(stage.width - 60, stage.preview ? 150 : 260), h: stage.height - (stage.preview ? 80 : 120) };
  const curve = plot(leafer, () => 0, box);
  let count = 4;
  let rounding: (typeof ROUNDING)[number] = 'floor';
  const easing = (): { name: 'steps'; value: [number, 'floor' | 'round' | 'ceil'] } => ({ name: 'steps', value: [count, rounding] });
  const redraw = (): void => {
    const fn = AnimateEasing.get(easing());
    const { x, y, w, h } = box;
    curve.path = Array.from({ length: 201 }, (_, i) => `${i ? 'L' : 'M'} ${x + (w * i) / 200} ${y + h - h * fn(i / 200)}`).join(' ');
  };
  redraw();

  if (stage.bar) {
    slider(stage.bar, 'steps', 1, 12, 1, count, (v) => ((count = v), redraw()));
    select(stage.bar, 'rounding', ROUNDING, (v) => ((rounding = v), redraw()), rounding);
  } else {
    cycle(stage, PRESETS, ([n, r]) => ((count = n), (rounding = r), redraw()), 2600);
  }
  readout(stage, () => `easing: { name: 'steps', value: [${count}, '${rounding}'] }`, true);

  replay(stage, 2600, () => {
    t.rect.killAnimate();
    t.rect.x = t.from;
    t.rect.animate({ x: t.to }, { duration: 2, easing: easing() });
  });
  return stage.dispose;
};

export default mount;
