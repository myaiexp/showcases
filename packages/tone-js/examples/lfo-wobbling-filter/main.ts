// LFO into a filter cutoff: a steady wah on a sawtooth
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { burst, sampleFn, trace, wave } from '../../shared/signal-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const SECONDS = 3;
const LOW = 200;
const HIGH = 2400;
const RATES = [1, 3];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: SECONDS });
  const view = trace(stage, SECONDS, { yMin: 0, yMax: HIGH, unit: 'Hz', guides: [LOW, HIGH], caption: 'filter cutoff' });
  let rate = RATES[0]!;

  return stage.run({
    build: () => {
      const filter = new Tone.Filter({ frequency: 800, type: 'lowpass', Q: 6 }).toDestination();
      const saw = new Tone.Oscillator({ type: 'sawtooth', frequency: 110, volume: -10 }).connect(filter);
      // The LFO's output replaces the cutoff: it swings between LOW and HIGH.
      const lfo = new Tone.LFO(rate, LOW, HIGH);
      lfo.connect(filter.frequency);
      return { filter, saw, lfo };
    },
    play: (g, time) => {
      g.lfo.frequency.value = rate;
      g.lfo.start(time).stop(time + SECONDS);
      burst(g.saw, time, SECONDS);
      const r = rate;
      view.show(time, [sampleFn((t) => LOW + ((wave('sine', r, t) + 1) / 2) * (HIGH - LOW), SECONDS)], `lfo.connect(filter.frequency): ${r} swing${r === 1 ? '' : 's'} per second`);
    },
    variants: RATES.map((r) => ({
      label: `${r} Hz`,
      apply: () => {
        rate = r;
      },
    })),
    controls: (g, bar) => slider(bar, 'speed', 0.5, 8, 0.5, rate, (v) => (rate = g.lfo.frequency.value = v), (v) => `${v} Hz`),
    frame: (t) => view.frame(t),
  });
};

export default mount;
