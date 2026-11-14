// One stacked bar of sport proportions: groupZ proportion, filtered labels
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const olympians = await csv('athletes.csv');
  return mountStatic(el, ctx, ({ width, height, preview }) =>
    Plot.plot({
      width,
      height: height ?? 100,
      x: { percent: true },
      marks: [
        Plot.barX(olympians, Plot.stackX({ order: 'x', reverse: true }, Plot.groupZ({ x: 'proportion' }, { z: 'sport', fillOpacity: 0.2, inset: 0.5 }))),
        // The filter runs after the stack, hiding labels on the thin bars.
        Plot.text(
          olympians,
          Plot.filter(
            (D: unknown[]) => D.length > 200,
            Plot.stackX({ order: 'x', reverse: true }, Plot.groupZ({ x: 'proportion', text: 'first' }, { z: 'sport', text: 'sport', rotate: 90, fontSize: preview ? 8 : undefined })),
          ),
        ),
        Plot.ruleX([0, 1]),
      ],
    }),
  );
};

export default mount;
