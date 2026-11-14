// appendHistogramRegressionLineConfig: KDE and ECDF curves over a binned histogram
import type { Mount } from '@/types.ts';
import { appendHistogramRegressionLineConfig, registerRegressionLine } from '@visactor/vchart-extension';
import { mountLive } from '../../shared/live-spec.ts';
import { select, type ISpec } from '../../shared/chart.ts';
import { samples } from '../../shared/ext-data.ts';

registerRegressionLine();

interface State {
  seed: number;
  step: number;
  curves: 'kde + ecdf' | 'kde' | 'ecdf';
}

function build(s: State, preview: boolean): ISpec {
  const spec = {
    type: 'histogram',
    animation: false,
    // The bin transform's outputNames must be x0, x1 and a count: the regression reads them.
    data: [
      {
        name: 'samples',
        transforms: [{ type: 'bin', options: { step: s.step, field: 'value', outputNames: { x0: 'x0', x1: 'x1', count: 'frequency' } } }],
        values: samples(preview ? 120 : 200, 5, 3, s.seed),
      },
    ],
    xField: 'x0',
    x2Field: 'x1',
    yField: 'frequency',
    bar: { style: { stroke: '#222', lineWidth: 1, fillOpacity: 0.7 } },
  } as unknown as ISpec;
  const curves = [
    { type: 'kde', color: '#f6bd16', line: { style: { stroke: '#f6bd16', lineWidth: 2 } }, label: { visible: !preview, text: 'KDE', style: { fill: '#f6bd16' } } },
    { type: 'ecdf', color: '#5ad8a6', line: { style: { stroke: '#5ad8a6', lineWidth: 2 } }, label: { visible: !preview, text: 'ECDF', style: { fill: '#5ad8a6' } } },
  ].filter((c) => s.curves === 'kde + ecdf' || c.type === s.curves);
  appendHistogramRegressionLineConfig(spec, curves as Parameters<typeof appendHistogramRegressionLineConfig>[1]);
  return spec;
}

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: { seed: 9, step: 2, curves: 'kde + ecdf' },
    build,
    controls(bar, live) {
      select(bar, 'curves', ['kde + ecdf', 'kde', 'ecdf'], (v) => live.set({ curves: v as State['curves'] }));
      select(bar, 'bin step', ['1', '2', '3'], (v) => live.set({ step: Number(v) })).value = '2';
      select(bar, 'sample', ['1', '2', '3'], (v) => live.set({ seed: Number(v) * 7 }));
    },
    step: (_, i) => ({ seed: 9 + (i % 3) * 5, curves: (['kde + ecdf', 'kde', 'ecdf'] as const)[i % 3] as State['curves'] }),
    previewMs: 1800,
    mode: 'rebuild',
  });

export default mount;
