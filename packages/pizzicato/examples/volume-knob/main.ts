// The volume property: set it on a playing sound to turn it down and up
import Pizzicato from 'pizzicato';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { gauge, meter } from '../../shared/fx-pictures.ts';
import { pzStage } from '../../shared/stage.ts';
import { bigText, smallText } from '../../shared/widgets.ts';

/** Seconds into the pass and the volume to turn to then. */
const STEPS: readonly (readonly [number, number])[] = [
  [0.9, 0.3],
  [1.8, 0.12],
  [2.7, 0.02],
  [3.6, 0.5],
];

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: 4.8 });
  const title = bigText(stage.visual, 20);
  const knob = gauge(stage.visual, 'volume');
  const level = meter(stage.visual, () => stage.samples(), 'loudness');
  const note = smallText(stage.visual);
  let slide: HTMLInputElement | undefined;
  const show = (v: number): void => {
    title.textContent = `volume = ${v}`;
    knob.set(v / 0.5, '');
    note.textContent = v === 0.5 ? 'full for this demo' : v < 0.1 ? 'almost silent' : 'quieter';
    if (slide) slide.value = String(v);
  };
  show(0.5);

  return stage.run({
    build: () =>
      new Pizzicato.Sound({ source: 'wave', options: { type: 'triangle', frequency: 262, volume: 0.5, attack: 0.02 } }),
    play: (sound, at) => {
      sound.volume = 0.5;
      sound.play();
      stage.show(() => show(0.5));
      for (const [time, v] of STEPS) {
        at(time, () => {
          sound.volume = v; // a number from 0 to 1, takes effect at once
          stage.show(() => show(v));
        });
      }
      at(4.4, () => sound.stop());
    },
    controls: (sound, bar) => {
      slide = slider(bar, 'volume', 0, 0.5, 0.01, 0.5, (v) => {
        sound.volume = v;
        show(v);
      });
    },
    frame: level,
  });
};

export default mount;
