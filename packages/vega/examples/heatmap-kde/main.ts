// heatmap color and opacity: a density grid drawn as one colour with varying opacity
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
      { name: 'tint', value: 'steelblue', bind: { input: 'select', options: ['steelblue', 'orange', 'tomato', 'mediumseagreen', 'orchid'] } },
      { name: 'gamma', value: 1, bind: { input: 'range', min: 0.2, max: 2.5, step: 0.05 } },
    ],
    data: [
      { name: 'points', values: points },
      {
        name: 'heat',
        source: 'points',
        transform: [
          { type: 'kde2d', size: [{ signal: 'width' }, { signal: 'height' }], x: 'x', y: 'y', bandwidth: [12, 12], cellSize: 2, as: 'grid' },
          // color is one colour for every pixel; opacity runs from 0 to 1 over the density.
          // The default opacity is $value / $max; the exponent makes the shading harder or softer.
          { type: 'heatmap', field: 'grid', color: { signal: 'tint' }, opacity: { expr: 'pow(datum.$value / datum.$max, gamma)' } },
        ],
      },
    ],
    marks: [
      {
        type: 'image',
        from: { data: 'heat' },
        encode: {
          update: {
            // The bitmap has the grid's size; the image mark stretches it over the view.
            image: { field: 'image' },
            x: { value: 0 }, y: { value: 0 },
            width: { signal: 'width' }, height: { signal: 'height' },
            aspect: { value: false },
          },
        },
      },
      {
        type: 'text',
        encode: { update: { x: { value: 4 }, y: { value: 14 }, fill: { value: '#f0b060' }, fontSize: { value: 13 }, text: { signal: "'color: ' + tint + ', opacity: (value / max) ^ ' + format(gamma, '.2f')" } } },
      },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [
    { tint: 'steelblue', gamma: 1 }, { tint: 'steelblue', gamma: 0.4 }, { tint: 'orange', gamma: 1 },
    { tint: 'orange', gamma: 2.2 }, { tint: 'orchid', gamma: 0.6 }, { tint: 'mediumseagreen', gamma: 1 },
  ], 1200);
  return () => stage.dispose();
};

export default mount;
