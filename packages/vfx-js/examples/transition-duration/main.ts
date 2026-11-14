// VFX-JS example: duration in seconds, and duration 0 cutting without animation
import { Swipe } from '@vfx-js/transitions';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { drive, trKit } from '../../shared/tr-kit.ts';

const mount: Mount = async (el, ctx) => {
  const kit = await trKit(el, ctx);
  const { stage, vfx, box } = kit;

  // The container's default; each show() below overrides it for that run.
  const t = vfx.addTransition(box, { transition: Swipe, duration: 0.6 });
  const cardDurations = [1.2, 0, 0.3];
  let duration = 1.2;
  let run = 0;
  const describeD = (d: number): string => (d === 0 ? 'duration 0: a cut' : `duration ${d}s`);
  drive(kit, t, {
    label: () => describeD(duration),
    showOpts: () => {
      if (stage.preview) duration = cardDurations[run++ % cardDurations.length]!;
      return { duration };
    },
  });

  if (stage.bar) {
    slider(stage.bar, 'duration', 0, 3, 0.1, duration, (v) => {
      duration = v;
      stage.say(`Next run: ${describeD(v)}`);
    }, (v) => (v === 0 ? '0 (cut)' : `${v}s`));
  }
  return () => stage.dispose();
};

export default mount;
