// Aggregate drop: after an update, empty groups are removed (true) or kept at zero (false)
import type { Spec, Transforms } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle, normals, rng } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const rand = rng(21);
const gauss = normals(rand);
const scores = Array.from({ length: 160 }, () => ({ score: Math.min(99, Math.max(0, Math.round(50 + gauss() * 20))) }));

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const binned: Transforms[] = [
    { type: 'filter', expr: 'datum.score <= cutoff' },
    { type: 'bin', field: 'score', extent: [0, 100], step: 10, as: ['b0', 'b1'] },
  ];

  const spec: Spec = {
    width: 360,
    height: 190,
    padding: 5,
    signals: [{ name: 'cutoff', value: 99, bind: { input: 'range', min: 10, max: 99, step: 1 } }],
    data: [
      { name: 'scores', values: scores },
      // Same groups, two policies. Lowering the cutoff empties the top bins.
      { name: 'dropped', source: 'scores', transform: [...binned, { type: 'aggregate', groupby: ['b0', 'b1'], drop: true }] },
      { name: 'kept', source: 'scores', transform: [...binned, { type: 'aggregate', groupby: ['b0', 'b1'], drop: false }] },
    ],
    scales: [
      { name: 'x', type: 'linear', domain: [0, 100], range: 'width' },
      { name: 'y', type: 'linear', domain: [0, 50], range: 'height' },
    ],
    axes: [
      { orient: 'bottom', scale: 'x', values: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100], grid: false },
      { orient: 'left', scale: 'y' },
    ],
    title: {
      text: { signal: "'groups: drop true ' + length(data('dropped')) + ', drop false ' + length(data('kept'))" },
      color: '#ddd',
    },
    marks: [
      {
        // Kept groups: the empty ones show as outlined stubs on the axis.
        type: 'rect',
        from: { data: 'kept' },
        encode: {
          update: {
            x: { scale: 'x', field: 'b0', offset: 1 },
            x2: { scale: 'x', field: 'b1' },
            y: { scale: 'y', field: 'count' },
            y2: { scale: 'y', value: 0 },
            fill: { value: 'steelblue' },
            stroke: { value: '#8ab' },
          },
        },
      },
      {
        // Dropped groups: a dot on each bar that exists in the drop: true output.
        type: 'symbol',
        from: { data: 'dropped' },
        encode: {
          update: {
            x: { scale: 'x', signal: '(datum.b0 + datum.b1) / 2' },
            y: { scale: 'y', field: 'count', offset: -8 },
            fill: { value: 'orange' },
            size: { value: 40 },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'cutoff', [99, 60, 40, 25, 99, 70], 1400);
  return () => stage.dispose();
};

export default mount;
