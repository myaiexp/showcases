// A single addEffect() on a Group changes the sound of every track in it
import Pizzicato, { type Effect } from 'pizzicato';
import type { Mount } from '@/types.ts';
import { BAND, loadBand, tracks } from '../../shared/band.ts';
import { checkbox, select } from '../../shared/controls.ts';
import { flow } from '../../shared/flow.ts';
import { pzStage } from '../../shared/stage.ts';

const NAMES = ['LowPass', 'Distortion', 'Tremolo'] as const;
type Name = (typeof NAMES)[number];
const WHAT: Record<Name, string> = { LowPass: 'muffled, like a wall', Distortion: 'everything fuzzy', Tremolo: 'everything wobbles' };

const mount: Mount = async (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: 3.6 });
  const picture = flow(stage.visual, 'band', ['effect'], 'out');
  const lanes = await tracks(stage.visual, BAND, ctx.signal, ctx.preview ? 14 : 28);
  let running = false;
  const showEffect = (name: Name, on: boolean): void => {
    picture.rename(0, name);
    picture.active(0, on);
    picture.caption(on ? `addEffect(): ${WHAT[name]}` : 'band, no effect yet');
  };

  return stage.run({
    build: async () => {
      const sounds = await loadBand();
      const group = new Pizzicato.Group(sounds);
      const effects: Record<Name, Effect> = {
        LowPass: new Pizzicato.Effects.LowPassFilter({ frequency: 450, peak: 3 }),
        Distortion: new Pizzicato.Effects.Distortion({ gain: 0.8 }),
        Tremolo: new Pizzicato.Effects.Tremolo({ speed: 6, depth: 0.9, mix: 1 }),
      };
      return { group, effects, chosen: { name: 'LowPass' as Name } };
    },
    play: ({ group, effects, chosen }, at) => {
      group.play();
      const name = chosen.name;
      stage.show(() => {
        running = true;
        showEffect(name, false);
      });
      if (stage.preview) {
        at(1.2, () => {
          group.addEffect(effects[name]);
          stage.show(() => showEffect(name, true));
        });
        at(3.4, () => group.stop());
      }
      return () => {
        group.stop();
        running = false;
        lanes.head(null);
      };
    },
    variants: [
      { label: 'group.addEffect(LowPass)', apply: ({ chosen }) => (chosen.name = 'LowPass') },
      { label: 'group.addEffect(Distortion)', apply: ({ chosen }) => (chosen.name = 'Distortion') },
      { label: 'group.addEffect(Tremolo)', apply: ({ chosen }) => (chosen.name = 'Tremolo') },
    ],
    frame: (t) => {
      if (running) lanes.head(t);
    },
    controls: ({ group, effects, chosen }, bar) => {
      let on = false;
      const refresh = (): void => showEffect(chosen.name, on);
      refresh();
      checkbox(bar, 'effect on the group', false, (v) => {
        on = v;
        const effect = effects[chosen.name];
        if (v && !group.effects.includes(effect)) group.addEffect(effect);
        if (!v && group.effects.includes(effect)) group.removeEffect(effect);
        refresh();
      });
      select(bar, 'effect', NAMES, (v) => {
        for (const e of [...group.effects]) group.removeEffect(e);
        chosen.name = v;
        if (on) group.addEffect(effects[v]);
        refresh();
      });
    },
  });
};

export default mount;
