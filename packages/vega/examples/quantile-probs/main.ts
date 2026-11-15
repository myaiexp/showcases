// Quantile probs: ask for exact probabilities and read the quantile values off the data
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { gaussRows } from '../../shared/basic-kit.ts';
import { createStage } from '../../shared/stage.ts';

const sets: Record<string, number[]> = {
  quartiles: [0.25, 0.5, 0.75],
  'tails 5/95': [0.05, 0.5, 0.95],
  deciles: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9],
  median: [0.5],
};

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420,
    height: 130,
    padding: 5,
    signals: [
      { name: 'which', value: 'quartiles', bind: { input: 'select', options: Object.keys(sets) } },
      { name: 'probs', update: 'which == "quartiles" ? [0.25, 0.5, 0.75] : which == "median" ? [0.5] : which == "deciles" ? [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9] : [0.05, 0.5, 0.95]' },
    ],
    data: [
      { name: 'obs', values: [...gaussRows(221, 70, 38, 12), ...gaussRows(222, 40, 68, 9)] },
      {
        name: 'cuts',
        source: 'obs',
        transform: [{ type: 'quantile', field: 'v', probs: { signal: 'probs' }, as: ['p', 'at'] }],
      },
    ],
    scales: [
      { name: 'x', type: 'linear', domain: [0, 100], range: 'width' },
      { name: 'jitter', type: 'linear', domain: [0, 1], range: [0, 90] },
    ],
    axes: [{ orient: 'bottom', scale: 'x' }],
    marks: [
      {
        type: 'symbol',
        from: { data: 'obs' },
        encode: {
          update: {
            x: { scale: 'x', field: 'v' },
            y: { signal: '20 + 60 * (1 + sin(datum.v * 37)) / 2' },
            fill: { value: '#789' },
            fillOpacity: { value: 0.7 },
            size: { value: 26 },
          },
        },
      },
      {
        type: 'rule',
        from: { data: 'cuts' },
        encode: {
          update: {
            x: { scale: 'x', field: 'at' },
            y: { value: 0 },
            y2: { signal: 'height' },
            stroke: { value: 'orange' },
            strokeWidth: { value: 2 },
          },
        },
      },
      {
        type: 'text',
        from: { data: 'cuts' },
        encode: {
          update: {
            x: { scale: 'x', field: 'at' },
            y: { value: -4 },
            text: { signal: "'p' + round(datum.p * 100)" },
            align: { value: 'center' },
            fill: { value: 'orange' },
            fontSize: { value: 10 },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'which', Object.keys(sets), 1700);
  return () => stage.dispose();
};

export default mount;
