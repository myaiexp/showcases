// Tone.Sequence events: replace the whole note list while the sequence keeps running
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { button, select } from '../../shared/controls.ts';
import { playable } from '../../shared/instrument-phrase.ts';
import { toneStage } from '../../shared/stage.ts';
import { blip } from '../../shared/time-kit.ts';
import { bigLabel, keyboard } from '../../shared/widgets.ts';

const TUNES: Record<string, string[]> = {
  rising: ['C4', 'D4', 'E4', 'G4', 'A4', 'C5', 'A4', 'G4'],
  'down and up': ['C5', 'A4', 'G4', 'E4', 'D4', 'E4', 'G4', 'A4'],
  'jumpy': ['C4', 'G4', 'C4', 'A4', 'D4', 'A4', 'E4', 'C5'],
};
const NAMES = Object.keys(TUNES);

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 4 });
  const caption = bigLabel(stage.visual, '');
  const keys = keyboard(stage.visual, 'C4', 'C5');
  let tune = NAMES[0]!;

  return stage.run({
    build: () => {
      const synth = blip();
      const seq = new Tone.Sequence(
        (time, note) => {
          synth.triggerAttackRelease(note, '16n', time);
          stage.show(time, () => keys.press(note, 0.25));
        },
        TUNES[tune]!,
        '8n',
      ).start(0);
      return { synth, seq };
    },
    play: ({ seq }, time) => {
      const name = tune;
      seq.events = TUNES[name]!;
      stage.show(time, () => (caption.textContent = `seq.events = [${TUNES[name]!.join(', ')}]`));
      Tone.getTransport().start(time);
      return (end) => Tone.getTransport().stop(end);
    },
    variants: NAMES.map((n) => ({ label: n, apply: () => void (tune = n) })),
    controls: ({ seq, synth }, bar) => {
      playable(keys, synth);
      select(bar, 'swap in', NAMES, (n) => {
        tune = n;
        seq.events = TUNES[n]!;
        caption.textContent = `seq.events = [${TUNES[n]!.join(', ')}]`;
      });
      button(bar, 'reverse the list', () => {
        seq.events = [...seq.events].reverse();
        caption.textContent = `seq.events = [${seq.events.join(', ')}]`;
      });
    },
    dispose: ({ synth, seq }) => {
      seq.dispose();
      synth.dispose();
    },
  });
};

export default mount;
