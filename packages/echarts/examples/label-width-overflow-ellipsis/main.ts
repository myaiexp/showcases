// Scatter labels with a fixed text-block width, overflow mode, ellipsis and line height
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select, slider } from '../../shared/chart.ts';

const points = [
  { name: 'Quarterly revenue forecast, revised after audit', value: [18, 70] },
  { name: 'Customer support satisfaction survey results', value: [50, 28] },
  { name: 'Internationalisation and localisation backlog', value: [80, 72] },
  { name: 'Supercalifragilisticexpialidocious', value: [30, 48] },
  { name: 'Short', value: [66, 50] },
];

interface Look { width: number; overflow: 'truncate' | 'break' | 'breakAll'; ellipsis: string; lineHeight: number }

function apply(chart: ReturnType<typeof createChart>['chart'], look: Look, preview: boolean): void {
  chart.setOption({
    animation: false,
    grid: { top: 12, left: 12, right: 12, bottom: 12 },
    xAxis: { type: 'value', min: 0, max: 100, show: false },
    yAxis: { type: 'value', min: 0, max: 100, show: false },
    series: [
      {
        type: 'scatter',
        symbolSize: 10,
        data: points,
        label: {
          show: true,
          position: 'bottom',
          formatter: '{b}',
          fontSize: preview ? 10 : 12,
          // width fixes the text block's width; overflow only works once width is set.
          width: look.width,
          overflow: look.overflow,
          // ellipsis ends the text when overflow is 'truncate'.
          ellipsis: look.ellipsis,
          lineHeight: look.lineHeight,
          padding: [3, 6],
          borderRadius: 4,
          backgroundColor: 'rgba(120,120,120,0.28)',
        },
      },
    ],
  });
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const look: Look = { width: 110, overflow: 'truncate', ellipsis: '...', lineHeight: 16 };
  apply(chart, look, ctx.preview);

  let stop = (): void => {};
  if (ctx.preview) {
    const modes: Look['overflow'][] = ['truncate', 'break', 'breakAll'];
    let i = 0;
    stop = every(1800, () => {
      i++;
      look.overflow = modes[i % modes.length]!;
      look.width = i % 2 === 0 ? 100 : 70;
      apply(chart, look, true);
    });
  } else {
    select(bar!, 'overflow', ['truncate', 'break', 'breakAll'], (v) => {
      look.overflow = v as Look['overflow'];
      apply(chart, look, false);
    });
    select(bar!, 'ellipsis', ['...', '…', ' [more]'], (v) => {
      look.ellipsis = v;
      apply(chart, look, false);
    });
    slider(bar!, 'width', [40, 240, 5], look.width, (v) => {
      look.width = v;
      apply(chart, look, false);
    });
    slider(bar!, 'lineHeight', [10, 30, 1], look.lineHeight, (v) => {
      look.lineHeight = v;
      apply(chart, look, false);
    });
  }
  return () => {
    stop();
    dispose();
  };
};

export default mount;
