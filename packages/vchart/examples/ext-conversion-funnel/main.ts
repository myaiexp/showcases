// The conversionFunnel extension chart: rate arrows between layers and a background behind each layer
import type { Mount } from '@/types.ts';
import { registerConversionFunnelChart } from '@visactor/vchart-extension';
import { createChart, every, type ISpec } from '../../shared/chart.ts';

registerConversionFunnelChart();

const STAGES = ['Visit', 'Sign up', 'Activate', 'Subscribe'];
const frames = [
  [5200, 3100, 1900, 800],
  [4800, 3300, 1500, 900],
  [5600, 2900, 2100, 700],
].map((vals) => STAGES.map((stage, i) => ({ stage, value: vals[i] as number })));

const mount: Mount = (el, ctx) => {
  const spec = {
    type: 'conversionFunnel',
    data: [{ id: 'funnel', values: frames[0] }],
    categoryField: 'stage',
    valueField: 'value',
    isTransform: true,
    label: { visible: true },
    // Funnel layers behind the trapezoids (guide: funnelBackground).
    funnelBackground: { visible: true, style: { fill: '#8884', cornerRadius: 4 } },
    conversionArrow: {
      line: { style: { stroke: '#b7bdc9' } },
      symbol: { style: { fill: '#b7bdc9' } },
      arrows: [
        { from: 0, to: 1, position: 'right' },
        { from: 1, to: 2, position: 'right' },
        { from: 2, to: 3, position: 'right' },
        { from: 0, to: 3, position: 'left', text: 'overall' },
      ],
      text: {
        // Each arrow's text is the share of the first layer's value that reaches the second.
        formatMethod: (text: string, params?: { from: { value: number }; to: { value: number } }) =>
          params ? `${text ? `${text} ` : ''}${((params.to.value / params.from.value) * 100).toFixed(1)}%` : text,
        style: { fill: '#fff' },
      },
    },
    legends: { visible: false },
  } as unknown as ISpec;
  const { vchart, release } = createChart(el, ctx, spec, { previewHeight: 200 });

  let i = 0;
  const stop = every(2200, () => {
    i += 1;
    void vchart.updateData('funnel', frames[i % frames.length] as { stage: string; value: number }[]);
  });
  return () => {
    stop();
    release();
  };
};

export default mount;
