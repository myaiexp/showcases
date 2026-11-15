// KDE with groupby: a density per group, each over its own extent or one shared extent
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { groupedRows } from '../../shared/basic-kit.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420,
    height: 190,
    padding: 5,
    signals: [{ name: 'resolve', value: 'independent', bind: { input: 'radio', options: ['independent', 'shared'] } }],
    data: [
      { name: 'obs', values: groupedRows(121, [['short', 20, 4], ['medium', 45, 8], ['tall', 75, 5]], 40) },
      {
        name: 'dens',
        source: 'obs',
        // Shared resolves every group to one domain and one set of steps, which makes them stackable.
        transform: [{ type: 'kde', field: 'v', groupby: ['g'], resolve: { signal: 'resolve' }, as: ['value', 'density'] }],
      },
    ],
    scales: [
      { name: 'x', type: 'linear', domain: [0, 100], range: 'width' },
      { name: 'y', type: 'linear', domain: { data: 'dens', field: 'density' }, zero: true, nice: true, range: 'height' },
      { name: 'color', type: 'ordinal', domain: ['short', 'medium', 'tall'], range: ['tomato', 'seagreen', 'dodgerblue'] },
    ],
    axes: [{ orient: 'bottom', scale: 'x' }, { orient: 'left', scale: 'y', title: 'density' }],
    legends: [{ fill: 'color', orient: 'top-right' }],
    title: { text: { signal: "'resolve: ' + resolve + ' (' + length(data('dens')) + ' samples in all)'" }, color: '#ddd' },
    marks: [
      {
        type: 'group',
        from: { facet: { name: 'one', data: 'dens', groupby: 'g' } },
        marks: [
          {
            type: 'area',
            from: { data: 'one' },
            encode: {
              update: {
                x: { scale: 'x', field: 'value' },
                y: { scale: 'y', field: 'density' },
                y2: { scale: 'y', value: 0 },
                fill: { scale: 'color', field: 'g' },
                fillOpacity: { value: 0.4 },
                stroke: { scale: 'color', field: 'g' },
              },
            },
          },
        ],
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'resolve', ['shared', 'independent'], 2000);
  return () => stage.dispose();
};

export default mount;
