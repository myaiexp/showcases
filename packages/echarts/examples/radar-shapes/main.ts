// Radar component plus radar series, switching the shape between polygon and circle
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';

const indicator = [
  { name: 'Attack', max: 100 },
  { name: 'Defence', max: 100 },
  { name: 'Speed', max: 100 },
  { name: 'Magic', max: 100 },
  { name: 'Stamina', max: 100 },
  { name: 'Luck', max: 100 },
];
const heroes = [
  { name: 'Knight', value: [85, 90, 40, 20, 80, 50] },
  { name: 'Mage', value: [30, 35, 55, 95, 45, 70] },
];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);

  const apply = (shape: string): void => {
    chart.setOption({
      legend: { show: !ctx.preview, data: heroes.map((h) => h.name) },
      tooltip: {},
      // The radar component draws the axes; series.radar draws the polygons on it.
      radar: {
        shape, // 'polygon' | 'circle' for the grid shape
        indicator,
        radius: ctx.preview ? '62%' : '68%',
        splitNumber: 4,
        axisName: { color: '#bbb' },
        splitArea: { show: true, areaStyle: { opacity: 0.08 } },
      },
      series: [
        {
          type: 'radar',
          data: heroes.map((h) => ({ ...h, areaStyle: { opacity: 0.25 } })),
          symbolSize: 5,
        },
      ],
    });
  };
  apply('polygon');

  if (bar) select(bar, 'radar.shape', ['polygon', 'circle'], apply);

  // Preview: alternate shape and wobble the values.
  let circle = false;
  const stop = ctx.preview
    ? every(1800, () => {
        circle = !circle;
        apply(circle ? 'circle' : 'polygon');
        chart.setOption({
          series: [{ data: heroes.map((h) => ({ ...h, value: h.value.map((v) => Math.min(100, Math.round(v + (Math.random() - 0.5) * 30))) })) }],
        });
      })
    : () => {};

  return () => {
    stop();
    dispose();
  };
};

export default mount;
