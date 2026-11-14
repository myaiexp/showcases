// rampTo picks its curve by units: octaves for Hz, straight for numbers
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { burst, sampleParam, trace } from '../../shared/signal-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const SECONDS = 3;
type Pick = 'frequency' | 'number';

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: SECONDS });
  const view = trace(stage, SECONDS, { yMin: 0, yMax: 1100, unit: 'Hz', guides: [100, 500, 1000] });
  let pick: Pick = 'frequency';

  return stage.run({
    build: () => {
      // Two signals ramped with the same call: only their units differ.
      const hz = new Tone.Signal({ value: 100, units: 'frequency' });
      const plain = new Tone.Signal(100);
      const osc = new Tone.Oscillator({ type: 'triangle', frequency: 0, volume: -12 }).toDestination();
      return { hz, plain, osc };
    },
    play: (g, time) => {
      for (const s of [g.hz, g.plain]) {
        s.cancelScheduledValues(time);
        s.setValueAtTime(100, time);
        s.rampTo(1000, 2.5, time);
      }
      // Whichever one is chosen steers the pitch; the other is the dashed line.
      g.hz.disconnect();
      g.plain.disconnect();
      (pick === 'frequency' ? g.hz : g.plain).connect(g.osc.frequency);
      const lines = [sampleParam(g.hz, time, SECONDS), sampleParam(g.plain, time, SECONDS)];
      if (pick === 'number') lines.reverse();
      view.show(time, lines, pick === 'frequency' ? "units: 'frequency' ramps by octaves (dashed: plain number, straight)" : "units: 'number' ramps in a straight line (dashed: frequency, by octaves)");
      burst(g.osc, time, SECONDS);
    },
    variants: (['frequency', 'number'] as const).map((p) => ({
      label: p === 'frequency' ? 'Hz signal' : 'number signal',
      apply: () => {
        pick = p;
      },
    })),
    controls: (_, bar) => select<Pick>(bar, 'units', ['frequency', 'number'], (v) => (pick = v)),
    frame: (t) => view.frame(t),
  });
};

export default mount;
