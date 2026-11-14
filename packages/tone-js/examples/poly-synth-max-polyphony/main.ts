// PolySynth maxPolyphony: when every voice is busy, further notes are dropped
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { toneStage } from '../../shared/stage.ts';
import { flash, bigLabel, keyboard } from '../../shared/widgets.ts';

const NOTES = ['C4', 'E4', 'G4', 'B4', 'D5', 'F5'];
const STEP = 0.3;
const LIMITS = [2, 4, 32];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 4 });
  const keys = keyboard(stage.visual, 'C4', 'F5');
  const label = bigLabel(stage.visual);

  const lose = (note: string): void => {
    const key = keys.el.querySelector<HTMLElement>(`[data-note="${note}"]`);
    if (key) flash(key, 0.6, '#ff6b6b');
  };

  return stage.run({
    build: () => new Tone.PolySynth(Tone.Synth, { envelope: { attack: 0.02, release: 0.5 }, volume: -8 }).toDestination(),

    // Six notes are held at once; voices beyond maxPolyphony never sound (they flash red).
    play: (synth, time) => {
      const limit = synth.maxPolyphony;
      const dropped = Math.max(0, NOTES.length - limit);
      const text = `maxPolyphony ${limit}\n${NOTES.length - dropped} sounding, ${dropped} dropped`;
      NOTES.forEach((note, i) => {
        const at = time + i * STEP;
        synth.triggerAttack(note, at);
        stage.show(at, () => {
          if (i < limit) keys.press(note, 2);
          else lose(note);
          label.textContent = text;
        });
      });
      synth.releaseAll(time + 3);
    },
    stop: (synth, time) => void synth.releaseAll(time),

    variants: LIMITS.map((n) => ({
      label: n < 32 ? `maxPolyphony ${n}` : 'default (32)',
      apply: (synth: Tone.PolySynth) => (synth.maxPolyphony = n),
    })),

    controls: (synth, bar) => {
      slider(bar, 'maxPolyphony', 1, 8, 1, 32, (v) => (synth.maxPolyphony = v));
    },
  });
};

export default mount;
