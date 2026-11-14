// GreaterThan: turns a wave into an on/off gate with a threshold
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { burst, sampleFn, trace, wave } from '../../shared/signal-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const SECONDS = 3;
const RATE = 1.5;
const MODES = ['above -0.6', 'above 0', 'above 0.6', 'GreaterThanZero'] as const;
type Mode = (typeof MODES)[number];
const LEVEL: Record<Mode, number> = { 'above -0.6': -0.6, 'above 0': 0, 'above 0.6': 0.6, GreaterThanZero: 0 };

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: SECONDS });
  const view = trace(stage, SECONDS, { yMin: -1.3, yMax: 1.3, digits: 2, guides: [0], caption: 'wave (blue), threshold (pink), gate (green): the tone sounds while the wave is above the threshold' });
  let mode: Mode = 'above 0';

  return stage.run({
    build: () => {
      const gate = new Tone.Gain(0).toDestination();
      const osc = new Tone.Oscillator({ type: 'triangle', frequency: 330, volume: -10 }).connect(gate);
      const lfo = new Tone.LFO(RATE, -1, 1);
      const compare = new Tone.GreaterThan(0);
      const compareZero = new Tone.GreaterThanZero();
      lfo.connect(compare);
      lfo.connect(compareZero);
      return { gate, osc, lfo, compare, compareZero };
    },
    play: (g, time) => {
      g.compare.comparator.value = LEVEL[mode];
      g.compare.disconnect();
      g.compareZero.disconnect();
      (mode === 'GreaterThanZero' ? g.compareZero : g.compare).connect(g.gate.gain);
      g.lfo.start(time).stop(time + SECONDS);
      burst(g.osc, time, SECONDS);
      const level = LEVEL[mode];
      const w = (t: number): number => wave('sine', RATE, t);
      view.show(time, [sampleFn(w, SECONDS), sampleFn(() => level, SECONDS), sampleFn((t) => (w(t) > level ? 1.1 : -1.1), SECONDS)], mode === 'GreaterThanZero' ? 'GreaterThanZero: 1 whenever the wave is above zero' : `GreaterThan(${level}): 1 whenever the wave is above ${level}`);
    },
    variants: MODES.map((m) => ({
      label: m,
      apply: () => {
        mode = m;
      },
    })),
    controls: (_, bar) => select<Mode>(bar, 'gate opens', MODES, (v) => (mode = v), mode),
    frame: (t) => view.frame(t),
  });
};

export default mount;
