// A clock from three gaugePointer series on a 0 to 60 angle axis, fed the current time every second
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, every } from '../../shared/chart.ts';

const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

const time = (): { s: number; m: number; h: number } => {
  const d = new Date();
  return { s: d.getSeconds(), m: d.getMinutes(), h: ((d.getHours() % 12) + d.getMinutes() / 60) * 5 };
};

// A pointer passing 12 would swing back the long way; this animation always turns clockwise.
const clockwise = {
  custom: (ratio: number, from: Record<string, number>, to: Record<string, number>, next: Record<string, number>) => {
    if (from['angle'] === undefined || to['angle'] === undefined) return;
    const start = from['angle'] > to['angle'] ? from['angle'] - Math.PI * 2 : from['angle'];
    next['angle'] = ratio * (to['angle'] - start) + start;
  },
  easing: 'bounceOut',
};

const mount: Mount = (el, ctx) => {
  const t = time();
  const pointer = (id: number, field: string, length: number, width: number, color: string): object => ({
    type: 'gaugePointer',
    dataIndex: id,
    valueField: 'value',
    radiusField: 'length',
    seriesField: 'type',
    pointer: { type: 'rect', width, height: length, style: { fill: color, cornerRadius: 50 } },
    pin: { visible: false },
    pinBackground: { visible: false },
    animationAppear: false,
    animationUpdate: { pointer: clockwise },
    name: field,
  });
  const spec = {
    type: 'common',
    data: [
      { id: 'hour', values: [{ type: 'h', value: t.h, length: 100 }] },
      { id: 'minute', values: [{ type: 'm', value: t.m, length: 100 }] },
      { id: 'second', values: [{ type: 's', value: t.s, length: 100 }] },
    ],
    startAngle: -90,
    endAngle: 270,
    series: [pointer(0, 'hour', 0.5, 0.05, '#ffb84c'), pointer(1, 'minute', 0.7, 0.035, '#73fffe'), pointer(2, 'second', 0.8, 0.015, '#ff6e27')],
    axes: [
      {
        orient: 'angle',
        type: 'linear',
        radius: 0.85,
        min: 0,
        max: 60,
        domainLine: { visible: true },
        grid: { visible: false },
        tick: { visible: true, tickCount: 12 },
        label: { style: { fontSize: ctx.preview ? 12 : 20, text: ({ value }: { value: number }) => ROMAN[value / 5] ?? '' } },
      },
      { orient: 'radius', type: 'linear', min: 0, max: 100, visible: false },
    ],
    legends: { visible: false },
    tooltip: { visible: false },
  } as unknown as ISpec;
  const { vchart, release } = createChart(el, ctx, spec);

  const stop = every(1000, () => {
    const now = time();
    void vchart.updateData('hour', [{ type: 'h', value: now.h, length: 100 }]);
    void vchart.updateData('minute', [{ type: 'm', value: now.m, length: 100 }]);
    void vchart.updateData('second', [{ type: 's', value: now.s, length: 100 }]);
  });
  return () => {
    stop();
    release();
  };
};

export default mount;
