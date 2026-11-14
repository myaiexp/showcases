// A bright buzzy note through a DubDelay: the lower the cutoff, the darker the echoes
import Pizzicato, { type DubDelay } from 'pizzicato';
import type { Mount } from '@/types.ts';
import { blips, tweak, wave } from '../../shared/fx.ts';
import { echoBars, timeline } from '../../shared/fx-pictures.ts';
import { flow } from '../../shared/flow.ts';
import { pzStage } from '../../shared/stage.ts';

const SECONDS = 3.4;
const NOTE_AT = 0.2;

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: SECONDS });
  const picture = flow(stage.visual, 'buzz', ['DubDelay'], 'ears');
  const bars = timeline(stage.visual, SECONDS, ctx.preview ? 30 : 60);
  const redraw = (d: DubDelay): void => {
    const plan = { kind: 'dub', start: NOTE_AT, time: d.time, feedback: d.feedback, mix: d.mix, cutoff: d.cutoff } as const;
    bars.set(echoBars(plan, SECONDS));
    picture.caption(`cutoff ${Math.round(d.cutoff)} Hz: ${d.cutoff > 2500 ? 'bright' : d.cutoff > 900 ? 'dull' : 'mush'}`);
  };

  return stage.run({
    build: () => {
      const buzz = wave('sawtooth', 330);
      const dub = new Pizzicato.Effects.DubDelay({ feedback: 0.7, time: 0.45, mix: 0.6, cutoff: 700 });
      buzz.addEffect(dub);
      return { buzz, dub };
    },
    play: ({ buzz, dub }, at) => {
      stage.show(() => redraw(dub));
      blips(buzz, at, [NOTE_AT], 0.15);
    },
    variants: [
      { label: 'cutoff 4000', apply: ({ dub }) => (dub.cutoff = 4000) },
      { label: 'cutoff 1200', apply: ({ dub }) => (dub.cutoff = 1200) },
      { label: 'cutoff 300', apply: ({ dub }) => (dub.cutoff = 300) },
    ],
    frame: (t) => bars.head(t),
    controls: ({ dub }, bar) => {
      redraw(dub);
      tweak(bar, dub, [['cutoff', 100, 4000, 50, ' Hz'], ['feedback', 0, 0.95, 0.05], ['time', 0.1, 1, 0.05, ' s'], ['mix', 0, 1, 0.05]], () => redraw(dub));
    },
  });
};

export default mount;
