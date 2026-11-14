// customMark rule, rect, text and symbol, positioned from the series' valueToPosition
import type { Mount } from '@/types.ts';
import { weekdayRows } from '../../shared/anim-data.ts';
import { createChart, every } from '../../shared/chart.ts';

const TARGET = 32;

interface Geometry {
  getAllRegions(): { getLayoutRect(): { width: number }; getLayoutStartPoint(): { x: number; y: number } }[];
  getAllSeries(): {
    valueToPosition(x: unknown, y?: unknown): { x: number; y: number };
    getXAxisHelper(): { getBandwidth?(depth: number): number };
  }[];
}

const mount: Mount = (el, ctx) => {
  // Custom marks are drawn in canvas pixels; series positions are relative to the region.
  let vchartRef: { getChart(): unknown } | null = null;
  const geo = (): Geometry | null => (vchartRef?.getChart() as Geometry | null) ?? null;
  const origin = () => geo()?.getAllRegions()[0]?.getLayoutStartPoint() ?? { x: 0, y: 0 };
  const regionWidth = () => geo()?.getAllRegions()[0]?.getLayoutRect().width ?? 0;
  const series = () => geo()?.getAllSeries()[0];
  const yOf = (value: number) => origin().y + (series()?.valueToPosition('Mon', value).y ?? 0);
  const barCenterX = (day: string) =>
    origin().x + (series()?.valueToPosition(day, 0).x ?? 0) + (series()?.getXAxisHelper().getBandwidth?.(0) ?? 0) / 2;
  const chart = createChart(el, ctx, {
    type: 'bar',
    data: [
      { id: 'sales', values: weekdayRows(5) },
      { id: 'target', values: [{ label: `target ${TARGET}` }] },
    ],
    xField: 'day',
    yField: 'sales',
    legends: { visible: false },
    axes: [{ orient: 'left', type: 'linear', max: 60, min: 0 }, { orient: 'bottom', type: 'band' }],
    customMark: [
      {
        type: 'rect',
        dataId: 'target',
        zIndex: -1,
        style: { x: () => origin().x, y: () => origin().y, width: regionWidth, height: () => yOf(TARGET) - origin().y, fill: '#ff8a3d', fillOpacity: 0.12 },
      },
      {
        type: 'rule',
        dataId: 'target',
        style: { x: () => origin().x, x1: () => origin().x + regionWidth(), y: () => yOf(TARGET), y1: () => yOf(TARGET), stroke: '#ff8a3d', lineWidth: 2, lineDash: [6, 4] },
      },
      {
        type: 'text',
        dataId: 'target',
        style: { text: (d: { label: string }) => d.label, x: () => origin().x + 8, y: () => yOf(TARGET) - 6, fill: '#ff8a3d', fontSize: 12, textBaseline: 'bottom' },
      },
      {
        type: 'symbol',
        dataId: 'sales',
        style: {
          visible: (d: { sales: number }) => d.sales > TARGET,
          symbolType: 'star',
          size: 14,
          fill: '#ffd93d',
          x: (d: { day: string }) => barCenterX(d.day),
          y: (d: { sales: number }) => yOf(d.sales) - 12,
        },
      },
    ],
  } as never);
  vchartRef = chart.vchart as never;
  let i = 5;
  let alive = true;
  const stop = every(2200, () => {
    if (alive) void chart.vchart.updateData('sales', weekdayRows(++i));
  });
  return () => {
    alive = false;
    stop();
    chart.release();
  };
};

export default mount;
