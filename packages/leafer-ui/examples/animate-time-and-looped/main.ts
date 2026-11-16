// Animate: reading duration, time and looped while a loop runs
import { Leafer, Rect } from 'leafer-ui';
import { Animate } from '@leafer-in/animate'; // the animation plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button } from '../../shared/controls.ts';
import { readout, track } from '../../shared/animate-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The animation loops 3 times. Watch time climb to duration and looped count up.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const t = track(stage, leafer, stage.height * 0.4);
  const bar = new Rect({ x: t.from, y: stage.height * 0.7, height: 10, width: 0, fill: '#feb027', cornerRadius: 5, hittable: false });
  const back = new Rect({ x: t.from, y: stage.height * 0.7, height: 10, width: t.to - t.from + t.s, fill: 'rgba(0,0,0,0.1)', cornerRadius: 5, hittable: false });
  leafer.add([back, bar]);

  let animate: Animate | undefined;
  stage.onDispose(() => animate?.destroy());
  const make = (): void => {
    animate?.destroy();
    t.rect.x = t.from;
    animate = new Animate(t.rect, { x: t.to }, { duration: 1.5, loop: 3, loopDelay: 0.4 });
  };
  make();
  if (stage.bar) button(stage.bar, 'new Animate', make);
  else stage.every(7000, make);

  readout(stage, () => {
    const a = animate;
    if (!a) return '';
    bar.width = (t.to - t.from + t.s) * Math.min(1, (a.time ?? 0) / a.duration);
    return `duration ${a.duration}   time ${(a.time ?? 0).toFixed(2)}   looped ${a.looped ?? 0}`;
  }, true);
  return stage.dispose;
};

export default mount;
