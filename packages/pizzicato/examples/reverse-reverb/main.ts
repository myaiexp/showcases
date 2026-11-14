// A chime through a Reverb, with `reverse` off and on
import Pizzicato, { type Reverb } from 'pizzicato';
import type { Mount } from '@/types.ts';
import { blips, wave } from '../../shared/fx.ts';
import { timeline } from '../../shared/fx-pictures.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { flow } from '../../shared/flow.ts';
import { pzStage } from '../../shared/stage.ts';

const SECONDS = 3.4;
const CHIME_AT = 0.2;

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: SECONDS });
  const picture = flow(stage.visual, 'chime', ['Reverb'], 'ears');
  const tail = timeline(stage.visual, SECONDS, ctx.preview ? 34 : 60);
  const redraw = (r: Reverb): void => {
    // Reversed, the impulse's volume follows x ^ decay instead of (1 - x) ^ decay (src/Effects/Reverb.js).
    const shape = r.reverse ? (x: number): number => x ** r.decay : (x: number): number => (1 - x) ** r.decay;
    tail.set([
      { kind: 'bar', t: CHIME_AT, level: 1 },
      { kind: 'area', t: CHIME_AT, length: r.time, shape, color: r.reverse ? '#ff8fb1' : '#ffb86b' },
    ]);
    picture.caption(r.reverse ? 'tail swells, then cuts' : 'tail fades away');
  };

  return stage.run({
    build: () => {
      const chime = wave('triangle', 660, 0.4);
      const reverb = new Pizzicato.Effects.Reverb({ time: 2, decay: 1.5, reverse: false, mix: 0.6 });
      chime.addEffect(reverb);
      return { chime, reverb };
    },
    play: ({ chime, reverb }, at) => {
      stage.show(() => redraw(reverb));
      blips(chime, at, [CHIME_AT], 0.15);
    },
    variants: [
      { label: 'reverse: false', apply: () => undefined },
      { label: 'reverse: true', apply: ({ reverb }) => (reverb.reverse = true) },
    ],
    frame: (t) => tail.head(t),
    controls: ({ reverb }, bar) => {
      redraw(reverb);
      checkbox(bar, 'reverse', false, (v) => {
        reverb.reverse = v;
        redraw(reverb);
      });
      slider(bar, 'time', 0.5, 3, 0.1, reverb.time, (v) => ((reverb.time = v), redraw(reverb)), (v) => `${v.toFixed(1)} s`);
    },
  });
};

export default mount;
