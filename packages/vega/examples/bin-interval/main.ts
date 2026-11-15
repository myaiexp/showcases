// Bin interval and as: write only the start edge, or both edges, to custom output fields
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle, rng } from '../../shared/cards.ts';
import { gaussRows, rowsOf, tableMarks } from '../../shared/basic-kit.ts';
import { createStage } from '../../shared/stage.ts';

const jitter = rng(31);
const points = gaussRows(29, 36, 50, 22).map((d) => ({ ...d, row: Math.floor(jitter() * 5) }));

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 320,
    height: 170,
    padding: 5,
    signals: [{ name: 'interval', value: true, bind: { input: 'checkbox' } }],
    data: [
      { name: 'points', values: points },
      {
        name: 'binned',
        source: 'points',
        // as renames the outputs; with interval false only `lo` is written.
        transform: [
          { type: 'bin', field: 'v', extent: [0, 100], step: 20, interval: { signal: 'interval' }, as: ['lo', 'hi'] },
        ],
      },
      rowsOf('rows', 'binned', 9),
    ],
    scales: [
      { name: 'x', type: 'linear', domain: [0, 100], range: 'width' },
      { name: 'y', type: 'point', domain: [0, 1, 2, 3, 4], range: 'height', padding: 0.5 },
      { name: 'color', type: 'ordinal', domain: [0, 20, 40, 60, 80], range: { scheme: 'category10' } },
    ],
    axes: [{ orient: 'bottom', scale: 'x', values: [0, 20, 40, 60, 80, 100], grid: true }],
    marks: [
      {
        // Dots are coloured by the bin start; the band behind each is drawn only when `hi` exists.
        type: 'rect',
        from: { data: 'binned' },
        encode: {
          update: {
            x: { scale: 'x', field: 'lo' },
            x2: { scale: 'x', field: 'hi' },
            y: { scale: 'y', field: 'row', offset: -12 },
            height: { value: 24 },
            fill: { scale: 'color', field: 'lo' },
            fillOpacity: { signal: 'interval ? 0.18 : 0' },
          },
        },
      },
      {
        type: 'symbol',
        from: { data: 'binned' },
        encode: {
          update: {
            x: { scale: 'x', field: 'v' },
            y: { scale: 'y', field: 'row' },
            fill: { scale: 'color', field: 'lo' },
            size: { value: 60 },
          },
        },
      },
      ...tableMarks('rows', [{ field: 'v', title: 'v', width: 44 }, { field: 'lo', width: 44 }, { field: 'hi' }]),
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'interval', [false, true], 1800);
  return () => stage.dispose();
};

export default mount;
