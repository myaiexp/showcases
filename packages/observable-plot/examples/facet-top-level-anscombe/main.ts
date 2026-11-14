// Top-level faceting: facet.data and facet.x share Anscombe's series across marks
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const anscombe = await csv('anscombe.csv');
  return mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({
      width,
      height,
      grid: true,
      aspectRatio: 0.5,
      // Both marks use the facet data, so both split by series.
      facet: { data: anscombe, x: 'series' },
      marks: [Plot.frame(), Plot.line(anscombe, { x: 'x', y: 'y' }), Plot.dot(anscombe, { x: 'x', y: 'y' })],
    }),
  );
};

export default mount;
