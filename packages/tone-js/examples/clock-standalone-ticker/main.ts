// Tone.Clock: a ticker that runs on its own, no Transport, at any frequency
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { toneStage } from '../../shared/stage.ts';
import { blip } from '../../shared/time-kit.ts';
import { bigLabel, pads } from '../../shared/widgets.ts';

const NOTES = ['C5', 'E5', 'G5', 'B5'];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 4 });
  const count = bigLabel(stage.visual, '');
  const cells = pads(stage.visual, NOTES.map((_, i) => String(i + 1)));
  let hz = 4;

  return stage.run({
    build: () => {
      const synth = blip();
      // The callback gets the exact time and the tick count, like a Transport callback does.
      const clock = new Tone.Clock((time, ticks = 0) => {
        synth.triggerAttackRelease(NOTES[ticks % NOTES.length]!, '32n', time);
        stage.show(time, () => {
          cells.hit(ticks % NOTES.length, 0.2);
          count.textContent = `tick ${ticks}`;
        });
      }, 4);
      return { synth, clock };
    },
    play: ({ clock }, time) => {
      clock.frequency.value = hz;
      stage.show(time, () => (count.textContent = `${hz} ticks per second`));
      clock.start(time);
      return (end) => clock.stop(end);
    },
    variants: [2, 4, 8].map((v) => ({ label: `${v} Hz`, apply: ({ clock }: { clock: Tone.Clock }) => {
        hz = v;
        clock.frequency.value = v;
      },
    })),
    controls: ({ clock }, bar) =>
      slider(bar, 'frequency', 1, 16, 0.5, 4, (v) => ((hz = v), (clock.frequency.value = v)), (v) => `${v} Hz`),
  });
};

export default mount;
