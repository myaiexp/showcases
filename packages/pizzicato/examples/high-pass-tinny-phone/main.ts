// A looping melody through a HighPassFilter at three cutoffs
import Pizzicato, { type Filter } from 'pizzicato';
import type { Mount } from '@/types.ts';
import { tweak } from '../../shared/fx.ts';
import { gauge } from '../../shared/fx-pictures.ts';
import { flow } from '../../shared/flow.ts';
import { fileSound } from '../../shared/load.ts';
import { pzStage } from '../../shared/stage.ts';

/** The gauge is logarithmic: 10 Hz to 4 kHz. */
const place = (f: number): number => Math.log(f / 10) / Math.log(400);

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: 2 });
  const picture = flow(stage.visual, 'music', ['HighPass'], 'ears');
  const cutoff = gauge(stage.visual, 'cutoff', '#ffb86b');
  const show = (f: Filter): void => {
    cutoff.set(place(f.frequency), `${Math.round(f.frequency)} Hz`);
    picture.caption(f.frequency < 100 ? 'full sound' : f.frequency < 1000 ? 'phone speaker' : 'tin can');
  };

  return stage.run({
    build: async () => {
      const music = await fileSound('melody', { loop: true });
      const phone = new Pizzicato.Effects.HighPassFilter({ frequency: 20, peak: 1 });
      music.addEffect(phone);
      return { music, phone };
    },
    play: ({ music, phone }, at) => {
      stage.show(() => show(phone));
      music.play();
      at(1.95, () => music.stop());
    },
    variants: [
      { label: 'frequency 20', apply: () => undefined },
      { label: 'frequency 700', apply: ({ phone }) => (phone.frequency = 700) },
      { label: 'frequency 2000', apply: ({ phone }) => (phone.frequency = 2000) },
    ],
    controls: ({ phone }, bar) => {
      show(phone);
      tweak(bar, phone, [['frequency', 10, 4000, 10, ' Hz'], ['peak', 0.5, 20, 0.5]], () => show(phone));
    },
  });
};

export default mount;
