// kde2d groupby and weight: one density per group, and points that count for more
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle, cycleSteps } from '../../shared/cards.ts';
import { cloud } from '../../shared/geo-kit.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  // Two groups of 300 points. Every B point has weight 5, so a weighted density favours B.
  const points = cloud(21, [
    { cx: 140, cy: 125, sx: 40, sy: 32, n: 300, group: 'A', weight: 1 },
    { cx: 300, cy: 125, sx: 40, sy: 32, n: 300, group: 'B', weight: 5 },
  ]);

  const spec: Spec = {
    width: 440,
    height: 250,
    autosize: 'none',
    padding: 5,
    signals: [
      { name: 'weighted', value: false, bind: { input: 'checkbox' } },
    ],
    data: [
      { name: 'points', values: points },
      // Without weight each point counts once; with it, each counts its weight field.
      {
        name: 'plain',
        source: 'points',
        transform: [
          { type: 'kde2d', groupby: ['group'], size: [{ signal: 'width' }, { signal: 'height' }], x: 'x', y: 'y', bandwidth: [12, 12], counts: true, as: 'grid' },
          { type: 'isocontour', field: 'grid', thresholds: [0.005, 0.01, 0.02] },
        ],
      },
      {
        name: 'weight',
        source: 'points',
        transform: [
          { type: 'kde2d', groupby: ['group'], size: [{ signal: 'width' }, { signal: 'height' }], x: 'x', y: 'y', weight: 'weight', bandwidth: [12, 12], counts: true, as: 'grid' },
          { type: 'isocontour', field: 'grid', thresholds: [0.005, 0.01, 0.02] },
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
        from: { data: 'plain' },
        encode: { update: { fill: { value: null }, stroke: { scale: 'group', field: 'group' }, strokeWidth: { value: 1.2 }, strokeOpacity: { signal: 'weighted ? 0.25 : 1' }, strokeDash: { value: [4, 3] } } },
        transform: [{ type: 'geoshape', field: 'datum.contour' }],
      },
      {
        type: 'shape',
        from: { data: 'weight' },
        encode: { update: { fill: { scale: 'group', field: 'group' }, fillOpacity: { value: 0.2 }, stroke: { scale: 'group', field: 'group' }, strokeWidth: { value: 1.2 }, opacity: { signal: 'weighted ? 1 : 0' } } },
        transform: [{ type: 'geoshape', field: 'datum.contour' }],
      },
      {
        type: 'text',
        encode: { update: { x: { value: 4 }, y: { value: 14 }, fill: { value: '#f0b060' }, fontSize: { value: 13 }, text: { signal: "weighted ? 'weight: B counts five times' : 'no weight: both groups alike'" } } },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'weighted', [false, true], 1800);
  return () => stage.dispose();
};

export default mount;
