// Two held chords through a Tremolo at three speeds and depths
import Pizzicato, { type Tremolo } from 'pizzicato';
import type { Mount } from '@/types.ts';
import { tweak } from '../../shared/fx.ts';
import { meter } from '../../shared/fx-pictures.ts';
import { flow } from '../../shared/flow.ts';
import { fileSound } from '../../shared/load.ts';
import { pzStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: 2 });
  const picture = flow(stage.visual, 'chords', ['Tremolo'], 'ears');
  const loudness = meter(stage.visual, () => stage.samples());
  const show = (t: Tremolo): void => picture.caption(`${t.speed} wobbles/s, depth ${t.depth}`);

  return stage.run({
    build: async () => {
      const chords = await fileSound('keys');
      const tremolo = new Pizzicato.Effects.Tremolo({ speed: 5, depth: 0.6, mix: 1 });
      chords.addEffect(tremolo);
      return { chords, tremolo };
    },
    play: ({ chords, tremolo }, at) => {
      stage.show(() => show(tremolo));
      chords.play();
      at(1.95, () => chords.stop());
    },
    variants: [
      { label: 'speed 3, depth 0.4', apply: ({ tremolo }) => ((tremolo.speed = 3), (tremolo.depth = 0.4)) },
      { label: 'speed 7, depth 0.9', apply: ({ tremolo }) => ((tremolo.speed = 7), (tremolo.depth = 0.9)) },
      { label: 'speed 14, depth 1', apply: ({ tremolo }) => ((tremolo.speed = 14), (tremolo.depth = 1)) },
    ],
    frame: loudness,
    controls: ({ tremolo }, bar) => {
      show(tremolo);
      tweak(bar, tremolo, [['speed', 0, 20, 0.5, '/s'], ['depth', 0, 1, 0.05], ['mix', 0, 1, 0.05]], () => show(tremolo));
    },
  });
};

export default mount;
