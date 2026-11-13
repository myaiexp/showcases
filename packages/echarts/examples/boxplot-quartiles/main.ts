// Boxplot fed with precomputed [min, Q1, median, Q3, max] rows, plus outlier scatter
import type { Mount } from '@/types.ts';
import { createChart, every } from '../../shared/chart.ts';

const groups = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'];
// Each row is one box: [min, Q1, median, Q3, max]. No transform needed when data is already summarised.
const boxes = [
  [650, 850, 940, 980, 1070],
  [760, 800, 845, 885, 960],
  [780, 840, 855, 880, 940],
  [720, 767, 815, 865, 920],
  [740, 807, 870, 920, 1000],
];
// Outliers: [category index, value].
const outliers = [[0, 1160], [0, 560], [2, 1010], [3, 650], [4, 1100]];

const mount: Mount = (el, ctx) => {
  const { chart, dispose } = createChart(el, ctx);

  chart.setOption({
    tooltip: { trigger: 'item', axisPointer: { type: 'shadow' } },
    grid: { left: 50, right: 20, top: 20, bottom: 30 },
    xAxis: { type: 'category', data: groups, boundaryGap: true },
    yAxis: { type: 'value', scale: true, name: ctx.preview ? '' : 'ms' },
    series: [
      {
        name: 'latency',
        type: 'boxplot',
        data: boxes,
        boxWidth: ['30%', '60%'], // [min, max] width as a share of the band
        itemStyle: { borderWidth: 2 },
        tooltip: {
          formatter: (p: unknown) => {
            const { name, data } = p as { name: string; data: number[] };
            // Boxplot data may carry the category index first; take the trailing five.
            const [mn, q1, med, q3, mx] = data.slice(-5);
            return `${name}<br>max ${mx}<br>Q3 ${q3}<br>median ${med}<br>Q1 ${q1}<br>min ${mn}`;
          },
        },
      },
      { name: 'outlier', type: 'scatter', data: outliers, symbolSize: 8 },
    ],
  });

  // Jitter the summary values so the boxes visibly morph.
  const stop = every(ctx.preview ? 1800 : 2500, () => {
    const next = boxes.map((b) => {
      const shift = (Math.random() - 0.5) * 80;
      return b.map((v) => Math.round(v + shift * (0.6 + Math.random() * 0.4)));
    });
    chart.setOption({ series: [{ name: 'latency', data: next }] });
  });

  return () => {
    stop();
    dispose();
  };
};

export default mount;
