// Time notation: "4n", "8n", "8t", "16n" scale with the tempo
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { evenHits, hitSpec, num, type HitCase } from '../../shared/time-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const SECONDS = 3;
const NAMES = ['4n', '8n', '8t', '16n'] as const;
const WORDS: Record<(typeof NAMES)[number], string> = { '4n': 'quarter note', '8n': 'eighth note', '8t': 'eighth-note triplet', '16n': 'sixteenth note' };

const cases: HitCase[] = NAMES.map((n) => ({
  label: `"${n}"`,
  hits: () => {
    const gap = Tone.Time(n).toSeconds();
    const bpm = Math.round(Tone.getTransport().bpm.value);
    return { caption: `a ${WORDS[n]} at ${bpm} BPM`, hits: evenHits(gap, SECONDS, () => `"${n}" = ${num(gap)} s`, 1) };
  },
}));

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: SECONDS });
  return stage.run(hitSpec(stage, SECONDS, cases, (bar) => slider(bar, 'tempo', 60, 200, 5, 120, (v) => (Tone.getTransport().bpm.value = v), (v) => `${v} BPM`)));
};

export default mount;
