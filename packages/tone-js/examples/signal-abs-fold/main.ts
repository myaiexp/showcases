// Abs: folds the negative half of a wave up, so pitch bounces off a floor
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { burst, sampleFn, trace, voice, wave } from '../../shared/signal-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const SECONDS = 3;
const RATE = 1;

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: SECONDS });
  const view = trace(stage, SECONDS, { yMin: 150, yMax: 750, unit: 'Hz', guides: [200, 700] });
  let folded = false;

  return stage.run({
    build: () => {
      const osc = voice();
      const lfo = new Tone.LFO(RATE, -1, 1);
      const abs = new Tone.Abs();
      const times = new Tone.Multiply(250);
      const plus = new Tone.Add(450);
      abs.connect(times);
      times.chain(plus, osc.frequency);
      return { osc, lfo, abs, times, plus };
    },
    play: (g, time) => {
      // Plain: 450 +/- 250. Folded: 200 + 500 x |wave|, which never goes below 200.
      g.lfo.disconnect();
      g.lfo.connect(folded ? g.abs : g.times);
      g.times.factor.value = folded ? 500 : 250;
      g.plus.addend.value = folded ? 200 : 450;
      g.lfo.start(time).stop(time + SECONDS);
      burst(g.osc, time, SECONDS);
      const f = folded;
      view.show(time, [sampleFn((t) => (f ? 200 + 500 * Math.abs(wave('sine', RATE, t)) : 450 + 250 * wave('sine', RATE, t)), SECONDS)], f ? 'wave -> Abs: the dip below zero is flipped up, so the pitch bumps twice per cycle' : 'plain wave: one rise and fall per cycle');
    },
    variants: [false, true].map((f) => ({
      label: f ? 'through Abs' : 'plain wave',
      apply: () => {
        folded = f;
      },
    })),
    controls: (_, bar) => void checkbox(bar, 'through Abs (applies on the next pass)', folded, (v) => (folded = v)),
    frame: (t) => view.frame(t),
  });
};

export default mount;
