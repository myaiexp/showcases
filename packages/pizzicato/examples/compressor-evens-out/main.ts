// Eight notes alternating loud and quiet, with the Compressor taken out or left in
import Pizzicato from 'pizzicato';
import type { Mount } from '@/types.ts';
import { phrase, tweak, wave } from '../../shared/fx.ts';
import { meter } from '../../shared/fx-pictures.ts';
import { checkbox } from '../../shared/controls.ts';
import { flow } from '../../shared/flow.ts';
import { pzStage } from '../../shared/stage.ts';

const NOTES = [57, 57, 60, 60, 64, 64, 60, 57];

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: 3.4 });
  const picture = flow(stage.visual, 'notes', ['Compressor'], 'ears');
  const loudness = meter(stage.visual, () => stage.samples());

  return stage.run({
    build: () => {
      const notes = wave('triangle', 220, 0.9);
      const compressor = new Pizzicato.Effects.Compressor({ threshold: -30, knee: 5, attack: 0.003, release: 0.1, ratio: 20 });
      notes.addEffect(compressor);
      return { notes, compressor };
    },
    play: ({ notes }, at) => {
      stage.show(() => picture.caption('loud / quiet / loud ...'));
      phrase(notes, at, NOTES, 0.1, 0.4, 0.32, (i) => {
        // Every other note is played at a quarter of the volume.
        notes.volume = i % 2 === 0 ? 0.9 : 0.2;
        stage.show(() => picture.caption(i % 2 === 0 ? 'LOUD note' : 'quiet note'));
      });
    },
    variants: [
      {
        label: 'compressor off',
        apply: ({ notes, compressor }) => {
          notes.removeEffect(compressor);
          stage.show(() => picture.active(0, false));
        },
      },
      { label: 'compressor on', apply: () => stage.show(() => picture.active(0, true)) },
    ],
    frame: loudness,
    controls: ({ notes, compressor }, bar) => {
      checkbox(bar, 'compressor on', true, (on) => {
        if (on && !notes.effects.includes(compressor)) notes.addEffect(compressor);
        if (!on) notes.removeEffect(compressor);
        picture.active(0, on);
      });
      tweak(bar, compressor, [['threshold', -100, 0, 1, ' dB'], ['knee', 0, 40, 1], ['ratio', 1, 20, 1], ['attack', 0, 1, 0.01, ' s'], ['release', 0, 1, 0.01, ' s']]);
    },
  });
};

export default mount;
