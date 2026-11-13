// series.labelLayout on a dense labelled line: hideOverlap, moveOverlap and a callback
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, slider, every } from '../../shared/chart.ts';
import { walk } from '../../shared/line-data.ts';

const MODES = ['none', 'hideOverlap', "moveOverlap: 'shiftX'", "moveOverlap: 'shiftY'", 'callback: rotate + dy'] as const;
type Mode = (typeof MODES)[number];

function layout(mode: Mode): unknown {
  switch (mode) {
    case 'hideOverlap':
      // hideOverlap: labels that would overlap an earlier one are hidden.
      return { hideOverlap: true };
    case "moveOverlap: 'shiftX'":
      // moveOverlap 'shiftX': labels are placed one after another horizontally to avoid overlap.
      return { moveOverlap: 'shiftX' };
    case "moveOverlap: 'shiftY'":
      return { moveOverlap: 'shiftY' };
    case 'callback: rotate + dy':
      // A callback gets the label's rect and returns overrides: rotate, offset and align it.
      return (p: { rect: { x: number; y: number; width: number; height: number } }) => ({
        rotate: 90,
        dy: -16,
        align: 'left',
        verticalAlign: 'middle',
        x: p.rect.x + p.rect.width / 2,
        y: p.rect.y,
      });
    default:
      return {};
  }
}

function build(mode: Mode, n: number, values: number[]): EChartsOption {
  return {
    title: { text: `labelLayout: ${mode}`, left: 'center', top: 0, textStyle: { fontSize: 13 } },
    grid: { top: 56, left: 36, right: 16, bottom: 28 },
    xAxis: { type: 'category', data: values.slice(0, n).map((_, i) => `${i + 1}`) },
    yAxis: { type: 'value', scale: true },
    series: [
      {
        type: 'line',
        data: values.slice(0, n),
        symbolSize: 5,
        label: { show: true, position: 'top', fontSize: 11 },
        labelLayout: layout(mode) as never,
        animation: false,
      },
    ],
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const values = walk(80, 17, 50, 5);
  let mode: Mode = 'none';
  let n = ctx.preview ? 30 : 40;
  const show = (): void => {
    chart.setOption(build(mode, n, values), true);
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    stop = every(1500, () => {
      i = (i + 1) % MODES.length;
      mode = MODES[i]!;
      show();
    });
  } else {
    select(bar!, 'labelLayout', MODES, (v) => {
      mode = v as Mode;
      show();
    });
    slider(bar!, 'points', [10, 80, 5], n, (v) => {
      n = v;
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
