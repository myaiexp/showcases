// Bin nice: round the bin edges to friendly numbers, or start exactly at the extent minimum
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { gaussRows, rowsOf, tableMarks } from '../../shared/basic-kit.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 340,
    height: 190,
    padding: 5,
    signals: [{ name: 'nice', value: true, bind: { input: 'checkbox' } }],
    data: [
      // Values sit between 3.7 and 96.2, so the extent is not round.
      { name: 'samples', values: gaussRows(13, 160, 50, 22, 3.7, 96.2) },
      {
        name: 'hist',
        source: 'samples',
        transform: [
          { type: 'bin', field: 'v', extent: [3.7, 96.2], maxbins: 8, nice: { signal: 'nice' }, signal: 'spec' },
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
    title: { text: { signal: "'nice: ' + nice + ', start ' + format(spec.start, '.2f') + ', step ' + format(spec.step, '.3~g')" }, color: '#ddd' },
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
            fill: { value: 'seagreen' },
          },
        },
      },
      ...tableMarks('rows', [{ field: 'bin0', title: 'bin0', width: 56 }, { field: 'bin1', title: 'bin1', width: 56 }, { field: 'count' }], { top: 20 }),
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'nice', [false, true], 1800);
  return () => stage.dispose();
};

export default mount;
