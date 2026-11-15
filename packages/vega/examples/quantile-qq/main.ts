// Quantile: compare two samples by their quantiles in a quantile-quantile plot
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle, rng } from '../../shared/cards.ts';
import { groupedRows } from '../../shared/basic-kit.ts';
import { createStage } from '../../shared/stage.ts';

const rand = rng(211);
// Sample b is skewed right, so its upper quantiles outrun sample a's.
const skewed = Array.from({ length: 80 }, () => ({ g: 'b', v: Math.round((12 - Math.log(1 - rand()) * 22) * 10) / 10 }));
const values = [...groupedRows(212, [['a', 40, 14]], 80), ...skewed];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 260,
    height: 260,
    padding: 5,
    signals: [{ name: 'step', value: 0.05, bind: { input: 'select', options: [0.2, 0.1, 0.05, 0.02, 0.01] } }],
    data: [
      { name: 'samples', values },
      {
        name: 'pairs',
        source: 'samples',
        // One row per (group, prob); pivoting on the group puts both samples' quantiles in one row.
        transform: [
          { type: 'quantile', field: 'v', groupby: ['g'], step: { signal: 'step' }, as: ['prob', 'q'] },
          { type: 'pivot', groupby: ['prob'], field: 'g', value: 'q' },
        ],
      },
    ],
    scales: [
      { name: 'x', type: 'linear', domain: [0, 140], range: 'width' },
      { name: 'y', type: 'linear', domain: [0, 140], range: 'height' },
    ],
    axes: [
      { orient: 'bottom', scale: 'x', title: 'sample a quantiles', grid: true },
      { orient: 'left', scale: 'y', title: 'sample b quantiles', grid: true },
    ],
    title: { text: { signal: "'step ' + step + ': ' + length(data('pairs')) + ' quantile pairs'" }, color: '#ddd' },
    marks: [
      {
        // y = x: where the two samples have identical quantiles.
        type: 'rule',
        encode: {
          update: {
            x: { value: 0 },
            y: { signal: 'height' },
            x2: { signal: 'width' },
            y2: { value: 0 },
            stroke: { value: '#667' },
            strokeDash: { value: [4, 4] },
          },
        },
      },
      {
        type: 'symbol',
        from: { data: 'pairs' },
        encode: {
          update: {
            x: { scale: 'x', field: 'a' },
            y: { scale: 'y', field: 'b' },
            fill: { value: 'orange' },
            size: { value: 40 },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'step', [0.2, 0.1, 0.05, 0.02, 0.01, 0.05], 1400);
  return () => stage.dispose();
};

export default mount;
