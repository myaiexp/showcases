// Multiply and Add: vibrato depth and centre pitch from a -1 to 1 wave
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { burst, sampleFn, trace, voice, wave } from '../../shared/signal-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const SECONDS = 3;
const CASES = [
  { depth: 40, base: 440 },
  { depth: 200, base: 440 },
  { depth: 150, base: 600 },
];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: SECONDS });
  const view = trace(stage, SECONDS, { yMin: 200, yMax: 900, unit: 'Hz', guides: [440, 600] });
  let cur = { ...CASES[0]! };

  return stage.run({
    build: () => {
      const osc = voice();
      const lfo = new Tone.LFO(2, -1, 1);
      const times = new Tone.Multiply(cur.depth);
      const plus = new Tone.Add(cur.base);
      lfo.chain(times, plus, osc.frequency);
      return { osc, lfo, times, plus };
    },
    play: (g, time) => {
      g.times.factor.value = cur.depth;
      g.plus.addend.value = cur.base;
      g.lfo.start(time).stop(time + SECONDS);
      burst(g.osc, time, SECONDS);
      const { depth, base } = cur;
      view.show(time, [sampleFn((t) => wave('sine', 2, t) * depth + base, SECONDS)], `(wave x ${depth}) + ${base}: swings ${base - depth} to ${base + depth} Hz`);
    },
    variants: CASES.map((c) => ({
      label: `x${c.depth} +${c.base}`,
      apply: () => {
        cur = { ...c };
      },
    })),
    controls: (g, bar) => {
      slider(bar, 'Multiply', 0, 300, 10, cur.depth, (v) => (cur.depth = g.times.factor.value = v), (v) => `x ${v}`);
      slider(bar, 'Add', 300, 700, 10, cur.base, (v) => (cur.base = g.plus.addend.value = v), (v) => `+ ${v}`);
    },
    frame: (t) => view.frame(t),
  });
};

export default mount;
