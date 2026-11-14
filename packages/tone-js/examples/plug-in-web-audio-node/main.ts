// Plain Web Audio node: Synth → native BiquadFilterNode → Tone's Destination
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { toneStage } from '../../shared/stage.ts';
import { bigLabel } from '../../shared/widgets.ts';

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 3 });
  bigLabel(stage.visual, 'Tone.Synth\n→ native BiquadFilterNode\n→ Destination').style.fontSize = '14px';
  const cutoff = bigLabel(stage.visual);

  return stage.run({
    build: () => {
      const synth = new Tone.PolySynth(Tone.Synth, { oscillator: { type: 'sawtooth' } });
      synth.volume.value = -12;
      // rawContext is the browser's own AudioContext under Tone's Context.
      const filter = Tone.getContext().rawContext.createBiquadFilter();
      filter.type = 'lowpass';
      filter.Q.value = 8;
      // Tone.connect joins Tone.js nodes and native nodes in either direction.
      Tone.connect(synth, filter);
      Tone.connect(filter, Tone.getDestination());
      return { synth, filter };
    },

    // The native filter's own AudioParam sweeps from 200 Hz to 6 kHz and back.
    play: ({ synth, filter }, time) => {
      filter.frequency.setValueAtTime(200, time);
      filter.frequency.exponentialRampToValueAtTime(6000, time + 1.4);
      filter.frequency.exponentialRampToValueAtTime(200, time + 2.8);
      synth.triggerAttackRelease(['C3', 'G3', 'C4', 'E4'], 2.8, time);
    },

    frame: (t) => {
      const hz = t < 1.4 ? 200 * Math.pow(30, t / 1.4) : 6000 * Math.pow(1 / 30, Math.min(1, (t - 1.4) / 1.4));
      cutoff.textContent = `cutoff ${Math.round(hz)} Hz`;
    },

    dispose: ({ synth, filter }) => {
      synth.dispose();
      filter.disconnect();
    },
  });
};

export default mount;
