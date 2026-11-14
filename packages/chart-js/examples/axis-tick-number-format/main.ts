// Tick numbers through Intl.NumberFormat: currency, percent, compact, units
import type { LinearScaleOptions } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { C, MONTHS, alpha } from '../../shared/data.ts';

interface Preset {
  label: string;
  data: number[];
  color: string;
  format: Intl.NumberFormatOptions;
}
// linear.md: ticks.format takes the Intl.NumberFormat options the default formatter uses.
const PRESETS: Record<string, Preset> = {
  currency: { label: 'Revenue', data: [12400, 15800, 14200, 19600, 22100, 25300], color: C.green, format: { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 } },
  percent: { label: 'Share of voters', data: [0.12, 0.18, 0.22, 0.31, 0.38, 0.41], color: C.blue, format: { style: 'percent' } },
  compact: { label: 'Downloads', data: [1_200_000, 2_400_000, 3_100_000, 5_800_000, 7_200_000, 9_500_000], color: C.purple, format: { notation: 'compact' } },
  speed: { label: 'Top speed', data: [38, 44, 51, 47, 58, 63], color: C.orange, format: { style: 'unit', unit: 'kilometer-per-hour' } },
  decimals: { label: 'Rate', data: [1.2, 1.5, 1.45, 1.8, 2.1, 2.35], color: C.pink, format: { minimumFractionDigits: 2 } },
};
const NAMES = Object.keys(PRESETS);

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 164 });
  const label = caption(el);

  const first = PRESETS.currency!;
  const chart = new Chart(stage.canvas, {
    type: 'bar',
    data: {
      labels: MONTHS.slice(0, 6),
      datasets: [{ label: first.label, data: first.data, backgroundColor: alpha(first.color, 0.6), borderColor: first.color, borderWidth: 1 }],
    },
    options: {
      maintainAspectRatio: false,
      scales: { y: { ticks: { format: first.format } } },
      plugins: { legend: { display: !ctx.preview } },
    },
  });
  const y = (): LinearScaleOptions => chart.options.scales!.y as LinearScaleOptions;

  const apply = (name: string): void => {
    const p = PRESETS[name]!;
    const ds = chart.data.datasets[0]!;
    ds.label = p.label;
    ds.data = p.data;
    ds.backgroundColor = alpha(p.color, 0.6);
    ds.borderColor = p.color;
    y().ticks.format = p.format;
    chart.update();
    label.textContent = `format: ${JSON.stringify(p.format).replace(/"/g, "'")}`.slice(0, 44);
  };
  apply('currency');

  if (bar) select(bar, 'ticks.format', NAMES, 'currency', apply);
  const stop = ctx.preview ? cycle(NAMES, 2400, apply) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
