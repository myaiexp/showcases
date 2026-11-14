// Gauge with coloured segments: a gauge series for the bands plus a gaugePointer series, in a common chart
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, every } from '../../shared/chart.ts';
import { rng } from '../../shared/polar-data.ts';

// Each band runs from the start of the dial to its end value, and the longest is drawn first, so the
// shorter ones sit on top of it and only their remainders show.
const BANDS = [
  { type: 'high', value: 100 },
  { type: 'normal', value: 75 },
  { type: 'low', value: 40 },
];
const START = -210;
const END = 30;

const mount: Mount = (el, ctx) => {
  const spec = {
    type: 'common',
    data: [
      { id: 'bands', values: BANDS },
      { id: 'reading', values: [{ type: 'reading', value: 62, length: 100 }] },
    ],
    startAngle: START,
    endAngle: END,
    color: ['#e8564f', '#ffc04d', '#3fbf7f'],
    series: [
      {
        type: 'gauge',
        dataIndex: 0,
        valueField: 'value',
        seriesField: 'type',
        outerRadius: 0.85,
        innerRadius: 0.65,
        padAngle: 1.5,
        segment: { style: { cornerRadius: 4 } },
        animationAppear: false,
      },
      {
        type: 'gaugePointer',
        dataIndex: 1,
        radiusField: 'length',
        valueField: 'value',
        seriesField: 'type',
        pointer: { type: 'rect', width: 0.03, height: 0.7, style: { fill: '#e8e8ee' } },
        pin: { width: 0.1, height: 0.1, style: { fill: '#e8e8ee' } },
        pinBackground: { width: 0.14, height: 0.14, style: { fill: '#444' } },
      },
    ],
    axes: [
      {
        orient: 'angle',
        type: 'linear',
        min: 0,
        max: 100,
        radius: 0.85,
        domainLine: { visible: false },
        grid: { visible: false },
        tick: { visible: false },
        label: { visible: !ctx.preview, style: { fontSize: 12 } },
      },
      { orient: 'radius', type: 'linear', min: 0, max: 100, visible: false },
    ],
    legends: { visible: false },
    tooltip: { visible: false },
  } as unknown as ISpec;
  const { vchart, release } = createChart(el, ctx, spec);
  const r = rng(11);
  const stop = every(2000, () => {
    void vchart.updateData('reading', [{ type: 'reading', value: Math.round(5 + r() * 90), length: 100 }]);
  });
  return () => {
    stop();
    release();
  };
};

export default mount;
