// Tone.Part loopStart and loopEnd: repeat just a window inside a longer part
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { toneStage } from '../../shared/stage.ts';
import { blip } from '../../shared/time-kit.ts';
import { follow, lane } from '../../shared/transport-kit.ts';
import { bigLabel } from '../../shared/widgets.ts';

const NOTES = ['C4', 'E4', 'G4', 'E4', 'D4', 'F4', 'A4', 'F4'];
// Eight quarter notes over two bars.
const EVENTS: [string, { note: string; i: number }][] = NOTES.map((note, i) => [`${Math.floor(i / 4)}:${i % 4}`, { note, i }]);
const CASES = [
  { label: 'whole part', start: '0', end: '2m', from: 0, to: 8 },
  { label: 'bar 1 only', start: '0', end: '1m', from: 0, to: 4 },
  { label: 'bar 2 only', start: '1m', end: '2m', from: 4, to: 8 },
];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 6 });
  const caption = bigLabel(stage.visual, '');
  const view = lane(stage.visual, 1, 8);
  view.layout(8, 4);
  let cur = CASES[0]!;

  return stage.run({
    build: () => {
      const synth = blip();
      const part = new Tone.Part((time, ev) => {
        synth.triggerAttackRelease(ev.note, '8n', time);
        stage.show(time, () => view.ping(ev.i, 0));
      }, EVENTS);
      // Beats are quarter notes: the part loops while the Transport keeps going.
      follow(stage, Tone.getTransport(), (beat) => view.head(beat), '8n');
      return { synth, part };
    },
    play: ({ part }, time) => {
      const c = cur;
      part.set({ loop: true, loopStart: c.start, loopEnd: c.end });
      part.start(0);
      stage.show(time, () => {
        view.region(c.from, c.to);
        caption.textContent = `loopStart '${c.start}', loopEnd '${c.end}'`;
      });
      Tone.getTransport().start(time);
      return (end) => Tone.getTransport().stop(end);
    },
    variants: CASES.map((c) => ({ label: c.label, apply: () => void (cur = c) })),
    dispose: ({ synth, part }) => {
      part.dispose();
      synth.dispose();
    },
  });
};

export default mount;
