// KDE counts and cumulative: probabilities or smoothed counts, density or running total
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { groupedRows } from '../../shared/basic-kit.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420,
    height: 190,
    padding: 5,
    signals: [
      { name: 'counts', value: false, bind: { input: 'checkbox' } },
      { name: 'cumulative', value: false, bind: { input: 'checkbox' } },
    ],
    data: [
      { name: 'obs', values: groupedRows(131, [['a', 30, 8], ['b', 66, 6]], 30) },
      {
        name: 'dens',
        source: 'obs',
        // Fixed extent and steps, so all four modes are sampled at the same points.
        transform: [
          {
            type: 'kde',
            field: 'v',
            counts: { signal: 'counts' },
            cumulative: { signal: 'cumulative' },
            extent: [0, 100],
            steps: 120,
          },
        ],
      },
    ],
    scales: [
      { name: 'x', type: 'linear', domain: [0, 100], range: 'width' },
      { name: 'y', type: 'linear', domain: { data: 'dens', field: 'density' }, zero: true, nice: true, range: 'height' },
    ],
    axes: [{ orient: 'bottom', scale: 'x' }, { orient: 'left', scale: 'y', title: 'density' }],
    title: {
      text: { signal: "(counts ? 'smoothed counts' : 'probabilities') + (cumulative ? ', cumulative' : '')" },
      color: '#ddd',
    },
    marks: [
      {
        type: 'area',
        from: { data: 'dens' },
        encode: {
          update: {
            x: { scale: 'x', field: 'value' },
            y: { scale: 'y', field: 'density' },
            y2: { scale: 'y', value: 0 },
            fill: { value: 'steelblue' },
            fillOpacity: { value: 0.55 },
            stroke: { value: '#9cf' },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  if (stage.preview) {
    const modes: [boolean, boolean][] = [[false, false], [true, false], [true, true], [false, true]];
    stage.every(1700, async (i) => {
      const [c, u] = modes[i % modes.length]!;
      view.signal('counts', c).signal('cumulative', u);
      await view.runAsync();
    });
  }
  return () => stage.dispose();
};

export default mount;
