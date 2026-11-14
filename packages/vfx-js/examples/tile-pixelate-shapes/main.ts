// VFX-JS: TilePixelateEffect shapes, stretch, dissolve and knockout
import { VFX } from '@vfx-js/core';
import { TilePixelateEffect, type TilePixelateShape } from '@vfx-js/effects';
import type { Mount } from '@/types.ts';
import { checkbox, select } from '../../shared/controls.ts';
import { paramSliders } from '../../shared/fx-params.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const SHAPES: TilePixelateShape[] = ['rectangle', 'ellipse', 'hexagon', 'triangle'];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('city', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  const tiles = new TilePixelateEffect({ shape: 'hexagon', size: ctx.preview ? 12 : 22, gap: 0.1, dissolve: 0.15, falloff: 0.5 });
  await vfx.add(img, { effect: tiles });

  const p = tiles.params;
  const show = (s: TilePixelateShape): void => {
    p.shape = s;
    stage.say(`shape "${s}"`);
  };
  if (stage.bar) {
    select(stage.bar, 'shape', SHAPES.map((s) => [s, s] as const), show, p.shape);
    paramSliders(stage.bar, p, [
      ['stretch', 0.3, 3, 0.05],
      ['dissolve', 0, 1, 0.01],
      ['falloff', 0, 1, 0.01],
      ['gap', 0, 0.6, 0.01],
    ]);
    checkbox(stage.bar, 'knockout', p.knockout, (v) => (p.knockout = v));
    show(p.shape);
  } else {
    stage.cycle(SHAPES, 2000, show);
  }
  return () => stage.dispose();
};

export default mount;
