// VFX-JS: TilePixelateEffect rebuilds a portrait out of tiles with gaps
import { VFX } from '@vfx-js/core';
import { TilePixelateEffect } from '@vfx-js/effects';
import type { Mount } from '@/types.ts';
import { paramSliders, sweep } from '../../shared/fx-params.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('portrait', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  const tiles = new TilePixelateEffect({ shape: 'rectangle', size: ctx.preview ? 9 : 16, gap: 0.12 });
  await vfx.add(img, { effect: tiles });

  const p = tiles.params;
  if (stage.bar) {
    paramSliders(stage.bar, p, [
      ['size', 4, 60, 1],
      ['gap', 0, 0.6, 0.01],
      ['averageColor', 0, 1, 0.01],
      ['colorTrim', 0, 8, 0.1],
    ]);
    stage.say('Each tile takes the colour of its area (averageColor mixes between that and the source); gap leaves space between tiles.');
  } else {
    stage.frame((t) => {
      p.gap = sweep(t, 0, 0.4, 5);
      stage.say(`gap ${p.gap.toFixed(2)}`);
    });
  }
  return () => stage.dispose();
};

export default mount;
