// PolySynth: notes pressed one at a time pile into a chord, then release
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { toneStage } from '../../shared/stage.ts';
import { bigLabel, keyboard } from '../../shared/widgets.ts';

const NOTES = ['D4', 'F4', 'A4', 'C5', 'E5'];
const HOLD = 3.2;
const STAGGER: [number, string][] = [
  [0.5, 'one every 0.5s'],
  [0.2, 'one every 0.2s'],
  [0, 'all at once'],
];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 4.2 });
  const keys = keyboard(stage.visual, 'C4', 'E5');
  const label = bigLabel(stage.visual, 'triggerAttack x5, then triggerRelease(array)');
  let gap = 0.5;

  return stage.run({
    build: () => new Tone.PolySynth(Tone.Synth, { envelope: { attack: 0.05, release: 0.6 }, volume: -8 }).toDestination(),

    // Like the README: five triggerAttack calls, then one triggerRelease with the whole array.
    play: (synth, time) => {
      NOTES.forEach((note, i) => {
        const at = time + i * gap;
        synth.triggerAttack(note, at);
        stage.show(at, () => keys.press(note, HOLD - i * gap));
      });
      synth.triggerRelease(NOTES, time + HOLD);
      stage.show(time + HOLD, () => (label.textContent = 'released together'));
      stage.show(time, () => (label.textContent = 'notes pile up...'));
    },
    stop: (synth, time) => void synth.releaseAll(time),

    variants: STAGGER.map(([g, name]) => ({ label: name, apply: () => (gap = g) })),

    controls: (_, bar) => {
      slider(bar, 'gap between notes', 0, 0.8, 0.05, 0.5, (v) => (gap = v), (v) => `${v}s`);
    },
  });
};

export default mount;
