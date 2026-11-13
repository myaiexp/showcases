// Bar series on a polar coordinate system, with the category axis on either the angle or the radius
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, button, every } from '../../shared/chart.ts';

const cats = ['a', 'b', 'c', 'd'];
const data = [
  { name: 'A', values: [1, 2, 3, 4] },
  { name: 'B', values: [2, 4, 6, 8] },
  { name: 'C', values: [1, 3, 2, 4] },
];

interface Look { categoryOn: 'radius' | 'angle'; stack: boolean; roundCap: boolean }

function build({ categoryOn, stack, roundCap }: Look, preview: boolean): EChartsOption {
  const category = { type: 'category' as const, data: cats };
  return {
    tooltip: {},
    legend: preview ? { show: false } : { data: data.map((d) => d.name) },
    // polar holds one angleAxis and one radiusAxis; the bars use coordinateSystem: 'polar'.
    polar: { radius: [24, '78%'], center: ['50%', '54%'] },
    angleAxis: categoryOn === 'angle' ? { ...category, startAngle: 90 } : { type: 'value', startAngle: 90 },
    radiusAxis: categoryOn === 'radius' ? category : { type: 'value' },
    series: data.map((d) => ({
      name: d.name,
      type: 'bar' as const,
      coordinateSystem: 'polar' as const,
      data: d.values,
      stack: stack ? 'total' : '',
      // roundCap rounds the ends of the bar sectors (polar only).
      roundCap,
      label: { show: !preview, position: 'middle' as const, fontSize: 10 },
    })),
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const look: Look = { categoryOn: 'radius', stack: true, roundCap: true };
  const show = (): void => {
    // The axes swap roles, so replace the option rather than merge into it.
    chart.setOption(build(look, ctx.preview), true);
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    stop = every(2400, () => {
      look.categoryOn = look.categoryOn === 'radius' ? 'angle' : 'radius';
      show();
    });
  } else {
    select(bar!, 'category axis on', ['radius', 'angle'], (v) => {
      look.categoryOn = v as Look['categoryOn'];
      show();
    });
    const st = button(bar!, 'stack: on', () => {
      look.stack = !look.stack;
      st.textContent = `stack: ${look.stack ? 'on' : 'off'}`;
      show();
    });
    const rc = button(bar!, 'roundCap: on', () => {
      look.roundCap = !look.roundCap;
      rc.textContent = `roundCap: ${look.roundCap ? 'on' : 'off'}`;
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
