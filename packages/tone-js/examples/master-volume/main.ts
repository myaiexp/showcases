// One volume knob: the Destination volume and mute act on every sound at once
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { button, checkbox, slider } from '../../shared/controls.ts';
import { toneStage } from '../../shared/stage.ts';
import { pads } from '../../shared/widgets.ts';

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2 });
  const lights = pads(stage.visual, ['bass', 'keys', 'bell']);

  return stage.run({
    // Three separate instruments, all ending at the same Destination.
    build: () => ({
      bass: new Tone.MonoSynth({ oscillator: { type: 'square' } }).toDestination(),
      keys: new Tone.PolySynth(Tone.Synth).toDestination(),
      bell: new Tone.FMSynth({ harmonicity: 3.01, modulationIndex: 12 }).toDestination(),
      level: 0,
    }),

    play: (g, time) => {
      // The card renders each level; in the full view the volume slider sets it.
      if (stage.preview) Tone.getDestination().volume.value = g.level;
      [0, 0.5, 1, 1.5].forEach((at, i) => {
        g.bass.triggerAttackRelease(i % 2 ? 'G2' : 'C2', '8n', time + at);
        stage.show(time + at, () => lights.hit(0));
      });
      g.keys.triggerAttackRelease(['E4', 'G4', 'C5'], '4n', time + 0.25);
      g.bell.triggerAttackRelease('C6', '8n', time + 1.25);
      stage.show(time + 0.25, () => lights.hit(1));
      stage.show(time + 1.25, () => lights.hit(2));
    },

    variants: [0, -12, -24].map((level) => ({
      label: `volume ${level} dB`,
      apply: (g: { level: number }) => (g.level = level),
    })),

    controls: (_, bar) => {
      const dest = Tone.getDestination();
      const vol = slider(bar, 'volume', -40, 0, 1, 0, (db) => (dest.volume.value = db), (db) => `${db} dB`);
      checkbox(bar, 'mute', false, (on) => (dest.mute = on));
      // Fade everything to silence over 2 seconds, then back up.
      button(bar, 'fade out', () => dest.volume.rampTo(-Infinity, 2));
      button(bar, 'fade in', () => dest.volume.rampTo(Number(vol.value), 1));
    },
  });
};

export default mount;
