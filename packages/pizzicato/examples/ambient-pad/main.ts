// Ten detuned sawtooths in a Group, softened by a low-pass and a reverb on the whole group
import Pizzicato from 'pizzicato';
import type { Mount } from '@/types.ts';
import { meter } from '../../shared/fx-pictures.ts';
import { slider } from '../../shared/controls.ts';
import { flow } from '../../shared/flow.ts';
import { pzStage } from '../../shared/stage.ts';
import { hz, keys } from '../../shared/widgets.ts';

const CHORD = [45, 52, 57, 60, 64]; // A2 E3 A3 C4 E4: A minor, spread wide
const DETUNE = [-9, 9]; // cents: each note is two waves a little apart

/** `midi`'s frequency moved by `cents` hundredths of a semitone. */
const tuned = (midi: number, cents: number): number => hz(midi) * 2 ** (cents / 1200);

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: 5.6 });
  const picture = flow(stage.visual, 'saws', ['LowPass', 'Reverb'], 'out');
  const piano = keys(stage.visual, 45, 69);
  piano.el.style.height = ctx.preview ? '30px' : '56px';
  piano.el.style.minHeight = ctx.preview ? '30px' : '56px';
  const level = meter(stage.visual, () => stage.samples());
  const lit = (on: boolean): void => CHORD.forEach((m) => piano.set(m, on));

  return stage.run({
    build: () => {
      const voices = CHORD.flatMap((midi) =>
        DETUNE.map((cents) => ({
          midi,
          sound: new Pizzicato.Sound({
            source: 'wave',
            options: { type: 'sawtooth', frequency: tuned(midi, cents), volume: 0.1, attack: 1.5, release: 2 },
          }),
        })),
      );
      const group = new Pizzicato.Group(voices.map((v) => v.sound));
      const lowpass = new Pizzicato.Effects.LowPassFilter({ frequency: 700, peak: 1 });
      const reverb = new Pizzicato.Effects.Reverb({ time: 2.5, decay: 2.5, mix: 0.5 });
      group.addEffect(lowpass);
      group.addEffect(reverb);
      return { voices, group, lowpass, reverb };
    },
    play: ({ group }, at) => {
      group.play();
      stage.show(() => {
        lit(true);
        picture.caption('attack 1.5 s: fading in');
      });
      if (stage.preview) {
        at(3.2, () => {
          group.stop();
          stage.show(() => {
            lit(false);
            picture.caption('release 2 s: fading out');
          });
        });
      }
      return () => {
        group.stop();
        lit(false);
      };
    },
    variants: [
      {
        label: 'bare sawtooths',
        apply: ({ group, lowpass, reverb }) => {
          group.removeEffect(lowpass);
          group.removeEffect(reverb);
          stage.show(() => [0, 1].forEach((i) => picture.active(i, false)));
        },
      },
      {
        label: 'group + LowPass + Reverb',
        apply: () => stage.show(() => [0, 1].forEach((i) => picture.active(i, true))),
      },
    ],
    frame: () => level(),
    controls: ({ voices, lowpass, reverb }, bar) => {
      picture.caption('press Play: the chord swells in');
      const each = (fn: (v: (typeof voices)[number], i: number) => void): void => voices.forEach(fn);
      slider(bar, 'attack', 0, 3, 0.1, 1.5, (v) => each((x) => (x.sound.attack = v)), (v) => `${v.toFixed(1)} s`);
      slider(bar, 'release', 0, 4, 0.1, 2, (v) => each((x) => (x.sound.release = v)), (v) => `${v.toFixed(1)} s`);
      slider(bar, 'detune', 0, 40, 1, 9, (v) => each((x, i) => (x.sound.frequency = tuned(x.midi, i % 2 ? v : -v))), (v) => `±${v} cents`);
      slider(bar, 'cutoff', 200, 4000, 50, lowpass.frequency, (v) => (lowpass.frequency = v), (v) => `${v} Hz`);
      slider(bar, 'reverb mix', 0, 1, 0.05, reverb.mix, (v) => (reverb.mix = v), (v) => v.toFixed(2));
    },
  });
};

export default mount;
