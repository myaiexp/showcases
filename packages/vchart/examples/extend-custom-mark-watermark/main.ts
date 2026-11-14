// customMark { type: 'text', dataId }: a big year bound to its own dataset, updated with the bars
import type { Mount } from '@/types.ts';
import { createChart, every } from '../../shared/chart.ts';
import { rng } from '../../shared/components-data.ts';

const NAMES = ['Pine', 'Oak', 'Maple', 'Larch', 'Rowan', 'Yew'];

const mount: Mount = (el, ctx) => {
  const r = rng(23);
  let year = 2020;
  const scores = NAMES.map((name) => ({ name, value: Math.round(20 + r() * 60) }));
  const next = () => {
    year++;
    for (const s of scores) s.value = Math.max(5, Math.min(100, s.value + Math.round((r() - 0.45) * 20)));
    return [...scores].sort((a, b) => b.value - a.value).map((s) => ({ ...s }));
  };
  const size = ctx.preview ? 90 : 190;
  let chartRef: { getChart(): { getCanvasRect(): { width: number; height: number } } | null } | null = null;
  const canvas = () => chartRef?.getChart()?.getCanvasRect() ?? { width: 0, height: 0 };
  const chart = createChart(el, ctx, {
    type: 'bar',
    direction: 'horizontal',
    data: [
      { id: 'rank', values: [...scores].sort((a, b) => b.value - a.value).map((s) => ({ ...s })) },
      { id: 'year', values: [{ year: String(year) }] },
    ],
    yField: 'name',
    xField: 'value',
    seriesField: 'name',
    legends: { visible: false },
    axes: [
      { orient: 'bottom', type: 'linear', visible: false },
      { orient: 'left', type: 'band', tick: { visible: false } },
    ],
    animationUpdate: { duration: 900 },
    customMark: [
      {
        type: 'text',
        dataId: 'year',
        style: {
          text: (datum: { year: string }) => datum.year,
          textAlign: 'right',
          textBaseline: 'bottom',
          fontSize: size,
          fontWeight: 700,
          fill: '#8a8f9c',
          fillOpacity: 0.25,
          x: () => canvas().width - 24,
          y: () => canvas().height - 20,
        },
      },
    ],
  } as never);
  chartRef = chart.vchart as never;
  let alive = true;
  const stop = every(2200, () => {
    if (!alive) return;
    void chart.vchart.updateData('rank', next());
    void chart.vchart.updateData('year', [{ year: String(year) }]);
  });
  return () => {
    alive = false;
    stop();
    chart.release();
  };
};

export default mount;
