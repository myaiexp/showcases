// Two y axes with different ranges: alignTicks on the second one makes its ticks line up with the first
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, button, select, every } from '../../shared/chart.ts';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const RAIN = [18, 24, 41, 62, 89, 133, 182, 168, 97, 52, 29, 21];
const TEMP = [-3.2, -2.1, 2.4, 8.7, 14.5, 19.2, 22.8, 21.6, 16.1, 9.3, 3.4, -1.4];

interface Look { align: boolean; splitNumber: number; temp: string }

function build(look: Look, preview: boolean): EChartsOption {
  const temp = look.temp === 'warm' ? TEMP.map((t) => Math.round((t + 12) * 10) / 10) : TEMP;
  return {
    tooltip: { trigger: 'axis', show: !preview },
    legend: { show: !preview },
    grid: { top: 36, left: 56, right: 56, bottom: preview ? 28 : 64 },
    xAxis: { type: 'category', data: MONTHS },
    yAxis: [
      // The first value axis sets the ticks; the others align to it.
      { type: 'value', name: 'Rain (mm)', splitNumber: look.splitNumber, axisLabel: { formatter: '{value} mm' } },
      {
        type: 'value',
        name: 'Temp (°C)',
        // alignTicks: this axis adjusts its own ticks to match the first axis's tick count.
        alignTicks: look.align,
        splitNumber: look.splitNumber,
        // Second y axis defaults to the right side; the grid lines come from the first axis only.
        splitLine: { show: false },
        axisLine: { show: true, lineStyle: { color: '#ee6666' } },
        axisLabel: { formatter: '{value} °C', color: '#ee6666' },
      },
    ],
    series: [
      { name: 'Rain', type: 'bar', data: RAIN, yAxisIndex: 0 },
      { name: 'Temp', type: 'line', data: temp, yAxisIndex: 1, smooth: true, itemStyle: { color: '#ee6666' } },
    ],
  };
}

const mount: Mount = (el, ctx) => {
  const look: Look = { align: true, splitNumber: 5, temp: 'cool' };
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const show = (): void => {
    chart.setOption(build(look, ctx.preview));
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    stop = every(2000, () => {
      look.align = !look.align;
      show();
    });
  } else {
    const al = button(bar!, 'alignTicks: on', () => {
      look.align = !look.align;
      al.textContent = `alignTicks: ${look.align ? 'on' : 'off'}`;
      show();
    });
    select(bar!, 'splitNumber', ['3', '5', '8'], (v) => {
      look.splitNumber = Number(v);
      show();
    });
    select(bar!, 'temperature', ['cool', 'warm'], (v) => {
      look.temp = v;
      show();
    });
  }
  return () => {
    stop();
    dispose();
  };
};

export default mount;
