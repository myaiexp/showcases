// isocontour thresholds: explicit contour values instead of equal levels
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { gridOf } from '../../shared/geo-kit.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  // A made-up raster: two bumps on a 110 x 62 grid. isocontour reads { width, height, values }.
  const grid = gridOf(110, 62, (x, y) => {
    const a = Math.exp(-(((x - 36) / 16) ** 2 + ((y - 28) / 12) ** 2));
    const b = 0.7 * Math.exp(-(((x - 78) / 14) ** 2 + ((y - 36) / 14) ** 2));
    return a + b;
  });

  const spec: Spec = {
    width: 440,
    height: 250,
    autosize: 'none',
    padding: 5,
    signals: [
      { name: 't1', value: 0.15, bind: { input: 'range', min: 0.02, max: 0.95, step: 0.01 } },
      { name: 't2', value: 0.4, bind: { input: 'range', min: 0.02, max: 0.95, step: 0.01 } },
      { name: 't3', value: 0.75, bind: { input: 'range', min: 0.02, max: 0.95, step: 0.01 } },
    ],
    data: [
      {
        name: 'contours',
        values: [{ grid }],
        transform: [
          // thresholds wins over levels, nice, resolve and zero. The grid is 4x coarser than
          // the view, so scale puts the contours back in view pixels.
          { type: 'isocontour', field: 'grid', thresholds: [{ signal: 't1' }, { signal: 't2' }, { signal: 't3' }], scale: 4 },
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
        encode: { update: { x: { value: 4 }, y: { value: 14 }, fill: { value: '#f0b060' }, fontSize: { value: 13 }, text: { signal: "'thresholds: [' + t1 + ', ' + t2 + ', ' + t3 + ']'" } } },
      },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [
    { t1: 0.15, t2: 0.4, t3: 0.75 }, { t1: 0.05, t2: 0.1, t3: 0.2 }, { t1: 0.5, t2: 0.7, t3: 0.9 }, { t1: 0.3, t2: 0.6, t3: 0.9 },
  ], 1200);
  return () => stage.dispose();
};

export default mount;
