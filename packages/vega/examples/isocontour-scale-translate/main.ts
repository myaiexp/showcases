// isocontour scale and translate: moving contour coordinates into another space
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
      { name: 'sx', value: 4, bind: { input: 'range', min: 1, max: 8, step: 0.5 } },
      { name: 'sy', value: 4, bind: { input: 'range', min: 1, max: 8, step: 0.5 } },
      { name: 'dx', value: 0, bind: { input: 'range', min: -100, max: 100, step: 1 } },
      { name: 'dy', value: 0, bind: { input: 'range', min: -100, max: 100, step: 1 } },
    ],
    data: [
      { name: 'points', values: points },
      {
        name: 'contours',
        source: 'points',
        transform: [
          { type: 'kde2d', size: [{ signal: 'width' }, { signal: 'height' }], x: 'x', y: 'y', bandwidth: [12, 12], as: 'grid' },
          // The grid is 4x coarser than the view; scale [sx, sy] maps grid cells to pixels (4 is exact)
          // and translate [dx, dy] then shifts the result.
          { type: 'isocontour', field: 'grid', levels: 6, scale: { signal: '[sx, sy]' }, translate: { signal: '[dx, dy]' } },
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
        encode: { update: { x: { value: 4 }, y: { value: 14 }, fill: { value: '#f0b060' }, fontSize: { value: 13 }, text: { signal: "'scale [' + sx + ', ' + sy + '], translate [' + dx + ', ' + dy + ']'" } } },
      },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [
    { sx: 4, sy: 4, dx: 0, dy: 0 }, { sx: 6, sy: 4, dx: -60, dy: 0 }, { sx: 4, sy: 2, dx: 0, dy: 70 }, { sx: 2.5, sy: 2.5, dx: 90, dy: 50 },
  ], 1400);
  return () => stage.dispose();
};

export default mount;
