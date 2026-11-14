// Tone.Part from [time, note] pairs: a melody written as a list of positions
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { toneStage } from '../../shared/stage.ts';
import { playable } from '../../shared/instrument-phrase.ts';
import { blip } from '../../shared/time-kit.ts';
import { bigLabel, keyboard } from '../../shared/widgets.ts';

// Each pair: [position in bars:beats:sixteenths, value handed to the callback].
const PAIRS: [string, string][] = [
  ['0:0', 'C4'],
  ['0:1', 'E4'],
  ['0:1:2', 'G4'],
  ['0:3', 'E4'],
  ['1:0', 'D4'],
  ['1:1', 'F4'],
  ['1:2', 'A4'],
  ['1:2:2', 'C5'],
  ['1:3', 'A4'],
];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 4 });
  const caption = bigLabel(stage.visual, '');
  const keys = keyboard(stage.visual, 'C4', 'C5');

  return stage.run({
    build: () => {
      const synth = blip();
      const part = new Tone.Part((time, note) => {
        synth.triggerAttackRelease(note, '8n', time);
        const at = PAIRS.find(([, n]) => n === note)?.[0] ?? '';
        stage.show(time, () => {
          keys.press(note, 0.3);
          caption.textContent = `["${at}", "${note}"]`;
        });
      }, PAIRS);
      part.set({ loop: true, loopEnd: '2m' });
      part.start(0);
      return { synth, part };
    },
    play: (_, time) => {
      Tone.getTransport().start(time);
      return (end) => Tone.getTransport().stop(end);
    },
    controls: ({ synth }, bar) => {
      playable(keys, synth);
      const hint = document.createElement('span');
      hint.textContent = 'Tap the keys to play along.';
      hint.style.cssText = 'font-size:12px;color:var(--fg-3)';
      bar.append(hint);
    },
  });
};

export default mount;
