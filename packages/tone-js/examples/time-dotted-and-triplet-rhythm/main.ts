// Dotted and triplet notes: "8n." is long-short, "8t" fits three a beat
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { hitSpec, num, type Hit, type HitCase } from '../../shared/time-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const SECONDS = 3;
const FEELS: { label: string; notes: string[]; caption: string }[] = [
  { label: 'straight', notes: ['8n', '8n'], caption: 'two even eighths fill a beat' },
  { label: 'dotted', notes: ['8n.', '16n'], caption: 'a dotted eighth and a sixteenth fill a beat: long-short' },
  { label: 'triplet', notes: ['8t', '8t', '8t'], caption: 'three triplet eighths fill a beat: a rolling feel' },
];

const cases: HitCase[] = FEELS.map((f) => ({
  label: f.label,
  hits: () => {
    const hits: Hit[] = [];
    let at = 0;
    for (let i = 0; at < SECONDS - 1e-6; i++) {
      const n = f.notes[i % f.notes.length]!;
      const len = Tone.Time(n).toSeconds();
      hits.push({ at, text: `"${n}" = ${num(len)} s`, accent: i % f.notes.length === 0 });
      at += len;
    }
    return { caption: f.caption, hits };
  },
}));

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: SECONDS });
  return stage.run(hitSpec(stage, SECONDS, cases));
};

export default mount;
