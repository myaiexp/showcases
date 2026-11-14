// Transport position: jump around a four-bar phrase with start(time, offset) or position
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { toneStage } from '../../shared/stage.ts';
import { blip } from '../../shared/time-kit.ts';
import { follow, lane, phrasePart, posText } from '../../shared/transport-kit.ts';
import { bigLabel } from '../../shared/widgets.ts';

// The card's script: [seconds into the pass, bar:beat to jump to].
const JUMPS: [number, string][] = [
  [1, '2:0'],
  [2, '0:2'],
  [3, '3:0'],
];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 4 });
  const caption = bigLabel(stage.visual, '');
  const view = lane(stage.visual, 1, 16);
  view.layout(16, 4);

  return stage.run({
    build: () => {
      const synth = blip();
      const part = phrasePart(stage, synth, view).start(0);
      follow(stage, Tone.getTransport(), (beat) => {
        view.head(Math.min(beat, 15.99));
        caption.textContent = posText(beat);
      });
      return { synth, part };
    },
    play: (_, time) => {
      const t = Tone.getTransport();
      t.bpm.value = 240;
      t.start(time);
      if (stage.preview) {
        // Stop and start again at the same instant, with an offset: the phrase picks up from there.
        for (const [at, pos] of JUMPS) {
          t.stop(time + at);
          t.start(time + at, pos);
        }
      }
      return (end) => t.stop(end);
    },
    controls: (_, bar) => {
      // In the full view the Transport is live, so position can simply be assigned.
      ['0:0', '1:0', '2:0', '3:0'].forEach((pos, i) =>
        button(bar, `jump to bar ${i + 1}`, () => void (Tone.getTransport().position = pos)),
      );
    },
    dispose: ({ synth, part }) => {
      part.dispose();
      synth.dispose();
    },
  });
};

export default mount;
