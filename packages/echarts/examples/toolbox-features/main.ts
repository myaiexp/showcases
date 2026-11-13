// Toolbox with saveAsImage, dataView, magicType, restore and dataZoom features
import type { Mount } from '@/types.ts';
import { createChart, every } from '../../shared/chart.ts';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const mount: Mount = (el, ctx) => {
  const { chart, dispose } = createChart(el, ctx, { height: 420 });

  chart.setOption({
    title: { text: ctx.preview ? '' : 'Weekly orders' },
    tooltip: { trigger: 'axis' },
    legend: { show: !ctx.preview },
    // Each key in `feature` turns one built-in tool on. Previews have no pointer, so the
    // toolbox is shown but only the full view can click it.
    toolbox: {
      show: true,
      right: 10,
      feature: {
        dataZoom: { yAxisIndex: 'none' }, // box-zoom on the x axis; its back button undoes it
        dataView: { readOnly: false, title: 'Data view' }, // a table of the series, editable here
        magicType: { type: ['line', 'bar', 'stack'], title: { line: 'Line', bar: 'Bar', stack: 'Stack' } },
        restore: {}, // back to the option that was first set
        saveAsImage: { pixelRatio: 2, name: 'orders' },
      },
    },
    // ECharts 6 puts the legend at the bottom by default, so the grid leaves room for it.
    grid: { left: 50, right: 20, top: ctx.preview ? 40 : 70, bottom: ctx.preview ? 30 : 64 },
    xAxis: { type: 'category', data: days },
    yAxis: { type: 'value' },
    series: [
      { name: 'Web', type: 'bar', data: [120, 132, 101, 134, 90, 230, 210] },
      { name: 'Store', type: 'bar', data: [220, 182, 191, 234, 290, 330, 310] },
    ],
  });

  // Update data so the chart is not static; magicType changes survive setOption merges.
  const stop = every(ctx.preview ? 1800 : 2800, () => {
    const r = (): number => Math.round(80 + Math.random() * 250);
    chart.setOption({ series: [{ data: days.map(r) }, { data: days.map(r) }] });
  });

  return () => {
    stop();
    dispose();
  };
};

export default mount;
