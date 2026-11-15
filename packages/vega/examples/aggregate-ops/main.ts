// Aggregate fields, ops and as: the same field summarised by a switchable operation
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle, normals, rng } from '../../shared/cards.ts';
import { rowsOf, tableMarks } from '../../shared/basic-kit.ts';
import { createStage } from '../../shared/stage.ts';

const ops = ['min', 'q1', 'median', 'mean', 'q3', 'max', 'stdev', 'distinct', 'sum'];
const rand = rng(5);
const gauss = normals(rand);
const samples = ['north', 'south', 'east', 'west'].flatMap((site, i) =>
  Array.from({ length: 24 }, () => ({ site, reading: Math.round(40 + i * 8 + gauss() * 12) })),
);

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 320,
    height: 200,
    padding: 5,
    signals: [{ name: 'op', value: 'mean', bind: { input: 'select', options: ops } }],
    data: [
      { name: 'samples', values: samples },
      {
        name: 'stats',
        source: 'samples',
        // `ops` takes a signal, so one aggregate transform can compute any of the operations.
        transform: [{ type: 'aggregate', groupby: ['site'], fields: ['reading'], ops: [{ signal: 'op' }], as: ['stat'] }],
      },
      rowsOf('rows', 'stats'),
    ],
    scales: [
      { name: 'x', type: 'band', domain: { data: 'stats', field: 'site' }, range: 'width', padding: 0.15 },
      { name: 'y', type: 'linear', domain: { data: 'stats', field: 'stat' }, nice: true, zero: true, range: 'height' },
    ],
    axes: [
      { orient: 'bottom', scale: 'x' },
      { orient: 'left', scale: 'y' },
    ],
    title: { text: { signal: "op + '(reading) per site'" }, orient: 'top', color: '#ddd' },
    marks: [
      {
        type: 'rect',
        from: { data: 'stats' },
        encode: {
          update: {
            x: { scale: 'x', field: 'site' },
            width: { scale: 'x', band: 1 },
            y: { scale: 'y', field: 'stat' },
            y2: { scale: 'y', value: 0 },
            fill: { value: 'orange' },
          },
        },
      },
      ...tableMarks('rows', [{ field: 'site', width: 56 }, { field: 'stat' }]),
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'op', ops, 1200);
  return () => stage.dispose();
};

export default mount;
