// A custom text mark whose text callback returns rich text with an arrow image
import type { Mount } from '@/types.ts';
import { arrow } from '../../shared/richtext-icons.ts';
import { createChart, every } from '../../shared/chart.ts';
import { rng } from '../../shared/components-data.ts';

const QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4'];

interface Geometry {
  getAllRegions(): { getLayoutStartPoint(): { x: number; y: number } }[];
  getAllSeries(): { valueToPosition(x: unknown, y?: unknown): { x: number; y: number }; getXAxisHelper(): { getBandwidth?(d: number): number } }[];
}

const mount: Mount = (el, ctx) => {
  const r = rng(99);
  let previous = QUARTERS.map(() => 50);
  const frame = () => {
    const values = QUARTERS.map((q) => ({ q, value: Math.round(30 + r() * 70) }));
    const rows = values.map((d, i) => ({ ...d, change: d.value - (previous[i] ?? d.value) }));
    previous = values.map((d) => d.value);
    return rows;
  };
  let ref: { getChart(): unknown } | null = null;
  const geo = () => ref?.getChart() as Geometry | null | undefined;
  const series = () => geo()?.getAllSeries()[0];
  const origin = () => geo()?.getAllRegions()[0]?.getLayoutStartPoint() ?? { x: 0, y: 0 };
  const chart = createChart(el, ctx, {
    type: 'bar',
    data: [{ id: 'sales', values: frame() }],
    xField: 'q',
    yField: 'value',
    legends: { visible: false },
    axes: [{ orient: 'left', type: 'linear', max: 110, min: 0 }, { orient: 'bottom', type: 'band' }],
    customMark: [
      {
        type: 'text',
        dataId: 'sales',
        style: {
          text: (d: { change: number }) => ({
            type: 'rich',
            text: [
              { image: arrow(d.change >= 0, d.change >= 0 ? '#2fb86b' : '#e5534b'), width: 14, height: 14 },
              { text: ` ${d.change >= 0 ? '+' : ''}${d.change}`, fontSize: 14, fontWeight: 'bold', fill: d.change >= 0 ? '#2fb86b' : '#e5534b' },
              ...(ctx.preview ? [] : [{ text: '\nvs last quarter', fontSize: 11, fill: '#8a8f9c' }]),
            ],
          }),
          textAlign: 'center',
          textBaseline: 'bottom',
          x: (d: { q: string }) => origin().x + (series()?.valueToPosition(d.q, 0).x ?? 0) + (series()?.getXAxisHelper().getBandwidth?.(0) ?? 0) / 2,
          y: (d: { value: number }) => origin().y + (series()?.valueToPosition('Q1', d.value).y ?? 0) - 22,
        },
      },
    ],
  } as never);
  ref = chart.vchart as never;
  let alive = true;
  const stop = every(2400, () => {
    if (alive) void chart.vchart.updateData('sales', frame());
  });
  return () => {
    alive = false;
    stop();
    chart.release();
  };
};

export default mount;
