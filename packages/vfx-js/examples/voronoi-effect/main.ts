// VFX-JS: VoronoiEffect, cells that shrink away from the pointer over flowers
import { VFX } from '@vfx-js/core';
import { VoronoiEffect } from '@vfx-js/effects';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { paramSliders } from '../../shared/fx-params.ts';
import { picture } from '../../shared/pictures.ts';
import { standInPointer } from '../../shared/pointer.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move the pointer over the picture.' });
  const img = await picture('flowers', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  // The picture is cut into Voronoi cells (cellSize, in physical px). Cells near the
  // pointer shrink by `press`, leaving bgColor in the gaps; breathe shrinks the rest on noise.
  const voronoi = new VoronoiEffect({
    cellSize: ctx.preview ? 22 : 36,
    pressRadius: ctx.preview ? 80 : 160,
    breathe: 0.3,
    breatheSpeed: 1,
    bgColor: '#0b0b1a',
  });
  await vfx.add(img, { effect: voronoi });
  standInPointer(stage, img);

  const p = voronoi.params;
  if (stage.bar) {
    paramSliders(stage.bar, p, [
      ['cellSize', 8, 120, 1],
      ['press', 0, 1, 0.01],
      ['pressRadius', 20, 500, 5],
      ['breathe', 0, 1, 0.01],
      ['breatheSpeed', 0, 4, 0.1],
      ['seed', 0, 20, 1],
    ]);
    checkbox(stage.bar, 'flatCells', p.flatCells, (v) => (p.flatCells = v));
    stage.say('Cells close to the pointer shrink toward their centre; flatCells makes each cell a single flat colour.');
  } else {
    stage.say('a stand-in pointer shrinks the cells');
  }
  return () => stage.dispose();
};

export default mount;
