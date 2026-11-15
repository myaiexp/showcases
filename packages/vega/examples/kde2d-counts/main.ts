// kde2d counts: probability estimates or smoothed point counts
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
      { name: 'counts', value: false, bind: { input: 'checkbox' } },
    ],
    data: [
      { name: 'points', values: points },
      {
        name: 'contours',
        source: 'points',
        transform: [
          // false: the grid sums to 1 (a probability density). true: smoothed counts per pixel.
          { type: 'kde2d', size: [{ signal: 'width' }, { signal: 'height' }], x: 'x', y: 'y', bandwidth: [12, 12], counts: { signal: 'counts' }, as: 'grid' },
          { type: 'isocontour', field: 'grid', levels: 6 },
        ],
      },
      // The level values, as the legend of what the grid holds.
      { name: 'levels', source: 'contours', transform: [{ type: 'extent', field: 'contour.value', signal: 'span' }] },
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
        encode: { update: { x: { value: 4 }, y: { value: 14 }, fill: { value: '#f0b060' }, fontSize: { value: 13 }, text: { signal: "'counts: ' + counts + ', top level ' + format(span[1], '.3g')" } } },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'counts', [false, true], 1800);
  return () => stage.dispose();
};

export default mount;
