// Joinaggregate: write group statistics back onto every row, then compare each row to its group
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle, rng } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const ops = ['mean', 'median', 'min', 'max', 'q1', 'q3'];
const rand = rng(151);
const teams = ['red', 'green', 'blue'];
const rows = teams.flatMap((team, t) =>
  Array.from({ length: 7 }, (_, i) => ({ team, id: `${team[0]}${i + 1}`, score: Math.round(30 + t * 12 + rand() * 45) })),
);

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420,
    height: 190,
    padding: 5,
    signals: [{ name: 'op', value: 'mean', bind: { input: 'select', options: ops } }],
    data: [
      { name: 'rows', values: rows },
      {
        name: 'scored',
        source: 'rows',
        // Unlike aggregate, every input row survives and gains `ref` (the group's statistic).
        transform: [
          { type: 'joinaggregate', groupby: ['team'], fields: ['score'], ops: [{ signal: 'op' }], as: ['ref'] },
          { type: 'formula', as: 'diff', expr: 'datum.score - datum.ref' },
        ],
      },
    ],
    scales: [
      { name: 'x', type: 'band', domain: { data: 'scored', field: 'id' }, range: 'width', padding: 0.2 },
      { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
      { name: 'sign', type: 'threshold', domain: [0], range: ['tomato', 'seagreen'] },
    ],
    axes: [{ orient: 'bottom', scale: 'x', labelAngle: -90, labelAlign: 'right', labelBaseline: 'middle' }, { orient: 'left', scale: 'y' }],
    legends: [{ fill: 'sign', orient: 'top-right', title: 'vs group', symbolType: 'square', encode: { labels: { update: { text: { signal: "datum.index == 0 ? 'below' : 'at or above'" } } } } }],
    title: { text: { signal: "'score against each team\\'s ' + op" }, color: '#ddd' },
    marks: [
      {
        type: 'rect',
        from: { data: 'scored' },
        encode: {
          update: {
            x: { scale: 'x', field: 'id' },
            width: { scale: 'x', band: 1 },
            y: { scale: 'y', field: 'score' },
            y2: { scale: 'y', value: 0 },
            fill: { scale: 'sign', field: 'diff' },
          },
        },
      },
      {
        type: 'rect',
        from: { data: 'scored' },
        encode: {
          update: {
            x: { scale: 'x', field: 'id', offset: -2 },
            width: { signal: "bandwidth('x') + 4" },
            y: { scale: 'y', field: 'ref', offset: -1 },
            height: { value: 2 },
            fill: { value: '#eee' },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'op', ops, 1500);
  return () => stage.dispose();
};

export default mount;
