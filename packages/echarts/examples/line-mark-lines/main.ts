// markLine: average, fixed thresholds, a vertical line and a segment between two points
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, button, every } from '../../shared/chart.ts';
import { walk } from '../../shared/line-data.ts';

const days = Array.from({ length: 30 }, (_, i) => `${i + 1}`);

interface Look { position: string; symbol: string; precision: number; average: boolean; limits: boolean; vertical: boolean; segment: boolean }

function build(values: number[], look: Look): EChartsOption {
  return {
    tooltip: { trigger: 'axis' },
    grid: { top: 28, left: 40, right: 60, bottom: 28 },
    xAxis: { type: 'category', data: days },
    yAxis: { type: 'value', scale: true },
    series: [
      {
        type: 'line',
        data: values,
        showSymbol: false,
        markLine: {
          // symbol: the two ends, [start, end]; the default is an arrow at the end.
          symbol: ['none', look.symbol],
          // precision: decimal places of the computed values, useful for the average.
          precision: look.precision,
          // label.position: 'start' | 'middle' | 'end' and the inside* variants.
          label: { position: look.position as 'end', formatter: '{b}: {c}' },
          data: [
            ...(look.average ? [{ type: 'average' as const, name: 'avg', lineStyle: { color: '#91cc75' } }] : []),
            ...(look.limits
              ? [
                  { yAxis: 112, name: 'upper', lineStyle: { color: '#ee6666', type: 'solid' as const } },
                  { yAxis: 88, name: 'lower', lineStyle: { color: '#fac858', type: 'solid' as const } },
                ]
              : []),
            // xAxis: a vertical line at a category (its name or index).
            ...(look.vertical ? [{ xAxis: '15', name: 'day', lineStyle: { color: '#73c0de' } }] : []),
            // Two items in an array make a segment; each end can be a coord in data space.
            ...(look.segment
              ? [
                  [
                    { name: 'segment', coord: ['5', values[4]!] as [string, number] },
                    { coord: ['25', values[24]!] as [string, number] },
                  ],
                ]
              : []),
          ] as never,
        },
      },
    ],
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let values = walk(30, 4, 100, 4);
  const look: Look = { position: 'end', symbol: 'arrow', precision: 2, average: true, limits: true, vertical: true, segment: true };
  const show = (): void => {
    chart.setOption(build(values, look), true);
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    const positions = ['end', 'start', 'middle', 'insideEndTop'];
    let n = 0;
    stop = every(1500, () => {
      n += 1;
      look.position = positions[n % positions.length]!;
      look.symbol = n % 2 ? 'circle' : 'arrow';
      show();
    });
  } else {
    select(bar!, 'label.position', ['end', 'start', 'middle', 'insideStartTop', 'insideStartBottom', 'insideMiddleTop', 'insideEndTop', 'insideEndBottom'], (v) => {
      look.position = v;
      show();
    });
    select(bar!, 'end symbol', ['arrow', 'circle', 'diamond', 'none'], (v) => {
      look.symbol = v;
      show();
    });
    select(bar!, 'precision', ['2', '0', '4'], (v) => {
      look.precision = Number(v);
      show();
    });
    const toggle = (key: 'average' | 'limits' | 'vertical' | 'segment', text: string): void => {
      const b = button(bar!, `${text}: on`, () => {
        look[key] = !look[key];
        b.textContent = `${text}: ${look[key] ? 'on' : 'off'}`;
        show();
      });
    };
    toggle('average', 'average');
    toggle('limits', 'yAxis limits');
    toggle('vertical', 'xAxis line');
    toggle('segment', 'segment');
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
