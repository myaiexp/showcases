// Statistical functions: 400 sampleNormal draws binned into a histogram under the density curve
import type { Spec, View } from 'vega';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const N = 400;
const STEP = 0.4;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420,
    height: 220,
    padding: 8,
    signals: [
      { name: 'mean', value: 0, bind: { input: 'range', min: -2, max: 2, step: 0.25 } },
      { name: 'sd', value: 1, bind: { input: 'range', min: 0.5, max: 2, step: 0.1 } },
      // A draw has no input to depend on, so the formula reads this counter to run again.
      { name: 'redraw', value: 0 },
    ],
    data: [
      {
        name: 'draws',
        transform: [
          { type: 'sequence', start: 0, stop: N, as: 'i' },
          { type: 'formula', as: 'v', expr: 'sampleNormal(mean + 0 * redraw, sd)' },
          { type: 'bin', field: 'v', extent: [-6, 6], step: STEP, nice: false, as: ['b0', 'b1'] },
        ],
      },
      { name: 'hist', source: 'draws', transform: [{ type: 'aggregate', groupby: ['b0', 'b1'] }] },
      {
        name: 'curve',
        transform: [
          { type: 'sequence', start: -6, stop: 6.05, step: 0.05, as: 'x' },
          // Expected count per bin: density * bin width * number of draws.
          { type: 'formula', as: 'expected', expr: `densityNormal(datum.x, mean, sd) * ${STEP} * ${N}` },
        ],
      },
    ],
    scales: [
      { name: 'x', type: 'linear', domain: [-6, 6], range: 'width' },
      { name: 'y', type: 'linear', domain: [0, 100], range: 'height', clamp: true },
    ],
    axes: [
      { orient: 'bottom', scale: 'x' },
      { orient: 'left', scale: 'y', grid: true, gridOpacity: 0.15, title: 'draws per bin' },
    ],
    marks: [
      {
        type: 'rect',
        from: { data: 'hist' },
        encode: {
          update: {
            x: { scale: 'x', field: 'b0' },
            x2: { scale: 'x', field: 'b1', offset: -1 },
            y: { scale: 'y', field: 'count' },
            y2: { scale: 'y', value: 0 },
            fill: { value: 'steelblue' },
          },
        },
      },
      {
        type: 'line',
        from: { data: 'curve' },
        encode: { update: { x: { scale: 'x', field: 'x' }, y: { scale: 'y', field: 'expected' }, stroke: { value: 'orange' }, strokeWidth: { value: 2 } } },
      },
      {
        type: 'text',
        encode: {
          enter: { x: { signal: 'width', offset: -4 }, y: { value: 6 }, align: { value: 'right' }, fill: { value: '#ddd' }, fontSize: { value: 11 } },
          update: { text: { signal: "'sampleNormal(' + mean + ', ' + sd + ') x ' + length(data('draws'))" } },
        },
      },
    ],
  };

  const view: View = await stage.render(spec);
  const redraw = (): void => {
    view.signal('redraw', (view.signal('redraw') as number) + 1);
    void view.runAsync();
  };
  if (stage.preview) stage.every(1300, redraw);
  else if (stage.bar) button(stage.bar, 'Draw again', redraw);
  return () => stage.dispose();
};

export default mount;
