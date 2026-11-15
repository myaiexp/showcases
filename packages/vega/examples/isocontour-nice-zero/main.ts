// isocontour nice and zero: round threshold values, with or without the zero baseline
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
      { name: 'nice', value: false, bind: { input: 'checkbox' } },
      { name: 'zero', value: true, bind: { input: 'checkbox' } },
    ],
    data: [
      { name: 'points', values: points },
      {
        name: 'contours',
        source: 'points',
        transform: [
          { type: 'kde2d', size: [{ signal: 'width' }, { signal: 'height' }], x: 'x', y: 'y', bandwidth: [12, 12], as: 'grid' },
          // nice rounds the thresholds to human-friendly values (the count may shift);
          // zero: false leaves the baseline level out, which trims the faintest outline.
          { type: 'isocontour', field: 'grid', levels: 5, nice: { signal: 'nice' }, zero: { signal: 'zero' } },
          { type: 'formula', as: 'level', expr: 'datum.contour.value' },
          { type: 'window', ops: ['row_number'], as: ['row'] },
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
        encode: { update: { fill: { scale: 'shade', field: 'contour.value' }, fillOpacity: { value: 0.5 }, stroke: { value: '#ddd' }, strokeWidth: { value: 0.7 } } },
        transform: [{ type: 'geoshape', field: 'datum.contour' }],
      },
      {
        type: 'text',
        from: { data: 'contours' },
        encode: {
          update: {
            x: { signal: 'width - 8' },
            y: { signal: 'datum.row * 14 + 6' },
            align: { value: 'right' },
            fill: { scale: 'shade', field: 'level' },
            fontSize: { value: 12 },
            text: { signal: "'level ' + format(datum.level, '.2e')" },
          },
        },
      },
      {
        type: 'text',
        encode: { update: { x: { value: 4 }, y: { value: 14 }, fill: { value: '#f0b060' }, fontSize: { value: 13 }, text: { signal: "'nice: ' + nice + ', zero: ' + zero" } } },
      },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [
    { nice: false, zero: true }, { nice: true, zero: true }, { nice: true, zero: false }, { nice: false, zero: false },
  ], 1500);
  return () => stage.dispose();
};

export default mount;
