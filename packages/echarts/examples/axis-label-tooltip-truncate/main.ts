// Truncated y-axis labels (width + overflow) that show their full text in an axis label tooltip
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, slider, button, every } from '../../shared/chart.ts';

const NAMES = [
  'International shipping and logistics',
  'Renewable energy infrastructure',
  'Pharmaceutical research and development',
  'Agricultural machinery',
  'Telecommunications equipment',
  'Water treatment',
];
const DATA = [72, 58, 91, 34, 66, 45];

interface Look { width: number; overflow: 'truncate' | 'break' | 'breakAll'; tooltip: boolean; custom: boolean }

// The axis tooltip formatter gets the label's params; isTruncated() reports whether it was cut.
function labelTip(p: unknown): string {
  const q = p as { value?: string; isTruncated?: () => boolean; tickIndex?: number };
  const cut = q.isTruncated?.() ? 'shortened on the axis' : 'fits on the axis';
  return `<b>${q.value ?? ''}</b><br/>Row ${(q.tickIndex ?? 0) + 1}, ${cut}`;
}

function build(look: Look, preview: boolean): EChartsOption {
  return {
    // The axis tooltip needs the global tooltip component enabled.
    tooltip: { trigger: 'item', show: !preview, confine: true },
    // v6 shrinks the grid on its own so labels stay inside the canvas (grid.outerBoundsMode 'auto').
    grid: { top: 12, left: 8, right: 36, bottom: 24 },
    xAxis: { type: 'value', splitNumber: 4 },
    yAxis: {
      type: 'category',
      inverse: true,
      data: NAMES,
      // triggerEvent lets labels receive pointer events, which the label tooltip relies on.
      triggerEvent: true,
      axisLabel: {
        // width + overflow: label text beyond width is cut ('truncate'), or wrapped ('break', 'breakAll').
        width: look.width,
        overflow: look.overflow,
        ellipsis: '…',
        interval: 0,
        lineHeight: 14,
      },
      // yAxis.tooltip (5.6): the tooltip shown when hovering a label.
      tooltip: { show: look.tooltip, ...(look.custom ? { formatter: labelTip } : {}) },
    },
    series: [{ type: 'bar', data: DATA, barWidth: '55%', label: { show: !preview, position: 'right' } }],
  };
}

const mount: Mount = (el, ctx) => {
  const look: Look = { width: 90, overflow: 'truncate', tooltip: true, custom: true };
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const show = (): void => {
    chart.setOption(build(look, ctx.preview), true);
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    const widths = [60, 110, 170, 110];
    let i = 0;
    stop = every(1500, () => {
      look.width = widths[++i % widths.length]!;
      look.overflow = i % 8 < 4 ? 'truncate' : 'break';
      show();
    });
  } else {
    slider(bar!, 'label width', [40, 240, 5], look.width, (v) => {
      look.width = v;
      show();
    });
    select(bar!, 'overflow', ['truncate', 'break', 'breakAll'], (v) => {
      look.overflow = v as Look['overflow'];
      show();
    });
    const tip = button(bar!, 'label tooltip: on', () => {
      look.tooltip = !look.tooltip;
      tip.textContent = `label tooltip: ${look.tooltip ? 'on' : 'off'}`;
      show();
    });
    const fmt = button(bar!, 'formatter: custom', () => {
      look.custom = !look.custom;
      fmt.textContent = `formatter: ${look.custom ? 'custom' : 'default'}`;
      show();
    });
  }
  return () => {
    stop();
    dispose();
  };
};

export default mount;
