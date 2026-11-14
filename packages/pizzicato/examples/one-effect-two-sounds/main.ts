// A lead and a bass share one Delay object; the bass can be unplugged from it
import Pizzicato from 'pizzicato';
import type { Mount } from '@/types.ts';
import { blips, wave } from '../../shared/fx.ts';
import { echoBars, timeline, type Item } from '../../shared/fx-pictures.ts';
import { checkbox } from '../../shared/controls.ts';
import { flow } from '../../shared/flow.ts';
import { pzStage } from '../../shared/stage.ts';

const SECONDS = 3.2;
const LEAD_AT = [0.2, 1.4];
const BASS_AT = [0.8, 2.0];
const BLUE = '#7aa2ff';
const ORANGE = '#ffb86b';

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: SECONDS });
  const picture = flow(stage.visual, 'duo', ['Delay'], 'ears');
  const bars = timeline(stage.visual, SECONDS, ctx.preview ? 36 : 60);
  const redraw = (bassHasIt: boolean): void => {
    const plan = (start: number, color: string, mix: number): Item[] =>
      echoBars({ kind: 'delay', start, time: 0.3, feedback: 0.5, mix, color }, SECONDS);
    bars.set([
      ...LEAD_AT.flatMap((t) => plan(t, BLUE, 0.6)),
      // A mix of 0 draws only the dry hit: the bass has no echoes without the Delay.
      ...BASS_AT.flatMap((t) => plan(t, ORANGE, bassHasIt ? 0.6 : 0)),
    ]);
    picture.caption(bassHasIt ? 'one Delay, two sounds' : 'only the lead has it');
  };

  return stage.run({
    build: () => {
      const lead = wave('triangle', 660, 0.35);
      const bass = wave('sawtooth', 110, 0.4);
      const delay = new Pizzicato.Effects.Delay({ feedback: 0.5, time: 0.3, mix: 0.6 });
      lead.addEffect(delay);
      bass.addEffect(delay);
      return { lead, bass, delay, bassHasIt: true };
    },
    play: (g, at) => {
      stage.show(() => redraw(g.bassHasIt));
      blips(g.lead, at, LEAD_AT, 0.12);
      blips(g.bass, at, BASS_AT, 0.2);
    },
    variants: [
      { label: 'Delay on both sounds', apply: () => undefined },
      {
        label: 'Delay removed from the bass',
        apply: (g) => {
          g.bass.removeEffect(g.delay);
          g.bassHasIt = false;
        },
      },
    ],
    frame: (t) => bars.head(t),
    controls: (g, bar) => {
      redraw(g.bassHasIt);
      checkbox(bar, 'Delay on the bass too', true, (on) => {
        if (on && !g.bass.effects.includes(g.delay)) g.bass.addEffect(g.delay);
        if (!on) g.bass.removeEffect(g.delay);
        g.bassHasIt = on;
        redraw(on);
      });
    },
  });
};

export default mount;
