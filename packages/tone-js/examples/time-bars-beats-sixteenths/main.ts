// bars:beats:sixteenths positions: "1:2:3" counted from zero
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { hitSpec, type HitCase } from '../../shared/time-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const SECONDS = 4;
const RHYTHMS: { label: string; positions: string[] }[] = [
  { label: 'on the beat', positions: ['0:0:0', '0:1:0', '0:2:0', '0:3:0', '1:0:0', '1:1:0', '1:2:0', '1:3:0'] },
  { label: 'off the beat', positions: ['0:0:0', '0:0:3', '0:1:2', '0:2:0', '0:2:3', '0:3:2', '1:0:0', '1:0:3', '1:1:2', '1:2:0', '1:2:3', '1:3:2'] },
];

const cases: HitCase[] = RHYTHMS.map((r) => ({
  label: r.label,
  hits: () => ({
    caption: 'zero-indexed: "0:0:0" is the very start',
    hits: r.positions.map((p) => ({ at: Tone.Time(p).toSeconds(), text: `"${p}"`, accent: p.endsWith(':0:0') })),
  }),
}));

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: SECONDS });
  return stage.run(hitSpec(stage, SECONDS, cases));
};

export default mount;
