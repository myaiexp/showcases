// volume: each instrument has its own decibel level, so mixes balance per part
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { toneStage } from '../../shared/stage.ts';
import { bigLabel, keyboard } from '../../shared/widgets.ts';

const LEAD = ['E4', 'G4', 'A4', 'G4', 'E4', 'D4'];
const BASS = ['A2', 'A2', 'F2', 'F2', 'G2', 'G2'];
const LEVELS = [-30, -14, -6];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 3 });
  const keys = keyboard(stage.visual, 'F2', 'A4');
  const label = bigLabel(stage.visual);

  return stage.run({
    build: () => ({
      lead: new Tone.Synth({ oscillator: { type: 'triangle' }, volume: -8 }).toDestination(),
      bass: new Tone.Synth({ oscillator: { type: 'sawtooth' }, volume: -8 }).toDestination(),
    }),

    play: ({ lead, bass }, time) => {
      const text = `lead ${lead.volume.value} dB\nbass ${Math.round(bass.volume.value)} dB`;
      stage.show(time, () => (label.textContent = text));
      LEAD.forEach((note, i) => {
        const at = time + i * 0.5;
        lead.triggerAttackRelease(note, 0.4, at);
        bass.triggerAttackRelease(BASS[i]!, 0.45, at);
        stage.show(at, () => {
          keys.press(note, 0.4);
          keys.press(BASS[i]!, 0.4);
        });
      });
    },

    variants: LEVELS.map((db) => ({
      label: db < -20 ? 'bass almost silent' : `bass ${db} dB`,
      apply: ({ bass }: { bass: Tone.Synth }) => (bass.volume.value = db),
    })),

    controls: ({ lead, bass }, bar) => {
      slider(bar, 'lead volume', -40, 0, 1, -8, (v) => (lead.volume.value = v), (v) => `${v} dB`);
      slider(bar, 'bass volume', -40, 0, 1, -8, (v) => (bass.volume.value = v), (v) => `${v} dB`);
    },
  });
};

export default mount;
