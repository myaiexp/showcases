// Event playbackRate: the same Part played at half, normal and double speed
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { playable } from '../../shared/instrument-phrase.ts';
import { toneStage } from '../../shared/stage.ts';
import { blip } from '../../shared/time-kit.ts';
import { bigLabel, keyboard } from '../../shared/widgets.ts';

const PAIRS: [string, string][] = [
  ['0:0', 'C4'],
  ['0:1', 'E4'],
  ['0:2', 'G4'],
  ['0:3', 'E4'],
];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 4 });
  const caption = bigLabel(stage.visual, '');
  const keys = keyboard(stage.visual, 'C4', 'C5');
  let rate = 1;

  return stage.run({
    build: () => {
      const synth = blip();
      const part = new Tone.Part((time, note) => {
        synth.triggerAttackRelease(note, '16n', time);
        stage.show(time, () => keys.press(note, 0.25));
      }, PAIRS);
      part.set({ loop: true, loopEnd: '1m' });
      part.start(0);
      return { synth, part };
    },
    play: ({ part }, time) => {
      part.playbackRate = rate;
      const label = `playbackRate ${rate}`;
      stage.show(time, () => (caption.textContent = label));
      Tone.getTransport().start(time);
      return (end) => Tone.getTransport().stop(end);
    },
    variants: [0.5, 1, 2].map((r) => ({ label: `playbackRate ${r}`, apply: () => void (rate = r) })),
    controls: ({ part, synth }, bar) => {
      playable(keys, synth);
      slider(bar, 'playbackRate', 0.25, 4, 0.05, 1, (v) => ((rate = v), (part.playbackRate = v)), (v) => `${v.toFixed(2)}x`);
    },
    dispose: ({ synth, part }) => {
      part.dispose();
      synth.dispose();
    },
  });
};

export default mount;
