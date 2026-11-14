// group.volume moved over time: every track gets quieter, none of their own volumes change
import Pizzicato from 'pizzicato';
import type { Mount } from '@/types.ts';
import { BAND, loadBand } from '../../shared/band.ts';
import { gauge } from '../../shared/fx-pictures.ts';
import { slider } from '../../shared/controls.ts';
import { pzStage } from '../../shared/stage.ts';
import { bigText } from '../../shared/widgets.ts';

const STEPS = [1, 0.7, 0.45, 0.25, 0.1, 0.25, 0.5, 0.8, 1];

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: 4 });
  const title = bigText(stage.visual, ctx.preview ? 15 : 20);
  const master = gauge(stage.visual, 'group', '#ff8fb1');
  const own = BAND.map((name) => gauge(stage.visual, name));
  const show = (volume: number): void => {
    title.textContent = `group.volume = ${volume.toFixed(2)}`;
    master.set(volume, volume.toFixed(2));
  };

  return stage.run({
    build: async () => {
      const sounds = await loadBand();
      sounds.forEach((s, i) => own[i]!.set(s.volume, s.volume.toFixed(2)));
      return { sounds, group: new Pizzicato.Group(sounds) };
    },
    play: ({ group }, at) => {
      group.play();
      // A card slides the fader by itself; in the full view the sliders do.
      if (stage.preview) STEPS.forEach((volume, i) =>
        at(i * 0.44, () => {
          group.volume = volume;
          stage.show(() => show(volume));
        }),
      );
      return () => {
        group.stop();
        group.volume = 1;
      };
    },
    controls: ({ sounds, group }, bar) => {
      show(group.volume);
      slider(bar, 'group.volume', 0, 1, 0.01, group.volume, (v) => {
        group.volume = v;
        show(v);
      });
      sounds.forEach((s, i) =>
        slider(bar, BAND[i]!, 0, 1, 0.05, s.volume, (v) => {
          s.volume = v;
          own[i]!.set(v, v.toFixed(2));
        }),
      );
    },
  });
};

export default mount;
