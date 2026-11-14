// Time conversions: 1.5 seconds as note length, position and ticks
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { hitSpec, num, type Hit, type HitCase } from '../../shared/time-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const SECONDS = 4;

const cases: HitCase[] = [90, 120, 180].map((bpm) => ({
  label: `${bpm} BPM`,
  setup: () => {
    Tone.getTransport().bpm.value = bpm;
  },
  hits: () => {
    const t = Tone.Time(1.5);
    const lines = [
      `Time(1.5).toSeconds() = ${num(t.toSeconds())}`,
      `.toNotation() = "${t.toNotation()}"`,
      `.toBarsBeatsSixteenths() = "${t.toBarsBeatsSixteenths()}"`,
      `.toTicks() = ${t.toTicks()}`,
    ];
    const beat = 60 / bpm;
    const hits: Hit[] = [];
    for (let i = 0; i * beat < SECONDS - 1e-6; i++) hits.push({ at: i * beat, text: lines[i % 4]!, accent: i % 4 === 0 });
    return { caption: `${bpm} BPM, one click per beat: 1.5 seconds seen four ways`, hits };
  },
}));

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: SECONDS });
  return stage.run(hitSpec(stage, SECONDS, cases));
};

export default mount;
