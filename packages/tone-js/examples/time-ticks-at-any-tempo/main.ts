// Ticks ("192i" is a quarter note) land at different seconds per tempo
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { hitSpec, num, type Hit, type HitCase } from '../../shared/time-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const SECONDS = 4;
// One four-beat pattern in ticks (192 per quarter note), repeated to fill the pass.
const PATTERN = [0, 192, 288, 384, 480, 576, 672];
const BAR = 768;

const cases: HitCase[] = [90, 120, 180].map((bpm) => ({
  label: `${bpm} BPM`,
  setup: () => {
    Tone.getTransport().bpm.value = bpm;
  },
  hits: () => {
    const hits: Hit[] = [];
    for (let bar = 0; bar < 8; bar++) {
      for (const tick of PATTERN) {
        const at = Tone.Time(`${bar * BAR + tick}i`).toSeconds();
        if (at < SECONDS) hits.push({ at, text: `${bar * BAR + tick}i = ${num(at)} s`, accent: tick === 0 });
      }
    }
    return { caption: `${bpm} BPM: the pattern 0i, 192i, 288i, 384i... in ticks`, hits };
  },
}));

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: SECONDS });
  return stage.run(hitSpec(stage, SECONDS, cases));
};

export default mount;
