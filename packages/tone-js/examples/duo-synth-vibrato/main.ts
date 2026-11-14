// DuoSynth: vibratoAmount and vibratoRate wobble the pitch of a held note
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { toneStage } from '../../shared/stage.ts';
import { bigLabel } from '../../shared/widgets.ts';
import { wobble } from './wobble.ts';

const SECONDS = 3;
const AMOUNTS = [0, 0.4, 1];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: SECONDS });
  const curve = wobble(stage.visual);
  const label = bigLabel(stage.visual);

  return stage.run({
    build: () => new Tone.DuoSynth({ vibratoRate: 5, vibratoAmount: 0.4, volume: -6 }).toDestination(),

    play: (synth, time) => {
      // The LFO swings the pitch by plus or minus 50 cents, scaled by the amount.
      const cents = synth.vibratoAmount.value * 50;
      const rate = Number(synth.vibratoRate.value);
      stage.show(time, () => {
        curve.set(cents, rate);
        label.textContent = `vibrato +/- ${Math.round(cents)} cents at ${rate} Hz`;
      });
      synth.triggerAttackRelease('A3', SECONDS - 0.5, time);
    },

    frame: (time) => curve.draw(time, SECONDS),

    variants: AMOUNTS.map((a) => ({
      label: a === 0 ? 'no vibrato' : `vibratoAmount ${a}`,
      apply: (synth: Tone.DuoSynth) => (synth.vibratoAmount.value = a),
    })),

    controls: (synth, bar) => {
      slider(bar, 'vibratoAmount', 0, 1, 0.05, 0.4, (v) => (synth.vibratoAmount.value = v));
      slider(bar, 'vibratoRate', 0.5, 12, 0.5, 5, (v) => (synth.vibratoRate.value = v), (v) => `${v} Hz`);
    },
  });
};

export default mount;
