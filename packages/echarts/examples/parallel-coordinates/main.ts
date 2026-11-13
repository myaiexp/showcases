// Parallel coordinates: parallel component, parallelAxis list and a parallel series
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';

let seed = 3;
const rnd = (): number => ((seed = (seed * 16807) % 2147483647) / 2147483647);
const grades = ['A', 'B', 'C'];
// Each row: [price, mileage, power, rating, grade]
const rows = Array.from({ length: 60 }, () => [
  Math.round(10 + rnd() * 50),
  Math.round(rnd() * 200),
  Math.round(60 + rnd() * 240),
  +(1 + rnd() * 4).toFixed(1),
  grades[Math.floor(rnd() * 3)],
]);

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);

  const apply = (layout: string): void => {
    chart.setOption({
      parallel: {
        layout, // 'horizontal' | 'vertical'
        left: layout === 'vertical' ? 60 : 40,
        right: layout === 'vertical' ? 40 : 70,
        top: 30,
        bottom: 20,
        parallelAxisDefault: {
          type: 'value',
          nameLocation: 'end',
          nameGap: 14,
          // Dragging on an axis (full view) selects a range; lines outside it fade.
          areaSelectStyle: { width: 16, opacity: 0.35 },
          realtime: true,
        },
      },
      // One entry per axis; dim is the column of the series data it reads.
      parallelAxis: [
        { dim: 0, name: 'Price' },
        { dim: 1, name: 'Mileage' },
        { dim: 2, name: 'Power' },
        { dim: 3, name: 'Rating', min: 1, max: 5 },
        { dim: 4, name: 'Grade', type: 'category', data: grades },
      ],
      visualMap: { show: false, dimension: 2, min: 60, max: 300, inRange: { color: ['#4fc3f7', '#ffb74d', '#ef5350'] } },
      series: [
        {
          type: 'parallel',
          lineStyle: { width: 1.5, opacity: 0.55 },
          inactiveOpacity: 0.03, // lines outside the selected ranges fade
          activeOpacity: 0.9,
          smooth: true,
          data: rows,
        },
      ],
    });
  };
  apply('horizontal');

  if (bar) select(bar, 'parallel.layout', ['horizontal', 'vertical'], apply);

  // Preview: recolour the lines by a different axis each time (visualMap.dimension).
  const dims = [
    { dimension: 2, min: 60, max: 300 },
    { dimension: 0, min: 10, max: 60 },
    { dimension: 1, min: 0, max: 200 },
    { dimension: 3, min: 1, max: 5 },
  ];
  let i = 0;
  const stop = ctx.preview ? every(1500, () => chart.setOption({ visualMap: dims[++i % dims.length] })) : () => {};

  return () => {
    stop();
    dispose();
  };
};

export default mount;
