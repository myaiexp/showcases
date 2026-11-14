// series.line on a polar coordinate system, with angle axis options and a closed loop
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, slider, button, every } from '../../shared/chart.ts';
import { MONTHS } from '../../shared/line-data.ts';

const rain = [48, 40, 45, 52, 60, 78, 90, 85, 70, 65, 62, 55];
const sun = [20, 28, 40, 55, 68, 80, 86, 82, 62, 42, 28, 20];

interface Look { startAngle: number; endAngle: number | null; clockwise: boolean; closed: boolean; area: boolean; smooth: boolean; stacked: boolean }

function build(look: Look, preview: boolean): EChartsOption {
  // To close the ring, repeat the first value and category at the end.
  const cats = look.closed ? [...MONTHS, MONTHS[0]!] : MONTHS;
  const closeIt = (a: number[]): number[] => (look.closed ? [...a, a[0]!] : a);
  return {
    animation: !preview,
    legend: preview ? { show: false } : {},
    // A polar system is laid out by radius and center; the legend sits at the bottom in ECharts 6.
    polar: { radius: preview ? ['10%', '82%'] : ['8%', '72%'], center: ['50%', preview ? '50%' : '46%'] },
    // angleAxis / radiusAxis: the two axes of the polar system. startAngle 90 is the top;
    // endAngle (5.5.0) null means a whole circle; clockwise sets the positive direction.
    angleAxis: { type: 'category', data: cats, startAngle: look.startAngle, endAngle: look.endAngle ?? undefined, clockwise: look.clockwise, boundaryGap: false },
    radiusAxis: { min: 0, max: look.stacked ? 180 : 100, axisLabel: { show: !preview } },
    tooltip: { trigger: 'axis' },
    series: [
      { name: 'Rain', data: closeIt(rain), color: '#5470c6' },
      { name: 'Sun', data: closeIt(sun), color: '#fac858' },
    ].map((s) => ({
      ...s,
      type: 'line' as const,
      // coordinateSystem: 'polar' places the series on the polar system instead of a grid.
      coordinateSystem: 'polar' as const,
      smooth: look.smooth,
      stack: look.stacked ? 'total' : undefined,
      areaStyle: look.area ? { opacity: 0.3 } : undefined,
      symbolSize: 6,
    })),
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 460 });
  const look: Look = { startAngle: 90, endAngle: null, clockwise: true, closed: true, area: true, smooth: false, stacked: false };
  const show = (): void => {
    chart.setOption(build(look, ctx.preview), true);
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    stop = every(80, () => {
      look.startAngle = (look.startAngle + 2) % 360;
      show();
    });
  } else {
    slider(bar!, 'startAngle', [-180, 180, 5], 90, (v) => {
      look.startAngle = v;
      show();
    });
    select(bar!, 'endAngle', ['null (full circle)', '-180', '0', '180'], (v) => {
      look.endAngle = v.startsWith('null') ? null : Number(v);
      show();
    });
    const toggle = (key: 'clockwise' | 'closed' | 'area' | 'smooth' | 'stacked', text: string): void => {
      const b = button(bar!, `${text}: ${look[key] ? 'on' : 'off'}`, () => {
        look[key] = !look[key];
        b.textContent = `${text}: ${look[key] ? 'on' : 'off'}`;
        show();
      });
    };
    toggle('clockwise', 'clockwise');
    toggle('closed', 'closed loop');
    toggle('area', 'areaStyle');
    toggle('smooth', 'smooth');
    toggle('stacked', 'stack');
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
