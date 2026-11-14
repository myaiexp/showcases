// A held sawtooth note while a LowPassFilter's frequency is swept up and down
import Pizzicato from 'pizzicato';
import type { Mount } from '@/types.ts';
import { wave } from '../../shared/fx.ts';
import { gauge } from '../../shared/fx-pictures.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { flow } from '../../shared/flow.ts';
import { pzStage } from '../../shared/stage.ts';

const LOW = 200;
const HIGH = 3500;
const SECONDS = 3.6;
const place = (f: number): number => Math.log(f / 100) / Math.log(40);
/** Cutoff at `t` seconds: one smooth round trip per pass, in equal steps of pitch. */
const sweep = (t: number): number => LOW * (HIGH / LOW) ** (0.5 - 0.5 * Math.cos((2 * Math.PI * t) / SECONDS));

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: SECONDS });
  const picture = flow(stage.visual, 'saw', ['LowPass'], 'ears');
  const cutoff = gauge(stage.visual, 'cutoff', '#ffb86b');
  let auto = true;

  return stage.run({
    build: () => {
      const drone = wave('sawtooth', 110, 0.35, { attack: 0.05, release: 0.2 });
      const filter = new Pizzicato.Effects.LowPassFilter({ frequency: LOW, peak: 8 });
      drone.addEffect(filter);
      return { drone, filter };
    },
    play: ({ drone, filter }, at) => {
      drone.play();
      // The sweep: set `frequency` every 60 ms along the curve.
      for (let t = 0; t < SECONDS; t += 0.06) {
        at(t, () => {
          if (!auto) return;
          filter.frequency = sweep(t);
          const f = Math.round(filter.frequency);
          stage.show(() => {
            cutoff.set(place(f), `${f} Hz`);
            picture.caption(`cutoff ${f} Hz · peak ${filter.peak}`);
          });
        });
      }
      at(SECONDS - 0.1, () => drone.stop());
    },
    variants: [
      { label: 'peak 1: smooth', apply: ({ filter }) => (filter.peak = 1) },
      { label: 'peak 12: wah-wah', apply: ({ filter }) => (filter.peak = 12) },
    ],
    controls: ({ filter }, bar) => {
      cutoff.set(place(LOW), `${LOW} Hz`);
      const box = checkbox(bar, 'sweep by itself', true, (v) => (auto = v));
      slider(bar, 'frequency', 100, 4000, 50, LOW, (v) => {
        auto = false;
        box.checked = false;
        filter.frequency = v;
        cutoff.set(place(v), `${v} Hz`);
      }, (v) => `${v} Hz`);
      slider(bar, 'peak', 0.5, 25, 0.5, filter.peak, (v) => (filter.peak = v));
    },
  });
};

export default mount;
