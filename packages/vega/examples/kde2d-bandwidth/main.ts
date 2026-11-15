// kde2d bandwidth: the kernel width that sets how smooth a density estimate is
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
      { name: 'bwx', value: 12, bind: { input: 'range', min: 2, max: 40, step: 1 } },
      { name: 'bwy', value: 12, bind: { input: 'range', min: 2, max: 40, step: 1 } },
    ],
    data: [
      { name: 'points', values: points },
      {
        name: 'contours',
        source: 'points',
        transform: [
          // bandwidth is [x, y] in pixels. Leave it out (or use a negative value) for an automatic choice.
          { type: 'kde2d', size: [{ signal: 'width' }, { signal: 'height' }], x: 'x', y: 'y', bandwidth: [{ signal: 'bwx' }, { signal: 'bwy' }], as: 'grid' },
          { type: 'isocontour', field: 'grid', levels: 7 },
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
        encode: { update: { x: { value: 4 }, y: { value: 14 }, fill: { value: '#f0b060' }, fontSize: { value: 13 }, text: { signal: "'bandwidth: [' + bwx + ', ' + bwy + ']'" } } },
      },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [
    { bwx: 12, bwy: 12 }, { bwx: 4, bwy: 4 }, { bwx: 30, bwy: 8 }, { bwx: 8, bwy: 30 }, { bwx: 36, bwy: 36 },
  ], 1300);
  return () => stage.dispose();
};

export default mount;
