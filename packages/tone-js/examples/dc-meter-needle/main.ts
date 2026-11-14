// DCMeter: the raw signal value, so a slow LFO swings it like a needle
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { BLUE, bar, column, strip } from '../../shared/routing-kit.ts';
import { probe, valueAt, type Probe } from '../../shared/stereo-kit.ts';
import { toneStage } from '../../shared/stage.ts';
import { bigLabel } from '../../shared/widgets.ts';

const SECONDS = 2;
const LOW = 200;
const HIGH = 600;
const RATES = [0.5, 1.5];
interface Graph {
  osc: Tone.Oscillator;
  lfo: Tone.LFO;
  dc: Tone.DCMeter;
}

const mount: Mount = async (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: SECONDS });
  const col = column(stage.visual, 10);
  const number = bigLabel(col, '');
  const needle = strip(col, `${LOW}`, `${HIGH} Hz`);
  const level = bar(col, 'raw', BLUE);
  let live: Graph | undefined;
  let rate = RATES[0]!;
  let shown = 0;

  // The DCMeter reads silence in a card, so a card renders just the LFO on its own, once per
  // speed, and reads the signal's value from that.
  const measured: (Probe | null)[] = [];
  if (ctx.preview) {
    for (const r of RATES) {
      measured.push(await probe(stage, SECONDS, 1, () => void new Tone.LFO(r, LOW, HIGH).toDestination().start(0)));
    }
  }

  return stage.run({
    build: (): Graph => {
      // The LFO swings between 200 and 600 and steers the oscillator's pitch; the DCMeter reads the same signal.
      const lfo = new Tone.LFO(rate, LOW, HIGH);
      const osc = new Tone.Oscillator({ frequency: 400, type: 'triangle', volume: -14 }).toDestination();
      const dc = new Tone.DCMeter();
      lfo.connect(osc.frequency);
      lfo.connect(dc);
      live = { osc, lfo, dc };
      return live;
    },
    play: (g, time) => {
      g.lfo.frequency.value = rate;
      g.lfo.start(time);
      g.osc.start(time);
      const idx = RATES.indexOf(rate);
      stage.show(time, () => (shown = idx));
      return (end) => {
        g.osc.stop(end);
        g.lfo.stop(end);
      };
    },
    dispose: (g) => {
      live = undefined;
      for (const n of [g.osc, g.lfo, g.dc]) n.dispose();
    },
    variants: RATES.map((r) => ({
      label: `LFO ${r} Hz`,
      apply: () => {
        rate = r;
      },
    })),
    controls: (g, box) => {
      slider(box, 'LFO speed', 0.1, 4, 0.1, rate, (v) => (g.lfo.frequency.value = rate = v), (v) => `${v} Hz`);
    },
    frame: (time) => {
      const p = measured[shown];
      const v = p ? valueAt(p, 0, time) : live ? live.dc.getValue() : LOW;
      number.textContent = `${v.toFixed(0)} Hz`;
      needle.set((v - LOW) / (HIGH - LOW));
      level.set((v - LOW) / (HIGH - LOW), v.toFixed(1));
    },
  });
};

export default mount;
