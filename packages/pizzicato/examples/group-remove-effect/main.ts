// removeEffect() on a Group: the chain closes up and the music keeps playing
import Pizzicato from 'pizzicato';
import type { Mount } from '@/types.ts';
import { BAND, loadBand, tracks } from '../../shared/band.ts';
import { checkbox } from '../../shared/controls.ts';
import { flow } from '../../shared/flow.ts';
import { pzStage } from '../../shared/stage.ts';

const NAMES = ['Distortion', 'Delay'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: 4.8 });
  const picture = flow(stage.visual, 'band', [...NAMES], 'out');
  const lanes = await tracks(stage.visual, BAND, ctx.signal, ctx.preview ? 14 : 28);
  let running = false;
  const chain = (on: readonly boolean[], text: string): void => {
    on.forEach((v, i) => picture.active(i, v));
    picture.caption(text);
  };

  return stage.run({
    build: async () => {
      const sounds = await loadBand();
      const group = new Pizzicato.Group(sounds);
      const fuzz = new Pizzicato.Effects.Distortion({ gain: 0.7 });
      const echo = new Pizzicato.Effects.Delay({ feedback: 0.4, time: 0.25, mix: 0.4 });
      group.addEffect(fuzz);
      group.addEffect(echo);
      return { group, fuzz, echo };
    },
    play: ({ group, fuzz, echo }, at) => {
      group.play();
      stage.show(() => {
        running = true;
        chain([true, true], 'two effects on the group');
      });
      if (stage.preview) {
        at(1.6, () => {
          group.removeEffect(fuzz);
          stage.show(() => chain([false, true], 'removeEffect(fuzz): echo stays'));
        });
        at(3.2, () => {
          group.removeEffect(echo);
          stage.show(() => chain([false, false], 'removeEffect(echo): dry band'));
        });
        at(4.6, () => group.stop());
      }
      return () => {
        group.stop();
        running = false;
        lanes.head(null);
      };
    },
    frame: (t) => {
      if (running) lanes.head(t);
    },
    controls: ({ group, fuzz, echo }, bar) => {
      const effects = [fuzz, echo];
      const refresh = (): void => chain(effects.map((e) => group.effects.includes(e)), 'untick to removeEffect()');
      refresh();
      NAMES.forEach((name, i) => {
        checkbox(bar, name, true, (on) => {
          const effect = effects[i]!;
          if (on && !group.effects.includes(effect)) group.addEffect(effect);
          if (!on && group.effects.includes(effect)) group.removeEffect(effect);
          refresh();
        });
      });
    },
  });
};

export default mount;
