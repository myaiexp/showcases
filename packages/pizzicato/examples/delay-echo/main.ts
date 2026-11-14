// A short shout through a Delay: feedback decides how many echoes come back
import Pizzicato, { type Delay } from 'pizzicato';
import type { Mount } from '@/types.ts';
import { blips, tweak, wave } from '../../shared/fx.ts';
import { echoBars, timeline } from '../../shared/fx-pictures.ts';
import { flow } from '../../shared/flow.ts';
import { pzStage } from '../../shared/stage.ts';

const SECONDS = 3.2;
const SHOUT_AT = 0.2;

const describe = (d: Delay): string =>
  `feedback ${d.feedback.toFixed(2)}: ${d.feedback < 0.35 ? 'weak echoes' : d.feedback < 0.75 ? 'a canyon' : 'never ends'}`;

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: SECONDS });
  const picture = flow(stage.visual, 'shout', ['Delay'], 'ears');
  const bars = timeline(stage.visual, SECONDS, ctx.preview ? 30 : 60);
  const redraw = (d: Delay): void => {
    bars.set(echoBars({ kind: 'delay', start: SHOUT_AT, time: d.time, feedback: d.feedback, mix: d.mix }, SECONDS));
    picture.caption(describe(d));
  };

  return stage.run({
    build: () => {
      const shout = wave('sawtooth', 330);
      const delay = new Pizzicato.Effects.Delay({ feedback: 0.5, time: 0.3, mix: 0.6 });
      shout.addEffect(delay);
      redraw(delay);
      return { shout, delay };
    },
    play: ({ shout, delay }, at) => {
      stage.show(() => redraw(delay));
      blips(shout, at, [SHOUT_AT], 0.12);
    },
    variants: [
      { label: 'feedback 0.2', apply: ({ delay }) => (delay.feedback = 0.2) },
      { label: 'feedback 0.6, time 0.4', apply: ({ delay }) => ((delay.feedback = 0.6), (delay.time = 0.4)) },
      { label: 'feedback 0.9, time 0.25', apply: ({ delay }) => ((delay.feedback = 0.9), (delay.time = 0.25)) },
    ],
    frame: (t) => bars.head(t),
    controls: ({ delay }, bar) =>
      tweak(bar, delay, [['feedback', 0, 0.95, 0.05], ['time', 0.05, 1, 0.05, ' s'], ['mix', 0, 1, 0.05]], () => redraw(delay)),
  });
};

export default mount;
