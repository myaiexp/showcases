// The handbook's first chart: echarts.init on a sized container, then one setOption call
import type { Mount } from '@/types.ts';
import { createChart, every } from '../../shared/chart.ts';

const products = ['Shirts', 'Cardigans', 'Chiffons', 'Pants', 'Heels', 'Socks'];

const mount: Mount = (el, ctx) => {
  // createChart makes the sized <div> and calls echarts.init(div, 'dark') on it.
  const { chart, dispose } = createChart(el, ctx);

  // The option from the Get Started page: a title, a tooltip, a legend, two axes and
  // one bar series. The empty yAxis is a value axis fitted to the data.
  chart.setOption({
    // The card preview is 260px wide, too narrow for the title.
    title: { text: 'ECharts Getting Started Example', show: !ctx.preview },
    tooltip: {},
    legend: { data: ['sales'] },
    xAxis: { data: products },
    yAxis: {},
    series: [{ name: 'sales', type: 'bar', data: [5, 20, 36, 10, 10, 20] }],
  });

  // Calling setOption again with new data merges into the chart and animates the bars
  // from their old heights to the new ones.
  const random = (): number[] => products.map(() => Math.round(5 + Math.random() * 35));
  const stop = every(ctx.preview ? 1800 : 2500, () => {
    chart.setOption({ series: [{ name: 'sales', data: random() }] });
  });

  return () => {
    stop();
    dispose();
  };
};

export default mount;
