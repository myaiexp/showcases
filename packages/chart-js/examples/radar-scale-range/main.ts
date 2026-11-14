// Café ratings on a radar: zoom the scale in or out with beginAtZero, suggestedMax and stepSize
import type { RadialLinearScaleOptions } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select, slider, toggle } from '../../shared/controls.ts';
import { C, alpha } from '../../shared/data.ts';
import { CAFE, CAFE_LABELS } from '../../shared/round-charts-data.ts';

interface Range {
  beginAtZero: boolean;
  suggestedMax: number | undefined;
  stepSize: number | undefined;
}
const RANGES: Range[] = [
  { beginAtZero: false, suggestedMax: undefined, stepSize: undefined },
  { beginAtZero: true, suggestedMax: undefined, stepSize: undefined },
  { beginAtZero: true, suggestedMax: 5, stepSize: 1 },
  { beginAtZero: false, suggestedMax: 5, stepSize: 0.5 },
];

const describe = (r: Range): string =>
  [r.beginAtZero && 'beginAtZero', r.suggestedMax && `suggestedMax ${r.suggestedMax}`, r.stepSize && `stepSize ${r.stepSize}`]
    .filter(Boolean)
    .join(', ') || 'automatic range';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 164 });
  const label = caption(el);

  const chart = new Chart(stage.canvas, {
    type: 'radar',
    data: {
      labels: CAFE_LABELS,
      datasets: [
        {
          label: 'Rating (1 to 5)',
          data: CAFE,
          fill: true,
          backgroundColor: alpha(C.green, 0.25),
          borderColor: C.green,
          pointBackgroundColor: C.green,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: { r: { ticks: { showLabelBackdrop: false } } },
      plugins: { legend: { display: false } },
    },
  });
  // scales.r is the radial linear scale: its options are in axes/radial/linear.md.
  // Read scales.r on every change: update() re-merges the scale options into new objects.
  const r = (): RadialLinearScaleOptions => chart.options.scales!.r as RadialLinearScaleOptions;

  const apply = (range: Range): void => {
    r().beginAtZero = range.beginAtZero;
    r().suggestedMax = range.suggestedMax as number;
    r().ticks.stepSize = range.stepSize as number;
    chart.update();
    label.textContent = describe(range);
  };
  apply(RANGES[0]!);

  if (bar) {
    const now: Range = { ...RANGES[0]! };
    toggle(bar, 'beginAtZero', now.beginAtZero, (v) => {
      now.beginAtZero = v;
      apply(now);
    });
    slider(bar, 'suggestedMax', [0, 10, 1], 0, (v) => {
      now.suggestedMax = v || undefined;
      apply(now);
    });
    select(bar, 'ticks.stepSize', ['auto', '0.5', '1', '2'] as const, 'auto', (v) => {
      now.stepSize = v === 'auto' ? undefined : Number(v);
      apply(now);
    });
  }
  const stop = ctx.preview ? cycle(RANGES, 2400, apply) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
