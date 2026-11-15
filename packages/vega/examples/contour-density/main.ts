// contour (deprecated): the older all-in-one density contour transform
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
      { name: 'count', value: 6, bind: { input: 'range', min: 2, max: 14, step: 1 } },
      { name: 'bw', value: 14, bind: { input: 'range', min: 4, max: 40, step: 1 } },
    ],
    data: [
      { name: 'points', values: points },
      {
        name: 'contours',
        source: 'points',
        transform: [
          // contour does the density estimate and the level sets in one step. Vega 5.8 replaced it
          // with kde2d + isocontour, which can do much more, but it still runs.
          { type: 'contour', size: [{ signal: 'width' }, { signal: 'height' }], x: 'x', y: 'y', bandwidth: { signal: 'bw' }, count: { signal: 'count' } },
        ],
      },
    ],
    scales: [
      { name: 'shade', type: 'linear', zero: false, domain: { data: 'contours', field: 'value' }, range: { scheme: 'viridis' } },
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
        // Each output row is itself a GeoJSON feature, so geoshape needs no field.
        encode: { update: { fill: { scale: 'shade', field: 'value' }, fillOpacity: { value: 0.55 }, stroke: { value: '#ddd' }, strokeWidth: { value: 0.7 } } },
        transform: [{ type: 'geoshape' }],
      },
      {
        type: 'text',
        encode: { update: { x: { value: 4 }, y: { value: 14 }, fill: { value: '#f0b060' }, fontSize: { value: 13 }, text: { signal: "'count: ' + count + ', bandwidth: ' + bw" } } },
      },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [
    { count: 6, bw: 14 }, { count: 12, bw: 14 }, { count: 6, bw: 30 }, { count: 4, bw: 6 }, { count: 10, bw: 8 },
  ], 1300);
  return () => stage.dispose();
};

export default mount;
