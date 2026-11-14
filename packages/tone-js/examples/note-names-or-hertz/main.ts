// Note names or hertz: each note is played by name, then by its frequency in hertz
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { toneStage } from '../../shared/stage.ts';
import { bigLabel } from '../../shared/widgets.ts';

const NAMES = ['A4', 'D#2', 'C5', 'G3'];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 4 });
  const label = bigLabel(stage.visual);

  return stage.run({
    build: () => new Tone.Synth().toDestination(),

    play: (synth, time) => {
      NAMES.forEach((name, i) => {
        const at = time + i;
        // Tone.Frequency converts the name to hertz: "A4" is 440.
        const hz = Math.round(Tone.Frequency(name).toFrequency() * 10) / 10;
        synth.triggerAttackRelease(name, 0.3, at);
        synth.triggerAttackRelease(hz, 0.3, at + 0.5);
        stage.show(at, () => (label.textContent = `"${name}"`));
        stage.show(at + 0.5, () => (label.textContent = `"${name}" = ${hz} Hz`));
      });
    },
  });
};

export default mount;
