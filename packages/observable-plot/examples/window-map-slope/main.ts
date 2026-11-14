// Unemployment lines colored by monthly change via Plot.window
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const bls = await csv('bls-metro-unemployment.csv');
  return mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({
      width,
      height,
      y: { grid: true },
      color: { scheme: 'BuYlRd', domain: [-0.5, 0.5] },
      marks: [
        Plot.ruleY([0]),
        Plot.lineY(
          bls,
          Plot.map(
            { stroke: Plot.window({ k: 2, reduce: 'difference' }) },
            { x: 'date', y: 'unemployment', z: 'division', stroke: 'unemployment' },
          ),
        ),
      ],
    }),
  );
};

export default mount;
