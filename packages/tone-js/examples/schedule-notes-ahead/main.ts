// Schedule notes ahead: three notes booked at now, now + 0.5 and now + 1 seconds
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { toneStage } from '../../shared/stage.ts';
import { pads } from '../../shared/widgets.ts';

const BOOKED = [
  { note: 'C4', at: 0 },
  { note: 'E4', at: 0.5 },
  { note: 'G4', at: 1 },
];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2 });
  const slots = pads(
    stage.visual,
    BOOKED.map(({ note, at }) => `${note}\nnow + ${at}s`),
  );
  slots.pads.forEach((p) => (p.style.whiteSpace = 'pre'));

  return stage.run({
    build: () => new Tone.Synth().toDestination(),

    // All three calls run immediately; the time argument decides when each is heard.
    play: (synth, now) => {
      BOOKED.forEach(({ note, at }, i) => {
        synth.triggerAttackRelease(note, '8n', now + at);
        stage.show(now + at, () => slots.hit(i, 0.4));
      });
    },
  });
};

export default mount;
