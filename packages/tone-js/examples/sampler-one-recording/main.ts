// Sampler: one recording of a single note becomes a playable instrument
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { playable, playNotes } from '../../shared/instrument-phrase.ts';
import { sample } from '../../shared/samples.ts';
import { toneStage } from '../../shared/stage.ts';
import { bigLabel, keyboard } from '../../shared/widgets.ts';

const MELODY = ['C3', 'E3', 'G3', 'C4', 'G3', 'E3'];
const CHORD = ['C3', 'E3', 'G3', 'C4'];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 4 });
  const keys = keyboard(stage.visual, 'C3', 'C5');
  const label = bigLabel(stage.visual, 'one recording, mapped to C3');

  return stage.run({
    // The stand-in "recording" is a struck gong at C3; the sampler re-pitches it for every other key.
    build: async () => new Tone.Sampler({ urls: { C3: await sample('gong') }, release: 0.5, volume: -4 }).toDestination(),

    play: (sampler, time) => {
      playNotes(stage, keys, sampler, MELODY, time, { step: 0.3, hold: 0.25 });
      sampler.triggerAttackRelease(CHORD, 1.4, time + 2.2);
      stage.show(time, () => (label.textContent = 'a melody from one gong'));
      stage.show(time + 2.2, () => {
        label.textContent = 'and a chord';
        CHORD.forEach((n) => keys.press(n, 1.4));
      });
    },
    stop: (sampler, time) => void sampler.releaseAll(time),

    controls: (sampler) => playable(keys, sampler, 1),
  });
};

export default mount;
