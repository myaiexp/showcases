// Bin maxbins: the bin transform picks a nice step so no more than maxbins bins cover the extent
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { gaussRows, rowsOf, tableMarks } from '../../shared/basic-kit.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 360,
    height: 190,
    padding: 5,
    signals: [{ name: 'maxbins', value: 10, bind: { input: 'range', min: 2, max: 40, step: 1 } }],
    data: [
      { name: 'samples', values: [...gaussRows(3, 140, 35, 12), ...gaussRows(4, 100, 70, 8)] },
      {
        name: 'hist',
        source: 'samples',
        transform: [
          // `signal` binds the chosen {start, stop, step} to `spec`, shown in the title.
          { type: 'bin', field: 'v', extent: [0, 100], maxbins: { signal: 'maxbins' }, signal: 'spec' },
          { type: 'aggregate', groupby: ['bin0', 'bin1'] },
          { type: 'collect', sort: { field: 'bin0' } },
        ],
      },
      rowsOf('rows', 'hist', 10),
    ],
    scales: [
      { name: 'x', type: 'linear', domain: [0, 100], range: 'width' },
      { name: 'y', type: 'linear', domain: { data: 'hist', field: 'count' }, nice: true, range: 'height' },
    ],
    axes: [
      { orient: 'bottom', scale: 'x', tickCount: 10 },
      { orient: 'left', scale: 'y', title: 'count' },
    ],
    title: { text: { signal: "'maxbins ' + maxbins + ' gives step ' + spec.step" }, color: '#ddd' },
    marks: [
      {
        type: 'rect',
        from: { data: 'hist' },
        encode: {
          update: {
            x: { scale: 'x', field: 'bin0', offset: 1 },
            x2: { scale: 'x', field: 'bin1' },
            y: { scale: 'y', field: 'count' },
            y2: { scale: 'y', value: 0 },
            fill: { value: 'steelblue' },
          },
        },
      },
      ...tableMarks('rows', [{ field: 'bin0', title: 'bin0' }, { field: 'bin1', title: 'bin1' }, { field: 'count' }], { top: 20 }),
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'maxbins', [4, 7, 10, 16, 25, 40, 20], 1300);
  return () => stage.dispose();
};

export default mount;
