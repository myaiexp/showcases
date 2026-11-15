// Bin signal, span, steps and minstep: the computed bin spec is bound to a signal other marks can read
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
    signals: [
      { name: 'maxbins', value: 12, bind: { input: 'range', min: 3, max: 30, step: 1 } },
      { name: 'minstep', value: 0, bind: { input: 'select', options: [0, 4, 10] } },
      // The step sizes bin may choose from; the default would also consider 1, 2, 5 and 10 multiples.
      { name: 'steps', value: [2.5, 5, 25] },
    ],
    data: [
      { name: 'samples', values: gaussRows(23, 200, 55, 20) },
      {
        name: 'hist',
        source: 'samples',
        transform: [
          {
            type: 'bin',
            field: 'v',
            extent: [0, 100],
            maxbins: { signal: 'maxbins' },
            minstep: { signal: 'minstep' },
            steps: { signal: 'steps' },
            signal: 'binSpec',
          },
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
    title: {
      text: { signal: "'binSpec: start ' + binSpec.start + ', stop ' + binSpec.stop + ', step ' + binSpec.step" },
      color: '#ddd',
    },
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
      {
        // A bracket drawn from the bound spec: it spans start to stop.
        type: 'rule',
        encode: {
          update: {
            x: { scale: 'x', signal: 'binSpec.start' },
            x2: { scale: 'x', signal: 'binSpec.stop' },
            y: { signal: 'height + 28' },
            stroke: { value: '#ddd' },
            strokeWidth: { value: 3 },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'maxbins', [6, 10, 14, 20, 28, 8], 1300);
  return () => stage.dispose();
};

export default mount;
