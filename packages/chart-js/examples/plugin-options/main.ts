// A value-label plugin with defaults, options and an off switch
import type { ChartType, Plugin } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select, slider, toggle } from '../../shared/controls.ts';
import { C, WEEKDAYS, alpha } from '../../shared/data.ts';

interface LabelOptions {
  color: string;
  size: number;
  suffix: string;
  decimals: number;
}

declare module 'chart.js' {
  interface PluginOptionsByType<TType extends ChartType> {
    showcaseValueLabels?: Partial<LabelOptions> | false;
  }
}

// plugins.md § Plugin defaults: `defaults` fill in whatever options.plugins leaves out.
const valueLabels: Plugin<'bar', LabelOptions> = {
  id: 'showcaseValueLabels',
  defaults: { color: '#fafafa', size: 12, suffix: '', decimals: 0 },
  afterDatasetsDraw(chart, _args, options) {
    const { ctx } = chart;
    ctx.save();
    ctx.fillStyle = options.color;
    ctx.font = `${options.size}px Inter Variable, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    chart.getDatasetMeta(0).data.forEach((bar, i) => {
      const value = Number(chart.data.datasets[0]?.data[i]);
      ctx.fillText(`${value.toFixed(options.decimals)}${options.suffix}`, bar.x, bar.y - 3);
    });
    ctx.restore();
  },
};

const LOOKS: readonly (readonly [string, Partial<LabelOptions> | false])[] = [
  ['defaults only', {}],
  ['suffix " km"', { suffix: ' km' }],
  ['amber, bigger, 1 decimal', { color: C.amber, size: 15, decimals: 1 }],
  ['plugins.showcaseValueLabels: false', false],
];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 176 });
  const note = caption(el);
  const chart = new Chart(stage.canvas, {
    type: 'bar',
    plugins: [valueLabels],
    data: {
      labels: WEEKDAYS,
      datasets: [{ label: 'Run distance (km)', data: [5.2, 0, 8.4, 4.1, 0, 12.6, 7.3], backgroundColor: alpha(C.blue, 0.55), borderRadius: 3 }],
    },
    options: {
      maintainAspectRatio: false,
      layout: { padding: { top: 18 } },
      scales: { y: { beginAtZero: true, grace: '8%' } },
      plugins: { legend: { display: false } },
    },
  });

  const apply = ([label, options]: (typeof LOOKS)[number]): void => {
    chart.options.plugins!.showcaseValueLabels = options === false ? false : { ...options };
    chart.update('none');
    note.textContent = label;
  };
  apply(LOOKS[0]!);

  if (bar) {
    // Plugin options are not re-merged by update(), so one object can be edited in place.
    const live = (): Partial<LabelOptions> => {
      const current = chart.options.plugins!.showcaseValueLabels;
      if (!current) chart.options.plugins!.showcaseValueLabels = {};
      return chart.options.plugins!.showcaseValueLabels as Partial<LabelOptions>;
    };
    toggle(bar, 'plugin on', true, (v) => {
      chart.options.plugins!.showcaseValueLabels = v ? {} : false;
      chart.update('none');
    });
    select(bar, 'Suffix', ['', ' km', ' k'] as const, '', (v) => ((live().suffix = v), chart.update('none')));
    slider(bar, 'Size', [8, 22, 1], 12, (v) => ((live().size = v), chart.update('none')));
    slider(bar, 'Decimals', [0, 2, 1], 0, (v) => ((live().decimals = v), chart.update('none')));
    select(bar, 'Colour', ['#fafafa', C.amber, C.green, C.pink], '#fafafa', (v) => ((live().color = v), chart.update('none')));
  }
  const stop = ctx.preview ? cycle(LOOKS, 1900, apply) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
