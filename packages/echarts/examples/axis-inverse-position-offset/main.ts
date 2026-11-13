// A depth profile with two x axes on the same side: inverse, position and offset
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, slider, button, every } from '../../shared/chart.ts';

const DEPTHS = Array.from({ length: 21 }, (_, i) => i * 10);
const TEMP = DEPTHS.map((d) => Math.round((22 * Math.exp(-d / 70) + 4) * 10) / 10);
const SALT = DEPTHS.map((d) => Math.round((34 + 1.4 * (1 - Math.exp(-d / 90))) * 100) / 100);

interface Look { inverseY: boolean; inverseX: boolean; position: 'top' | 'bottom'; offset: number }

function build(look: Look, preview: boolean): EChartsOption {
  const top = look.position === 'top';
  const x = (name: string, color: string, min: number, max: number, offset: number) => ({
    type: 'value' as const,
    name,
    min,
    max,
    // inverse: draws the axis from max to min.
    inverse: look.inverseX,
    // position + offset only act when the axis line is not pinned to the zero of the other axis.
    position: look.position,
    offset,
    axisLine: { onZero: false, show: true, lineStyle: { color } },
    axisLabel: { color },
    nameTextStyle: { color },
    splitLine: { show: false },
  });
  return {
    tooltip: { trigger: 'axis', show: !preview },
    // Leave room on the axis side for the offset axis and its name.
    grid: { top: top ? 74 : 20, left: 56, right: 24, bottom: top ? 20 : 74 },
    xAxis: [x('Temp °C', '#ee6666', 0, 30, 0), x('Salinity PSU', '#5470c6', 33, 36, look.offset)],
    yAxis: {
      type: 'value',
      name: 'Depth m',
      // inverse y: 0 at the top and depth increasing downward, the way a depth profile reads.
      inverse: look.inverseY,
      min: 0,
      max: 200,
    },
    series: [
      { type: 'line', xAxisIndex: 0, name: 'Temp', showSymbol: false, itemStyle: { color: '#ee6666' }, data: TEMP.map((v, i) => [v, DEPTHS[i]!]) },
      { type: 'line', xAxisIndex: 1, name: 'Salinity', showSymbol: false, itemStyle: { color: '#5470c6' }, data: SALT.map((v, i) => [v, DEPTHS[i]!]) },
    ],
  };
}

const mount: Mount = (el, ctx) => {
  const look: Look = { inverseY: true, inverseX: false, position: 'top', offset: 34 };
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const show = (): void => {
    chart.setOption(build(look, ctx.preview), true);
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    stop = every(1600, () => {
      i++;
      look.inverseY = i % 4 < 2;
      look.position = i % 2 === 0 ? 'top' : 'bottom';
      look.offset = 20 + (i % 3) * 16;
      show();
    });
  } else {
    const iy = button(bar!, 'y inverse: on', () => {
      look.inverseY = !look.inverseY;
      iy.textContent = `y inverse: ${look.inverseY ? 'on' : 'off'}`;
      show();
    });
    const ix = button(bar!, 'x inverse: off', () => {
      look.inverseX = !look.inverseX;
      ix.textContent = `x inverse: ${look.inverseX ? 'on' : 'off'}`;
      show();
    });
    const pos = select(bar!, 'x position', ['top', 'bottom'], (v) => {
      look.position = v as Look['position'];
      show();
    });
    pos.value = look.position;
    slider(bar!, 'offset', [0, 60, 2], look.offset, (v) => {
      look.offset = v;
      show();
    });
  }
  return () => {
    stop();
    dispose();
  };
};

export default mount;
