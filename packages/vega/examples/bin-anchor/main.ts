// Bin anchor: shift the bin boundaries so that one of them lines up with a chosen value
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
    signals: [{ name: 'anchor', value: 0, bind: { input: 'range', min: 0, max: 20, step: 1 } }],
    data: [
      { name: 'samples', values: gaussRows(17, 220, 50, 18) },
      {
        name: 'hist',
        source: 'samples',
        transform: [
          { type: 'bin', field: 'v', extent: [0, 100], step: 20, anchor: { signal: 'anchor' } },
          { type: 'aggregate', groupby: ['bin0', 'bin1'] },
        ],
      },
    ],
    scales: [
      { name: 'x', type: 'linear', domain: [-20, 120], range: 'width' },
      { name: 'y', type: 'linear', domain: { data: 'hist', field: 'count' }, nice: true, range: 'height' },
    ],
    axes: [
      { orient: 'bottom', scale: 'x', values: [0, 20, 40, 60, 80, 100], grid: true },
      { orient: 'left', scale: 'y', title: 'count' },
    ],
    title: { text: { signal: "'anchor ' + anchor + ': bin edges at ' + anchor + ' + 20k'" }, color: '#ddd' },
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
            fillOpacity: { value: 0.85 },
          },
        },
      },
      {
        type: 'rule',
        encode: {
          update: {
            x: { scale: 'x', signal: 'anchor' },
            y: { value: 0 },
            y2: { signal: 'height' },
            stroke: { value: 'orange' },
            strokeDash: { value: [4, 3] },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'anchor', [0, 5, 10, 15, 8, 3], 1200);
  return () => stage.dispose();
};

export default mount;
