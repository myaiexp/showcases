// A chime through a Reverb: its time and decay set the size of the room
import Pizzicato, { type Reverb } from 'pizzicato';
import type { Mount } from '@/types.ts';
import { blips, tweak, wave } from '../../shared/fx.ts';
import { timeline } from '../../shared/fx-pictures.ts';
import { flow } from '../../shared/flow.ts';
import { pzStage } from '../../shared/stage.ts';

const SECONDS = 4.8;
const CHIME_AT = 0.2;

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: SECONDS });
  const picture = flow(stage.visual, 'chime', ['Reverb'], 'ears');
  const tail = timeline(stage.visual, SECONDS, ctx.preview ? 34 : 60);
  const redraw = (r: Reverb, name: string): void => {
    // The impulse is noise whose volume follows (1 - x) ^ decay over `time` seconds (src/Effects/Reverb.js).
    tail.set([
      { kind: 'bar', t: CHIME_AT, level: 1 },
      { kind: 'area', t: CHIME_AT, length: r.time, shape: (x) => (1 - x) ** r.decay, color: '#ffb86b' },
    ]);
    picture.caption(`${name}: rings ${r.time} s`);
  };

  return stage.run({
    build: () => {
      const chime = wave('triangle', 880, 0.4);
      const reverb = new Pizzicato.Effects.Reverb({ time: 0.5, decay: 2, mix: 0.5 });
      chime.addEffect(reverb);
      return { chime, reverb };
    },
    play: ({ chime, reverb }, at) => {
      stage.show(() => redraw(reverb, reverb.time > 2 ? 'church' : 'bathroom'));
      blips(chime, at, [CHIME_AT], 0.15);
    },
    variants: [
      { label: 'time 0.5, decay 2', apply: () => undefined },
      { label: 'time 4, decay 1', apply: ({ reverb }) => ((reverb.time = 4), (reverb.decay = 1)) },
    ],
    frame: (t) => tail.head(t),
    controls: ({ reverb }, bar) => {
      redraw(reverb, 'bathroom');
      tweak(bar, reverb, [['time', 0.1, 6, 0.1, ' s'], ['decay', 0.1, 6, 0.1], ['mix', 0, 1, 0.05]], () => redraw(reverb, 'your room'));
    },
  });
};

export default mount;
