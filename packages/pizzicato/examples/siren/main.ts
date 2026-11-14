// A siren: one wave sound, its frequency property set again every few milliseconds
import Pizzicato from 'pizzicato';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { gauge } from '../../shared/fx-pictures.ts';
import { pzStage } from '../../shared/stage.ts';
import { bigText, smallText } from '../../shared/widgets.ts';

type Style = 'wail' | 'yelp' | 'two-tone';
const STYLES: readonly Style[] = ['wail', 'yelp', 'two-tone'];
const NOTES: Record<Style, string> = {
  wail: 'slow: a fire engine',
  yelp: 'fast: a police car',
  'two-tone': 'two notes: an ambulance',
};
const LENGTH = 3.6;
const TICK = 0.03;

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: LENGTH });
  const title = bigText(stage.visual, 20);
  const bar = gauge(stage.visual, 'pitch');
  const note = smallText(stage.visual);
  const settings = { style: 'wail' as Style, low: 600, high: 1200 };

  /** The frequency `time` seconds into the siren. */
  const pitch = (style: Style, time: number, low: number, high: number): number => {
    if (style === 'two-tone') return Math.floor(time / 0.45) % 2 === 0 ? high : low;
    const cycle = style === 'wail' ? 1.8 : 0.6;
    const phase = (time % cycle) / cycle;
    const up = phase < 0.5 ? phase * 2 : 2 - phase * 2; // 0 to 1 and back to 0
    return low + (high - low) * up;
  };

  return stage.run({
    build: () => new Pizzicato.Sound({ source: 'wave', options: { type: 'sawtooth', frequency: 600, volume: 0.22, attack: 0.02, release: 0.05 } }),
    play: (siren, at) => {
      const { style, low, high } = settings;
      siren.play();
      for (let t = 0; t < LENGTH - 0.1; t += TICK) {
        const f = Math.round(pitch(style, t, low, high));
        at(t, () => {
          siren.frequency = f; // sets the pitch of the oscillator that play() just made
          stage.show(() => {
            title.textContent = `${f} Hz`;
            bar.set((f - 300) / 1200);
            note.textContent = NOTES[style];
          });
        });
      }
      at(LENGTH - 0.1, () => siren.stop());
    },
    variants: STYLES.map((style) => ({ label: style, apply: () => (settings.style = style) })),
    controls: (_siren, ui) => {
      select(ui, 'style', STYLES, (v) => (settings.style = v));
      slider(ui, 'low', 300, 900, 10, settings.low, (v) => (settings.low = v), (v) => `${v} Hz`);
      slider(ui, 'high', 700, 1500, 10, settings.high, (v) => (settings.high = v), (v) => `${v} Hz`);
    },
  });
};

export default mount;
