// A looping drum beat through a LowPassFilter whose cutoff drops when the door shuts
import Pizzicato from 'pizzicato';
import type { Mount } from '@/types.ts';
import { gauge } from '../../shared/fx-pictures.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { flow } from '../../shared/flow.ts';
import { fileSound } from '../../shared/load.ts';
import { pzStage } from '../../shared/stage.ts';

const OPEN = 12000;
const SHUT = 300;
/** Frequencies are heard in octaves, so the gauge is logarithmic: 100 Hz to 20 kHz. */
const place = (f: number): number => Math.log(f / 100) / Math.log(200);

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: 4 });
  const picture = flow(stage.visual, 'party', ['LowPass'], 'you');
  const cutoff = gauge(stage.visual, 'cutoff', '#ffb86b');
  let auto = true;
  const show = (f: number, text: string): void => {
    cutoff.set(place(f), `${Math.round(f)} Hz`);
    picture.caption(text);
  };

  return stage.run({
    build: async () => {
      const beat = await fileSound('drums', { loop: true });
      const wall = new Pizzicato.Effects.LowPassFilter({ frequency: OPEN, peak: 1 });
      beat.addEffect(wall);
      return { beat, wall };
    },
    play: ({ beat, wall }, at) => {
      beat.play();
      const door = (when: number, frequency: number, text: string): void =>
        at(when, () => {
          if (!auto) return;
          wall.frequency = frequency;
          stage.show(() => show(frequency, text));
        });
      door(0, OPEN, 'door open: all of it');
      door(1.3, SHUT, 'door shut: just the thump');
      door(2.7, OPEN, 'door open: all of it');
    },
    controls: ({ wall }, bar) => {
      show(OPEN, 'door open: all of it');
      const box = checkbox(bar, 'door opens and shuts by itself', true, (v) => (auto = v));
      slider(bar, 'frequency', 100, 12000, 50, OPEN, (v) => {
        auto = false;
        box.checked = false;
        wall.frequency = v;
        show(v, 'moved by hand');
      }, (v) => `${v} Hz`);
      slider(bar, 'peak', 0.5, 20, 0.5, 1, (v) => (wall.peak = v));
    },
  });
};

export default mount;
