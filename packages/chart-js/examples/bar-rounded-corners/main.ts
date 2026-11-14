// Rounded bars: borderRadius as a number or per corner, borderSkipped
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select, slider, toggle } from '../../shared/controls.ts';
import { C, MONTHS, alpha } from '../../shared/data.ts';

const SKIPPED = ['start', 'end', 'middle', 'bottom', 'top', 'left', 'right', 'false', 'true'] as const;
type Skipped = (typeof SKIPPED)[number];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);
  let radius = 0;
  let topOnly = false;
  let skipped: Skipped = 'start';

  const dataset = {
    label: 'Signups',
    data: [42, 55, 38, 64, 71, 58, 80],
    backgroundColor: alpha(C.purple, 0.7),
    borderColor: C.purple,
    borderWidth: 1,
    borderRadius: radius as number | { topLeft: number; topRight: number },
    borderSkipped: 'start' as boolean | 'start' | 'end' | 'middle' | 'bottom' | 'top' | 'left' | 'right',
  };
  const chart = new Chart(stage.canvas, {
    type: 'bar',
    data: { labels: MONTHS.slice(0, 7), datasets: [dataset] },
    options: {
      maintainAspectRatio: false,
      scales: { y: { beginAtZero: true } },
      plugins: { legend: { display: false } },
    },
  });

  // bar.md § borderRadius: a number rounds every corner except those on a skipped edge;
  // an object names the corners. borderSkipped says which edge counts as skipped.
  const apply = (): void => {
    const ds = chart.data.datasets[0]!;
    ds.borderRadius = topOnly ? { topLeft: radius, topRight: radius } : radius;
    ds.borderSkipped = skipped === 'true' ? true : skipped === 'false' ? false : skipped;
    chart.update();
    const r = topOnly ? `{ topLeft: ${radius}, topRight: ${radius} }` : String(radius);
    label.textContent = `borderRadius: ${r} · skipped: ${skipped}`;
  };
  apply();

  if (bar) {
    slider(bar, 'borderRadius', [0, 30, 1], radius, (v) => ((radius = v), apply()));
    toggle(bar, 'top corners only', false, (v) => ((topOnly = v), apply()));
    select(bar, 'borderSkipped', SKIPPED, 'start', (v) => ((skipped = v), apply()));
  }
  const steps: [number, Skipped][] = [[0, 'start'], [8, 'start'], [20, 'start'], [20, 'false']];
  const stop = ctx.preview ? cycle(steps, 2000, ([r, s]) => ((radius = r), (skipped = s), apply())) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
