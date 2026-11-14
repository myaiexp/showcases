// ToneBufferSource one-shots: a fresh source per strike, with its own fades
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { sample } from '../../shared/samples.ts';
import { toneStage } from '../../shared/stage.ts';
import { pads } from '../../shared/widgets.ts';

// Four strikes of one gong recording, tuned by playbackRate to a pentatonic shape.
const RATES = [1, 1.2, 1.5, 1.8];
const NAMES = ['1', '1.2', '1.5', '1.8'].map((r) => `rate ${r}`);
type Curve = 'linear' | 'exponential';
interface Fade {
  fadeIn: number;
  fadeOut: number;
  curve: Curve;
}
const CASES: Fade[] = [
  { fadeIn: 0, fadeOut: 0, curve: 'linear' },
  { fadeIn: 0.4, fadeOut: 0.4, curve: 'linear' },
  { fadeIn: 0.4, fadeOut: 0.4, curve: 'exponential' },
];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 3 });
  const grid = pads(stage.visual, NAMES);
  const fade: Fade = { ...CASES[0]! };

  return stage.run({
    build: async () => ({
      buffer: await sample('gong'),
      out: new Tone.Volume(-8).toDestination(),
      live: [] as Tone.ToneBufferSource[],
    }),

    // A ToneBufferSource plays once: each strike below makes a new one.
    play: (g, time) => {
      g.live.forEach((s) => s.dispose());
      g.live = RATES.map((rate, i) => {
        const at = time + i * 0.6;
        const source = new Tone.ToneBufferSource({ url: g.buffer, playbackRate: rate, ...fade }).connect(g.out);
        source.start(at, 0, 0.7);
        stage.show(at, () => grid.hit(i, 0.7));
        return source;
      });
    },

    variants: CASES.map((c) => ({
      label: c.fadeIn ? `${c.curve} fades, ${c.fadeIn} s` : 'no fades',
      apply: () => Object.assign(fade, c),
    })),

    dispose: (g) => {
      g.live.forEach((s) => s.dispose());
      g.buffer.dispose();
      g.out.dispose();
    },

    controls: (g, bar) => {
      grid.onHit(async (i) => {
        await Tone.start();
        new Tone.ToneBufferSource({ url: g.buffer, playbackRate: RATES[i]!, ...fade }).connect(g.out).start(Tone.now(), 0, 0.7);
      });
      slider(bar, 'fadeIn', 0, 0.6, 0.05, 0, (v) => (fade.fadeIn = v), (v) => `${v} s`);
      slider(bar, 'fadeOut', 0, 0.6, 0.05, 0, (v) => (fade.fadeOut = v), (v) => `${v} s`);
      select(bar, 'curve', ['linear', 'exponential'] as const, (c) => (fade.curve = c));
    },
  });
};

export default mount;
