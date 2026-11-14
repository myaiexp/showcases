// appendScatterRegressionLineConfig: linear, logistic, lowess and polynomial fits through scatter points
import type { Mount } from '@/types.ts';
import { appendScatterRegressionLineConfig, registerRegressionLine } from '@visactor/vchart-extension';
import { mountLive } from '../../shared/live-spec.ts';
import { select, slider, type ISpec } from '../../shared/chart.ts';
import { noisyCurve } from '../../shared/ext-data.ts';

registerRegressionLine();

type Kind = 'linear' | 'logisitc' | 'lowess' | 'polynomial';
interface State {
  kind: Kind;
  degree: number;
}

const points = noisyCurve(60, 4);

function build(s: State, preview: boolean): ISpec {
  const spec = {
    type: 'common',
    animation: false,
    series: [{ type: 'scatter', xField: 'x', yField: 'y', point: { style: { fill: '#5b9bff', fillOpacity: 0.7, size: 8 } } }],
    axes: [
      { orient: 'left', type: 'linear', range: { min: 0 } },
      { orient: 'bottom', type: 'linear' },
    ],
    data: [{ id: 'pts', values: points }],
  } as unknown as ISpec;
  appendScatterRegressionLineConfig(spec, [
    {
      // 'logisitc' is spelled this way in the guide's type definition.
      type: s.kind,
      polynomialDegree: s.degree,
      color: '#f6bd16',
      line: { style: { lineWidth: 2 } },
      confidenceInterval: { style: { fillOpacity: 0.2 } },
      label: { visible: !preview, text: s.kind === 'polynomial' ? `Polynomial, degree ${s.degree}` : `${s.kind} regression`, style: { fill: '#e6e8ee' } },
    },
  ] as unknown as Parameters<typeof appendScatterRegressionLineConfig>[1]);
  return spec;
}

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: { kind: 'linear', degree: 2 },
    build,
    controls(bar, live) {
      select(bar, 'type', ['linear', 'polynomial', 'lowess', 'logisitc'], (v) => live.set({ kind: v as Kind }));
      slider(bar, 'polynomialDegree', [1, 5, 1], 2, (v) => live.set({ degree: v }));
    },
    step: (_, i) => ({ kind: (['linear', 'polynomial', 'lowess', 'polynomial'] as const)[i % 4] as Kind, degree: i % 4 === 3 ? 3 : 2 }),
    previewMs: 1800,
    mode: 'rebuild',
  });

export default mount;
