// Conversion funnel arrows: position, distance, margin and text margin as live settings
import type { Mount } from '@/types.ts';
import { registerConversionFunnelChart } from '@visactor/vchart-extension';
import { mountLive } from '../../shared/live-spec.ts';
import { select, slider, type ISpec } from '../../shared/chart.ts';

registerConversionFunnelChart();

const data = [
  { stage: 'Impression', value: 9000 },
  { stage: 'Click', value: 4200 },
  { stage: 'Cart', value: 1800 },
  { stage: 'Order', value: 640 },
];

interface State {
  position: 'left' | 'right';
  distance: number;
  margin: number;
  textMargin: number;
  color: string;
}

function build(s: State): ISpec {
  return {
    type: 'conversionFunnel',
    data: [{ id: 'f', values: data }],
    categoryField: 'stage',
    valueField: 'value',
    isTransform: true,
    funnelBackground: { visible: true, style: { fill: '#8883' } },
    legends: { visible: false },
    conversionArrow: {
      margin: s.margin,
      arrows: [
        { from: 0, to: 1, position: s.position, distance: s.distance },
        { from: 1, to: 2, position: s.position, distance: s.distance },
        { from: 2, to: 3, position: s.position, distance: s.distance },
      ],
      line: { style: { stroke: s.color } },
      symbol: { style: { fill: s.color } },
      text: {
        textMargin: s.textMargin,
        formatMethod: (_: string, p?: { from: { value: number }; to: { value: number } }) =>
          p ? `${((p.to.value / p.from.value) * 100).toFixed(0)}%` : '',
        style: { fill: s.color },
      },
    },
  } as unknown as ISpec;
}

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: { position: 'right', distance: 0, margin: 12, textMargin: 4, color: '#f6bd16' },
    build: (s) => build(s),
    controls(bar, live) {
      select(bar, 'position', ['right', 'left'], (v) => live.set({ position: v as State['position'] }));
      slider(bar, 'distance', [0, 60, 2], 0, (v) => live.set({ distance: v }));
      slider(bar, 'margin', [0, 40, 2], 12, (v) => live.set({ margin: v }));
      slider(bar, 'textMargin', [0, 24, 1], 4, (v) => live.set({ textMargin: v }));
    },
    step: (s, i) => ({
      position: i % 2 ? 'left' : 'right',
      distance: [0, 24, 48][i % 3] as number,
      margin: 12,
      color: ['#f6bd16', '#5ad8a6', '#e8684a'][i % 3] as string,
    }),
    previewMs: 1800,
    mode: 'rebuild',
  });

export default mount;
