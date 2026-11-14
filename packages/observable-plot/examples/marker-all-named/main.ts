// Every named marker on the same short line, one facet each
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { mountStatic } from '../../shared/plot.ts';

const MARKERS = ['arrow', 'arrow-reverse', 'dot', 'circle', 'circle-stroke', 'tick', 'tick-x', 'tick-y'] as const;
const points = [[0, 0.2], [1, 0.8], [2, 0.3], [3, 0.9], [4, 0.5]] as const;

const mount: Mount = (el, ctx) =>
  mountStatic(el, ctx, ({ width, height, preview }) => {
    const shown = preview ? MARKERS.slice(0, 4) : MARKERS;
    return Plot.plot({
      width,
      height,
      marginLeft: 10,
      marginRight: 10,
      axis: null,
      inset: 8,
      fx: { axis: null, domain: [...shown] },
      marks: [
        Plot.frame({ strokeOpacity: 0.2 }),
        ...shown.flatMap((marker) => {
          const data = points.map(([x, y]) => ({ x, y, marker }));
          return [
            Plot.line(data, { x: 'x', y: 'y', fx: 'marker', stroke: 'steelblue', strokeWidth: 1.5, marker }),
            Plot.text([marker], { fx: [marker], frameAnchor: 'bottom', dy: -4, fontSize: preview ? 9 : 11, fillOpacity: 0.8 }),
          ];
        }),
      ],
    });
  });

export default mount;
