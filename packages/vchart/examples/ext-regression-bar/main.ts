// appendBarRegressionLineConfig: a polynomial fit and its confidence interval over a bar chart
import type { Mount } from '@/types.ts';
import { appendBarRegressionLineConfig, registerRegressionLine } from '@visactor/vchart-extension';
import { mountLive } from '../../shared/live-spec.ts';
import { select, type ISpec } from '../../shared/chart.ts';

registerRegressionLine();

const BRANDS = ['Apple', 'Google', 'Amazon', 'Microsoft', 'Coca-Cola', 'Samsung', 'Toyota', 'Mercedes', 'Meta', 'McDonalds', 'Intel', 'IBM', 'BMW', 'Disney', 'Cisco', 'GE'];
const VALUES = [214, 155, 100, 92, 66, 59, 53, 48, 45, 43, 43, 42, 41, 39, 34, 32];

interface State {
  degree: number;
  band: boolean;
}

function build(s: State, preview: boolean): ISpec {
  const spec = {
    type: 'bar',
    animation: false,
    data: [{ id: 'bars', values: BRANDS.map((name, i) => ({ name, value: VALUES[i] as number })) }],
    xField: 'name',
    yField: 'value',
    axes: [{ orient: 'bottom', label: { visible: !preview, autoRotate: true } }],
    bar: { style: { fillOpacity: 0.5 } },
  } as unknown as ISpec;
  // The append* functions edit the spec they are given, so each build starts from a new one.
  appendBarRegressionLineConfig(spec, {
    degree: s.degree,
    color: '#f6bd16',
    line: { style: { lineWidth: 2 } },
    confidenceInterval: { visible: s.band, style: { fillOpacity: 0.2 } },
    label: { visible: !preview, text: `Degree ${s.degree} polynomial fit`, style: { fill: '#e6e8ee' } },
  });
  return spec;
}

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: { degree: 2, band: true },
    build,
    controls(bar, live) {
      select(bar, 'degree', ['1', '2', '3', '4'], (v) => live.set({ degree: Number(v) })).value = '2';
      select(bar, 'confidence interval', ['shown', 'hidden'], (v) => live.set({ band: v === 'shown' }));
    },
    step: (_, i) => ({ degree: (i % 4) + 1, band: i % 8 < 4 }),
    previewMs: 1600,
    mode: 'rebuild',
  });

export default mount;
