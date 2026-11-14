// A low riff through Distortion and LowPassFilter, added in one order or the other
import Pizzicato from 'pizzicato';
import type { Mount } from '@/types.ts';
import { phrase, wave } from '../../shared/fx.ts';
import { select } from '../../shared/controls.ts';
import { flow } from '../../shared/flow.ts';
import { pzStage } from '../../shared/stage.ts';

type Order = 'Distortion → LowPass' | 'LowPass → Distortion';
const FUZZ_FIRST: Order = 'Distortion → LowPass';
const FILTER_FIRST: Order = 'LowPass → Distortion';
const RIFF = [45, 45, 48, 50, 48, 45];

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: 2.4 });
  const picture = flow(stage.visual, 'saw', ['Distortion', 'LowPass'], 'out');
  const show = (order: Order): void => {
    const first = order.startsWith('Distortion');
    picture.rename(0, first ? 'Distortion' : 'LowPass');
    picture.rename(1, first ? 'LowPass' : 'Distortion');
    picture.caption(first ? 'fuzz, then smoothed' : 'muffled, then fuzzed');
  };

  return stage.run({
    build: () => {
      const riff = wave('sawtooth', 110, 0.4);
      const distortion = new Pizzicato.Effects.Distortion({ gain: 0.9 });
      const lowPass = new Pizzicato.Effects.LowPassFilter({ frequency: 700, peak: 1 });
      riff.addEffect(distortion);
      riff.addEffect(lowPass);
      return { riff, distortion, lowPass, order: FUZZ_FIRST as Order };
    },
    play: (g, at) => {
      stage.show(() => show(g.order));
      phrase(g.riff, at, RIFF, 0.1, 0.38);
    },
    variants: [
      { label: 'distortion first', apply: () => undefined },
      {
        label: 'low-pass first',
        apply: (g) => {
          // Taking the distortion out and adding it again puts it last.
          g.riff.removeEffect(g.distortion);
          g.riff.addEffect(g.distortion);
          g.order = FILTER_FIRST;
        },
      },
    ],
    controls: (g, bar) => {
      show(g.order);
      select(bar, 'order', [FUZZ_FIRST, FILTER_FIRST], (order) => {
        const [first, second] = order.startsWith('Distortion') ? [g.distortion, g.lowPass] : [g.lowPass, g.distortion];
        g.riff.removeEffect(first);
        g.riff.removeEffect(second);
        g.riff.addEffect(first);
        g.riff.addEffect(second);
        g.order = order;
        show(order);
      });
    },
  });
};

export default mount;
