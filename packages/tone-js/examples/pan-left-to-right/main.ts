// Panner: -1 is all left, 0 centre, 1 all right; here it sweeps across
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { source, type Source } from '../../shared/fx-kit.ts';
import { PINK, bar, column, strip } from '../../shared/routing-kit.ts';
import { toneStage } from '../../shared/stage.ts';

type Mode = 'sweep' | 'left' | 'centre' | 'right';
const FIXED: Record<Exclude<Mode, 'sweep'>, number> = { left: -1, centre: 0, right: 1 };
const SECONDS = 2;

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: SECONDS, channels: 2 });
  const col = column(stage.visual);
  const dot = strip(col, 'left', 'right');
  const readout = bar(col, 'pan', PINK);
  let mode: Mode = 'sweep';
  // The mode of the pass being shown (a card shows one variant after another).
  let shown: Mode = 'sweep';
  let pan = 0;
  const show = (): void => {
    dot.set((pan + 1) / 2);
    readout.set((pan + 1) / 2, `pan ${pan.toFixed(2)}`);
  };

  return stage.run({
    build: async () => {
      const src = await source('riff');
      const panner = new Tone.Panner(0).toDestination();
      src.out.connect(panner);
      return { src, panner };
    },
    play: (g: { src: Source; panner: Tone.Panner }, time) => {
      const p = g.panner.pan;
      p.cancelScheduledValues(time);
      if (mode === 'sweep') {
        p.setValueAtTime(-1, time);
        p.linearRampToValueAtTime(1, time + SECONDS);
      } else {
        p.setValueAtTime(FIXED[mode], time);
      }
      g.src.start(time);
      const m = mode;
      stage.show(time, () => {
        shown = m;
        if (m !== 'sweep') {
          pan = FIXED[m];
          show();
        }
      });
    },
    stop: (g, time) => g.src.stop(time),
    variants: (['sweep', 'centre', 'left', 'right'] as const).map((m) => ({
      label: m === 'sweep' ? 'pan sweeps -1 to 1' : `pan fixed ${m}`,
      apply: () => {
        mode = m;
      },
    })),
    controls: (g, barEl) => {
      select(barEl, 'pan', ['sweep', 'left', 'centre', 'right'] as const, (m) => {
        mode = m;
        shown = m;
        // A fixed pan applies at once; the sweep restarts with the next pass.
        if (m !== 'sweep') {
          g.panner.pan.cancelScheduledValues(0);
          g.panner.pan.value = FIXED[m];
          pan = FIXED[m];
          show();
        }
      });
    },
    frame: (time) => {
      if (shown === 'sweep') {
        pan = -1 + 2 * Math.min(1, time / SECONDS);
        show();
      }
    },
  });
};

export default mount;
