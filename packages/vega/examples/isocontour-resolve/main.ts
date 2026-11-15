// isocontour resolve: levels chosen per grid or one shared set for two groups
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle, cycleSteps } from '../../shared/cards.ts';
import { cloud } from '../../shared/geo-kit.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  // Group A has four times as many points as group B, so its density peaks are higher.
  const points = cloud(11, [
    { cx: 120, cy: 125, sx: 38, sy: 30, n: 800, group: 'A' },
    { cx: 320, cy: 125, sx: 38, sy: 30, n: 200, group: 'B' },
  ]);

  const spec: Spec = {
    width: 440,
    height: 250,
    autosize: 'none',
    padding: 5,
    signals: [
      { name: 'resolve', value: 'independent', bind: { input: 'radio', options: ['independent', 'shared'] } },
    ],
    data: [
      { name: 'points', values: points },
      {
        name: 'contours',
        source: 'points',
        transform: [
          // One grid per group ...
          { type: 'kde2d', groupby: ['group'], size: [{ signal: 'width' }, { signal: 'height' }], x: 'x', y: 'y', bandwidth: [12, 12], as: 'grid' },
          // ... independent cuts each grid at its own levels; shared cuts every grid at the
          // same levels, so the sparser group B gets fewer.
          { type: 'isocontour', field: 'grid', levels: 6, resolve: { signal: 'resolve' } },
        ],
      },
    ],
    scales: [
      { name: 'group', type: 'ordinal', domain: ['A', 'B'], range: ['#4c9fe0', '#f0a040'] },
    ],
    marks: [
      {
        type: 'symbol',
        from: { data: 'points' },
        encode: { update: { x: { field: 'x' }, y: { field: 'y' }, size: { value: 8 }, fill: { value: '#ffffff' }, fillOpacity: { value: 0.3 } } },
      },
      {
        type: 'shape',
        from: { data: 'contours' },
        encode: { update: { fill: { scale: 'group', field: 'group' }, fillOpacity: { value: 0.2 }, stroke: { scale: 'group', field: 'group' }, strokeWidth: { value: 1.2 } } },
        transform: [{ type: 'geoshape', field: 'datum.contour' }],
      },
      {
        type: 'text',
        encode: { update: { x: { value: 4 }, y: { value: 14 }, fill: { value: '#f0b060' }, fontSize: { value: 13 }, text: { signal: "'resolve: ' + resolve" } } },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'resolve', ['independent', 'shared'], 1800);
  return () => stage.dispose();
};

export default mount;
