// tooltip trigger 'axis' with axisPointer types cross and shadow, linked across two grids
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';

const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
const temp = hours.map((_, i) => Math.round((14 + 8 * Math.sin((i - 8) / 24 * Math.PI * 2)) * 10) / 10);
const rain = hours.map((_, i) => Math.max(0, Math.round(6 * Math.sin(i / 3) + 3)));

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 440 });

  const apply = (type: string): void => {
    chart.setOption({
      // trigger 'axis': one tooltip lists every series at the hovered category.
      tooltip: { trigger: 'axis', axisPointer: { type } }, // 'line' | 'shadow' | 'cross'
      // axisPointer.link ties the two x axes together: moving over one moves the pointer in the other.
      axisPointer: { link: [{ xAxisIndex: 'all' }], label: { backgroundColor: '#555' } },
      grid: [
        { left: 50, right: 20, top: 16, height: '38%' },
        { left: 50, right: 20, top: '58%', height: '28%' },
      ],
      xAxis: [
        { type: 'category', data: hours, gridIndex: 0, boundaryGap: type === 'shadow' },
        { type: 'category', data: hours, gridIndex: 1, boundaryGap: type === 'shadow' },
      ],
      yAxis: [
        { type: 'value', gridIndex: 0, name: ctx.preview ? '' : '°C' },
        { type: 'value', gridIndex: 1, name: ctx.preview ? '' : 'mm' },
      ],
      series: [
        { name: 'Temperature', type: 'line', xAxisIndex: 0, yAxisIndex: 0, data: temp, smooth: true },
        { name: 'Rain', type: 'bar', xAxisIndex: 1, yAxisIndex: 1, data: rain },
      ],
    });
  };
  apply('cross');

  if (bar) select(bar, 'axisPointer.type', ['cross', 'shadow', 'line'], apply);

  // No pointer in the preview, so showTip drives the tooltip and pointers across the hours.
  let i = 0;
  const stop = ctx.preview
    ? every(350, () => chart.dispatchAction({ type: 'showTip', seriesIndex: 0, dataIndex: i++ % hours.length }))
    : () => {};

  return () => {
    stop();
    dispose();
  };
};

export default mount;
