// kde2d cellSize: the grid resolution, from the pixel size to coarse blocks
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle, cycleSteps } from '../../shared/cards.ts';
import { cloud } from '../../shared/geo-kit.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const points = cloud(7, [
    { cx: 150, cy: 120, sx: 45, sy: 35, n: 500 },
    { cx: 300, cy: 150, sx: 55, sy: 30, n: 500 },
  ]);

  const spec: Spec = {
    width: 440,
    height: 250,
    autosize: 'none',
    padding: 5,
    signals: [
      { name: 'cell', value: 4, bind: { input: 'select', options: [1, 2, 4, 8, 16, 32] } },
    ],
    data: [
      { name: 'points', values: points },
      {
        name: 'contours',
        source: 'points',
        transform: [
          // cellSize is a power of two: 1 gives a grid as big as size, 4 (the default) a quarter of
          // it in each direction. Coarse cells make cheaper but blockier density estimates.
          { type: 'kde2d', size: [{ signal: 'width' }, { signal: 'height' }], x: 'x', y: 'y', bandwidth: [12, 12], cellSize: { signal: 'cell' }, as: 'grid' },
          { type: 'isocontour', field: 'grid', levels: 6, smooth: false },
        ],
      },
    ],
    scales: [
      { name: 'shade', type: 'linear', zero: false, domain: { data: 'contours', field: 'contour.value' }, range: { scheme: 'viridis' } },
    ],
    marks: [
      {
        type: 'shape',
        from: { data: 'contours' },
        encode: { update: { fill: { scale: 'shade', field: 'contour.value' }, fillOpacity: { value: 0.55 }, stroke: { value: '#ddd' }, strokeWidth: { value: 0.7 } } },
        transform: [{ type: 'geoshape', field: 'datum.contour' }],
      },
      {
        type: 'text',
        encode: { update: { x: { value: 4 }, y: { value: 14 }, fill: { value: '#f0b060' }, fontSize: { value: 13 }, text: { signal: "'cellSize: ' + cell + ' (grid ' + ceil(width / cell) + ' x ' + ceil(height / cell) + ')'" } } },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'cell', [1, 2, 4, 8, 16, 32, 8, 2], 1100);
  return () => stage.dispose();
};

export default mount;
