// EffectScatter with rippleEffect on points and a switch between render and emphasis triggers
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';

let seed = 5;
const rnd = (): number => ((seed = (seed * 16807) % 2147483647) / 2147483647);
const plain = Array.from({ length: 40 }, () => [Math.round(rnd() * 100), Math.round(rnd() * 100)]);
const hot = [[20, 70], [55, 40], [80, 85]];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);

  const apply = (showEffectOn: string, brushType: string): void => {
    chart.setOption({
      tooltip: {},
      grid: { left: 40, right: 20, top: 20, bottom: 30 },
      xAxis: { type: 'value', splitLine: { show: false } },
      yAxis: { type: 'value', splitLine: { lineStyle: { opacity: 0.2 } } },
      series: [
        { type: 'scatter', data: plain, symbolSize: 6, itemStyle: { opacity: 0.6 } },
        {
          type: 'effectScatter',
          data: hot,
          symbolSize: 12,
          // 'render': ripples start as soon as drawn; 'emphasis': only while hovered.
          showEffectOn,
          rippleEffect: { period: 3, scale: 4.5, brushType }, // brushType 'stroke' | 'fill'
          itemStyle: { color: '#ff5252', shadowBlur: 10, shadowColor: '#ff5252' },
          label: { show: !ctx.preview, formatter: 'alert', position: 'right' },
        },
      ],
    });
  };
  let on = 'render';
  let brush = 'stroke';
  apply(on, brush);

  if (bar) {
    select(bar, 'showEffectOn', ['render', 'emphasis'], (v) => { on = v; apply(on, brush); });
    select(bar, 'rippleEffect.brushType', ['stroke', 'fill'], (v) => { brush = v; apply(on, brush); });
  }
  // Move the hot points now and then; the ripples follow the new positions.
  const stop = every(ctx.preview ? 2000 : 3000, () => {
    chart.setOption({ series: [{}, { data: hot.map(() => [Math.round(Math.random() * 100), Math.round(Math.random() * 100)]) }] });
  });

  return () => {
    stop();
    dispose();
  };
};

export default mount;
