// Transport timeSignature: the same "1m" Loop lands every 4, 3 or 3.5 quarter notes
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { toneStage } from '../../shared/stage.ts';
import { drums, follow, hatAt, kickAt, lane, pingAt } from '../../shared/transport-kit.ts';
import { bigLabel } from '../../shared/widgets.ts';

type Sig = { label: string; value: number | [number, number]; beats: number; tick: '4n' | '8n' };
const SIGS: Sig[] = [
  { label: '4/4', value: 4, beats: 4, tick: '4n' },
  { label: '3/4', value: 3, beats: 3, tick: '4n' },
  { label: '7/8', value: [7, 8], beats: 3.5, tick: '8n' },
];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 4 });
  const caption = bigLabel(stage.visual, '');
  const view = lane(stage.visual, 1, 4);
  let cur = SIGS[0]!;
  const loops: Tone.Loop[] = [];

  return stage.run({
    build: () => drums(),
    play: (d, time) => {
      const t = Tone.getTransport();
      const s = cur;
      t.timeSignature = s.value;
      const ppq = t.PPQ;
      // Both Loops are made after the signature is set, so '1m' means one bar of it.
      const accent = new Tone.Loop((at) => {
        kickAt(d, at);
        pingAt(d, 'C6', at);
      }, '1m').start(0);
      const tick = new Tone.Loop((at) => {
        hatAt(d, at);
        const beat = t.getTicksAtTime(at) / ppq;
        stage.show(at, () => view.ping(beat % s.beats, 0, '#ff8fb1'));
      }, s.tick).start(0);
      loops.push(accent, tick);
      follow(stage, t, (beat) => view.head(beat % s.beats));
      stage.show(time, () => {
        view.layout(s.beats, s.beats);
        caption.textContent = `${s.label}: timeSignature = ${Array.isArray(s.value) ? `[${s.value}]` : s.value}`;
      });
      t.start(time);
      return (end) => t.stop(end);
    },
    stop: () => {
      for (const l of loops.splice(0)) l.dispose();
    },
    variants: SIGS.map((s) => ({ label: s.label, apply: () => void (cur = s) })),
  });
};

export default mount;
