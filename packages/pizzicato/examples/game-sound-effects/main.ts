// Coin, jump, laser and explosion sounds built from waves and noise
import Pizzicato, { type Sound } from 'pizzicato';
import type { Mount } from '@/types.ts';
import type { At } from '../../shared/stage.ts';
import { pzStage } from '../../shared/stage.ts';
import { pads, smallText } from '../../shared/widgets.ts';

const NAMES = ['coin', 'jump', 'laser', 'boom'] as const;
type Name = (typeof NAMES)[number];
type Sfx = Record<Name, Sound>;

/** Changes a playing wave's frequency from `from` to `to` in small steps over `seconds`. */
function sweep(sound: Sound, at: At, start: number, from: number, to: number, seconds: number): void {
  const steps = Math.round(seconds / 0.01);
  for (let i = 0; i <= steps; i++) at(start + i * 0.01, () => (sound.frequency = from * (to / from) ** (i / steps)));
}

/** Plays one effect starting `start` seconds from now. */
function fire(sfx: Sfx, name: Name, at: At, start: number): void {
  const s = sfx[name];
  at(start, () => {
    s.stop();
    s.play();
  });
  if (name === 'coin') {
    // Two quick notes, B5 then E6: the classic pickup.
    at(start, () => (s.frequency = 988));
    at(start + 0.08, () => (s.frequency = 1319));
    at(start + 0.3, () => s.stop());
  } else if (name === 'jump') {
    sweep(s, at, start, 250, 750, 0.18);
    at(start + 0.2, () => s.stop());
  } else if (name === 'laser') {
    sweep(s, at, start, 1600, 180, 0.25);
    at(start + 0.25, () => s.stop());
  } else {
    // Noise with a long release: the boom dies away after stop().
    at(start + 0.15, () => s.stop());
  }
}

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: 3.2 });
  const board = pads(stage.visual, NAMES, 4);
  if (!stage.preview) smallText(stage.visual, 'press Play for the sequence, or a pad for one sound');
  const flash = (name: Name, at: At, start: number): void => at(start, () => stage.show(() => board.hit(name)));

  return stage.run({
    build: (): Sfx => {
      const wave = (type: 'square' | 'sawtooth', volume: number, release: number): Sound =>
        new Pizzicato.Sound({ source: 'wave', options: { type, volume, attack: 0, release } });
      const boom = new Pizzicato.Sound({
        source: 'script',
        options: {
          audioFunction: (e) => {
            const out = e.outputBuffer.getChannelData(0);
            for (let i = 0; i < out.length; i++) out[i] = Math.random() * 2 - 1;
          },
          volume: 0.9,
          attack: 0,
          release: 0.9,
        },
      });
      // A low-pass leaves only the rumble of the noise.
      boom.addEffect(new Pizzicato.Effects.LowPassFilter({ frequency: 300, peak: 2 }));
      return { coin: wave('square', 0.25, 0.25), jump: wave('square', 0.25, 0.05), laser: wave('sawtooth', 0.3, 0.05), boom };
    },
    play: (sfx, at) =>
      NAMES.forEach((name, i) => {
        fire(sfx, name, at, i * 0.75);
        flash(name, at, i * 0.75);
      }),
    controls: (sfx) => {
      board.onPress((name) => {
        // A pad works without Play: the click is what lets the page make sound.
        void Pizzicato.context.resume();
        const later: At = (s, fn) => {
          const id = window.setTimeout(fn, s * 1000);
          stage.signal.addEventListener('abort', () => clearTimeout(id), { once: true });
        };
        board.hit(name);
        fire(sfx, name as Name, later, 0);
      });
    },
  });
};

export default mount;
