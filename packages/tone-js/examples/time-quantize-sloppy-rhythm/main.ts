// Time(...).quantize: snaps loose, human timing onto the nearest grid line
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { hitSpec, num, type HitCase } from '../../shared/time-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const SECONDS = 3.5;
// A hand-tapped rhythm, in seconds: close to an eighth-note grid but not on it.
const TAPS = [0.08, 0.61, 1.09, 1.38, 1.93, 2.37, 2.82];
const MODES: { label: string; call: string; snap: (t: number) => number }[] = [
  { label: 'as played', call: 'raw times', snap: (t) => t },
  { label: '"4n"', call: 'quantize("4n")', snap: (t) => Tone.Time(t).quantize('4n') },
  { label: '"8n"', call: 'quantize("8n")', snap: (t) => Tone.Time(t).quantize('8n') },
  { label: '"8n", 50%', call: 'quantize("8n", 0.5)', snap: (t) => Tone.Time(t).quantize('8n', 0.5) },
];

const cases: HitCase[] = MODES.map((m) => ({
  label: m.label,
  hits: () => ({
    caption: `Time(seconds).${m.call}`,
    hits: TAPS.map((t) => {
      const q = m.snap(t);
      return { at: q, text: `${num(t, 2)} s -> ${num(q, 2)} s` };
    }),
  }),
}));

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: SECONDS });
  return stage.run(hitSpec(stage, SECONDS, cases));
};

export default mount;
