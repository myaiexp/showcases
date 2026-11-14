// Oscillator phase: two identical sine waves, one shifted, add up or cancel out
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { toneStage } from '../../shared/stage.ts';
import { bigLabel } from '../../shared/widgets.ts';

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 3 });
  const label = bigLabel(stage.visual);
  const describe = (deg: number): string =>
    `second wave shifted ${deg}°\n${deg === 180 ? 'opposite: they cancel to silence' : deg === 0 ? 'in step: twice as loud' : 'partly in step'}`;

  return stage.run({
    build: () => {
      const out = new Tone.Volume(-12).toDestination();
      const a = new Tone.Oscillator(220, 'sine').connect(out);
      const b = new Tone.Oscillator({ frequency: 220, type: 'sine', phase: 0 }).connect(out);
      return { a, b, out };
    },
    play: ({ a, b }, time) => {
      const text = describe(b.phase);
      stage.show(time, () => (label.textContent = text));
      a.start(time);
      b.start(time);
      return (end) => {
        a.stop(end);
        b.stop(end);
      };
    },
    variants: [0, 90, 180].map((deg) => ({
      label: `phase ${deg}`,
      apply: ({ b }: { b: Tone.Oscillator }) => (b.phase = deg),
    })),
    controls: ({ b }, bar) => {
      label.textContent = describe(0);
      slider(bar, 'phase of second wave', 0, 360, 5, 0, (deg) => {
        b.phase = deg;
        label.textContent = describe(deg);
      }, (deg) => `${deg}°`);
    },
  });
};

export default mount;
