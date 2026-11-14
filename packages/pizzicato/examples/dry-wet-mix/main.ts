// A snare through a Delay with mix at 0, 0.5 and 1
import Pizzicato, { type Delay } from 'pizzicato';
import type { Mount } from '@/types.ts';
import { tweak } from '../../shared/fx.ts';
import { dryWet, echoBars, gauge, timeline } from '../../shared/fx-pictures.ts';
import { fileSound } from '../../shared/load.ts';
import { pzStage } from '../../shared/stage.ts';

const SECONDS = 2.6;
const HIT_AT = 0.2;

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: SECONDS });
  stage.visual.style.gap = '4px';
  const bars = timeline(stage.visual, SECONDS, ctx.preview ? 36 : 60);
  const dry = gauge(stage.visual, 'dry');
  const wet = gauge(stage.visual, 'wet', '#ffb86b');
  const show = (d: Delay): void => {
    const levels = dryWet(d.mix);
    dry.set(levels.dry, levels.dry.toFixed(1));
    wet.set(levels.wet, levels.wet.toFixed(1));
    bars.set(echoBars({ kind: 'delay', start: HIT_AT, time: d.time, feedback: d.feedback, mix: d.mix }, SECONDS));
  };

  return stage.run({
    build: async () => {
      const snare = await fileSound('snare');
      const delay = new Pizzicato.Effects.Delay({ feedback: 0.5, time: 0.35, mix: 0.5 });
      snare.addEffect(delay);
      return { snare, delay };
    },
    play: ({ snare, delay }, at) => {
      stage.show(() => show(delay));
      at(HIT_AT, () => snare.play());
    },
    variants: [
      { label: 'mix 0: dry only', apply: ({ delay }) => (delay.mix = 0) },
      { label: 'mix 0.5', apply: () => undefined },
      { label: 'mix 1: wet only', apply: ({ delay }) => (delay.mix = 1) },
    ],
    frame: (t) => bars.head(t),
    controls: ({ delay }, bar) => {
      show(delay);
      tweak(bar, delay, [['mix', 0, 1, 0.05]], () => show(delay));
    },
  });
};

export default mount;
