// Playable synth: a Tone.Synth on a keyboard, with a switchable waveform
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { toneStage } from '../../shared/stage.ts';
import { keyboard } from '../../shared/widgets.ts';

const WAVES = ['sine', 'triangle', 'square', 'sawtooth'] as const;
const RIFF = ['C4', 'G4', 'E4', 'A4', 'G4', 'E4', 'D4', 'C4'];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2 });
  const keys = keyboard(stage.visual, 'C4', 'C5');

  return stage.run({
    build: () => new Tone.Synth({ oscillator: { type: 'triangle' } }).toDestination(),

    play: (synth, time) => {
      RIFF.forEach((note, i) => {
        const at = time + i * 0.25;
        synth.triggerAttackRelease(note, '16n', at);
        stage.show(at, () => keys.press(note, 0.2));
      });
    },

    // The card plays the riff once in each waveform.
    variants: WAVES.map((type) => ({ label: type, apply: (synth: Tone.Synth) => (synth.oscillator.type = type) })),

    controls: (synth, bar) => {
      keys.onPress(async (note) => {
        await Tone.start();
        synth.triggerAttackRelease(note, '8n');
      });
      select(bar, 'waveform', WAVES, (type) => (synth.oscillator.type = type), 'triangle');
    },
  });
};

export default mount;
