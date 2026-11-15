// isocontour smooth: contour polygons from a coarse grid, with and without interpolation
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { gridOf } from '../../shared/geo-kit.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  // A made-up raster: two bumps on a 28 x 16 grid. isocontour reads { width, height, values }.
  const grid = gridOf(28, 16, (x, y) => {
    const a = Math.exp(-(((x - 9) / 4) ** 2 + ((y - 7) / 3) ** 2));
    const b = 0.7 * Math.exp(-(((x - 20) / 3.5) ** 2 + ((y - 9) / 3.5) ** 2));
    return a + b;
  });

  const spec: Spec = {
    width: 440,
    height: 250,
    autosize: 'none',
    padding: 5,
    signals: [
      { name: 'smooth', value: true, bind: { input: 'checkbox' } },
    ],
    data: [
      {
        name: 'contours',
        values: [{ grid }],
        transform: [
          // smooth: true moves the outline points along each cell edge by linear interpolation.
          // false leaves them at the cell edge midpoints, so the coarse grid shows through.
          { type: 'isocontour', field: 'grid', thresholds: [0.15, 0.4, 0.7, 0.95], smooth: { signal: 'smooth' }, scale: 16 },
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
        encode: { update: { fill: { scale: 'shade', field: 'contour.value' }, fillOpacity: { value: 0.7 }, stroke: { value: '#ddd' }, strokeWidth: { value: 0.7 } } },
        transform: [{ type: 'geoshape', field: 'datum.contour' }],
      },
      {
        type: 'text',
        encode: { update: { x: { value: 4 }, y: { value: 14 }, fill: { value: '#f0b060' }, fontSize: { value: 13 }, text: { signal: "'smooth: ' + smooth" } } },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'smooth', [false, true], 1500);
  return () => stage.dispose();
};

export default mount;
