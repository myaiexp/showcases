// AnimateEvent: the update listener reads animate.style at every change
import { Leafer, Path } from 'leafer-ui';
import { Animate, AnimateEvent } from '@leafer-in/animate'; // the animation plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select } from '../../shared/controls.ts';
import { cycle } from '../../shared/basics.ts';
import { readout, track } from '../../shared/animate-kit.ts';

const EASINGS = ['ease', 'linear', 'bounce-out', 'elastic-out', 'back-in-out'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick an easing: the trace under the track is built from animate.style.x in each update.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const top = stage.preview ? 14 : 30;
  const t = track(stage, leafer, top + 22);
  const gx = 20;
  const gy = top + 56;
  const gw = stage.width - 40;
  const gh = stage.height - gy - (stage.preview ? 34 : 50);
  const trace = new Path({ stroke: '#32cd79', strokeWidth: 2, hittable: false });
  leafer.add(trace);

  let animate: Animate | undefined;
  let easing: (typeof EASINGS)[number] = EASINGS[0];
  let d = '';
  stage.onDispose(() => animate?.destroy());
  const run = (next: (typeof EASINGS)[number]): void => {
    easing = next;
    animate?.destroy();
    t.rect.x = t.from;
    d = '';
    trace.path = '';
    animate = new Animate(t.rect, { x: t.to }, { duration: 1.8, easing });
    animate.on(AnimateEvent.UPDATE, (a: Animate) => {
      // time across, style.x up: the shape of the easing
      const x = gx + gw * Math.min(1, a.time / a.duration);
      const y = gy + gh - gh * (((a.style.x as number) - t.from) / (t.to - t.from));
      d += `${d ? 'L' : 'M'} ${x.toFixed(1)} ${y.toFixed(1)} `;
      trace.path = d;
    });
  };
  if (stage.bar) select(stage.bar, 'easing', EASINGS, run, EASINGS[0]);
  run(EASINGS[0]);
  if (!stage.bar) cycle(stage, EASINGS, (v) => run(v), 3200);
  readout(stage, () => `easing '${easing}'   time ${(animate?.time ?? 0).toFixed(2)}`);
  return stage.dispose;
};

export default mount;
