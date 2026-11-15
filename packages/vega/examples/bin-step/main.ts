// Bin step: an exact bin width, which makes maxbins and the automatic choice irrelevant
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { gaussRows } from '../../shared/basic-kit.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420,
    height: 190,
    padding: 5,
    signals: [{ name: 'step', value: 10, bind: { input: 'select', options: [2, 4, 5, 8, 10, 15, 25] } }],
    data: [
      { name: 'samples', values: gaussRows(8, 220, 50, 20) },
      {
        name: 'hist',
        source: 'samples',
        transform: [
          // maxbins is set low on purpose: with `step` given it is ignored.
          { type: 'bin', field: 'v', extent: [0, 100], maxbins: 3, step: { signal: 'step' } },
          { type: 'aggregate', groupby: ['bin0', 'bin1'] },
        ],
      },
    ],
    scales: [
      { name: 'x', type: 'linear', domain: [0, 100], range: 'width' },
      { name: 'y', type: 'linear', domain: { data: 'hist', field: 'count' }, nice: true, range: 'height' },
    ],
    axes: [
      { orient: 'bottom', scale: 'x', tickCount: 10 },
      { orient: 'left', scale: 'y', title: 'count' },
    ],
    title: { text: { signal: "'step: ' + step + '  (' + length(data('hist')) + ' bins)'" }, color: '#ddd' },
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
            fill: { value: 'orange' },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'step', [2, 4, 5, 8, 10, 15, 25], 1200);
  return () => stage.dispose();
};

export default mount;
