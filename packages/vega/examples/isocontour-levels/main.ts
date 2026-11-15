// isocontour levels: how many equally spaced level sets to cut from a density grid
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { cloud } from '../../shared/geo-kit.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  // Two Gaussian blobs of 500 pixel points each, seeded so every mount draws the same ones.
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
      { name: 'levels', value: 8, bind: { input: 'range', min: 2, max: 16, step: 1 } },
    ],
    data: [
      { name: 'points', values: points },
      {
        name: 'contours',
        source: 'points',
        transform: [
          // kde2d turns the points into a raster grid of density estimates ...
          { type: 'kde2d', size: [{ signal: 'width' }, { signal: 'height' }], x: 'x', y: 'y', bandwidth: [12, 12], as: 'grid' },
          // ... and isocontour draws that many equally spaced level sets of the grid.
          { type: 'isocontour', field: 'grid', levels: { signal: 'levels' } },
        ],
      },
    ],
    scales: [
      { name: 'shade', type: 'linear', zero: false, domain: { data: 'contours', field: 'contour.value' }, range: { scheme: 'viridis' } },
    ],
    marks: [
      {
        type: 'symbol',
        from: { data: 'points' },
        encode: { update: { x: { field: 'x' }, y: { field: 'y' }, size: { value: 8 }, fill: { value: '#ffffff' }, fillOpacity: { value: 0.35 } } },
      },
      {
        type: 'shape',
        from: { data: 'contours' },
        encode: { update: { fill: { scale: 'shade', field: 'contour.value' }, fillOpacity: { value: 0.55 }, stroke: { value: '#ddd' }, strokeWidth: { value: 0.7 } } },
        transform: [{ type: 'geoshape', field: 'datum.contour' }],
      },
      {
        type: 'text',
        encode: { update: { x: { value: 4 }, y: { value: 14 }, fill: { value: '#f0b060' }, fontSize: { value: 13 }, text: { signal: "'levels: ' + levels" } } },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'levels', [3, 5, 8, 12, 16, 10, 6], 1000);
  return () => stage.dispose();
};

export default mount;
