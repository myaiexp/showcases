// Statistical functions: sampleLogNormal and sampleUniform histograms under their density curves
import type { Spec, View } from 'vega';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const N = 500;
const STEP = 0.25;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420,
    height: 220,
    padding: 8,
    signals: [
      { name: 'mu', value: 0.8, bind: { input: 'range', min: 0, max: 1.5, step: 0.1 } },
      { name: 'sigma', value: 0.5, bind: { input: 'range', min: 0.2, max: 0.9, step: 0.1 } },
      { name: 'lo', value: 2, bind: { input: 'range', min: 0, max: 5, step: 0.5 } },
      { name: 'hi', value: 6, bind: { input: 'range', min: 5.5, max: 10, step: 0.5 } },
      { name: 'redraw', value: 0 },
    ],
    data: [
      {
        name: 'draws',
        transform: [
          { type: 'sequence', start: 0, stop: N, as: 'i' },
          { type: 'formula', as: 'ln', expr: 'sampleLogNormal(mu + 0 * redraw, sigma)' },
          { type: 'formula', as: 'un', expr: 'sampleUniform(lo + 0 * redraw, hi)' },
          { type: 'bin', field: 'ln', extent: [0, 10], step: STEP, nice: false, as: ['l0', 'l1'] },
          { type: 'bin', field: 'un', extent: [0, 10], step: STEP, nice: false, as: ['u0', 'u1'] },
        ],
      },
      { name: 'logHist', source: 'draws', transform: [{ type: 'aggregate', groupby: ['l0', 'l1'] }] },
      { name: 'uniHist', source: 'draws', transform: [{ type: 'aggregate', groupby: ['u0', 'u1'] }] },
      {
        name: 'curve',
        transform: [
          { type: 'sequence', start: 0.02, stop: 10.02, step: 0.04, as: 'x' },
          { type: 'formula', as: 'ln', expr: `densityLogNormal(datum.x, mu, sigma) * ${STEP} * ${N}` },
          { type: 'formula', as: 'un', expr: `densityUniform(datum.x, lo, hi) * ${STEP} * ${N}` },
        ],
      },
    ],
    scales: [
      { name: 'x', type: 'linear', domain: [0, 10], range: 'width' },
      { name: 'y', type: 'linear', domain: [0, 80], range: 'height', clamp: true },
    ],
    axes: [
      { orient: 'bottom', scale: 'x' },
      { orient: 'left', scale: 'y', grid: true, gridOpacity: 0.15 },
    ],
    marks: [
      ...(
        [
          ['logHist', 'l0', 'l1', 'steelblue'],
          ['uniHist', 'u0', 'u1', 'orange'],
        ] as const
      ).map(([data, a, b, fill]) => ({
        type: 'rect' as const,
        from: { data },
        encode: {
          update: {
            x: { scale: 'x', field: a },
            x2: { scale: 'x', field: b, offset: -1 },
            y: { scale: 'y', field: 'count' },
            y2: { scale: 'y', value: 0 },
            fill: { value: fill },
            fillOpacity: { value: 0.55 },
          },
        },
      })),
      ...(
        [
          ['ln', '#8fb8de', 'densityLogNormal(x, mu, sigma)'],
          ['un', '#ffcf87', 'densityUniform(x, lo, hi)'],
        ] as const
      ).flatMap(([f, color, label], i) => [
        {
          type: 'line' as const,
          from: { data: 'curve' },
          encode: { update: { x: { scale: 'x', field: 'x' }, y: { scale: 'y', field: f }, stroke: { value: color }, strokeWidth: { value: 2 } } },
        },
        {
          type: 'text' as const,
          encode: {
            enter: {
              x: { signal: 'width', offset: -4 },
              y: { value: 6 + i * 14 },
              align: { value: 'right' as const },
              text: { value: label },
              fill: { value: color },
              fontSize: { value: 11 },
              font: { value: 'ui-monospace, monospace' },
            },
          },
        },
      ]),
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
