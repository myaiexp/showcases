// MatrixEffect rains glyphs over a portrait, the picture showing through
import { VFX } from '@vfx-js/core';
import { MatrixEffect } from '@vfx-js/effects';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { paramSliders } from '../../shared/fx-params.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('portrait', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  const matrix = new MatrixEffect({ grid: ctx.preview ? [8, 11] : [12, 16], birthRate: 0.9, contrast: 1.4 });
  await vfx.add(img, { effect: matrix });

  // MatrixEffect has no readable params object: setParams is how live values reach it.
  const state = { speed: 10, tail: 18, birthRate: 0.9, brightness: 1, contrast: 1.4 };
  if (stage.bar) {
    paramSliders(
      stage.bar,
      state,
      [
        ['speed', 1, 40, 1],
        ['tail', 2, 40, 1],
        ['birthRate', 0.1, 3, 0.05],
        ['brightness', 0.3, 3, 0.05],
        ['contrast', 0.3, 3, 0.05],
      ],
      (k, v) => matrix.setParams({ [k]: v }),
    );
    checkbox(stage.bar, 'invert', false, (v) => matrix.setParams({ invert: v }));
    stage.say('Glyphs fall down each column with a bright head and a fading trail; the picture\'s brightness gates the rain.');
  } else {
    stage.say('digital rain over the picture');
  }
  return () => stage.dispose();
};

export default mount;
