// Hide one plan in a stack of filled lines: what does propagate do
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { button, controlBar, toggle } from '../../shared/controls.ts';
import { C, MONTHS, alpha } from '../../shared/data.ts';

const PLANS = [
  { label: 'Free', color: C.grey, data: [20, 22, 24, 25, 27, 28], fill: 'origin' },
  { label: 'Basic', color: C.blue, data: [30, 34, 36, 40, 42, 45], fill: '-1' },
  { label: 'Plus', color: C.green, data: [38, 44, 48, 54, 58, 63], fill: '-1' },
  { label: 'Pro', color: C.amber, data: [44, 52, 58, 66, 72, 80], fill: '-1' },
] as const;

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);
  let propagate = true;

  const chart = new Chart(stage.canvas, {
    type: 'line',
    data: {
      labels: MONTHS.slice(0, 6),
      datasets: PLANS.map((p) => ({
        label: p.label,
        data: [...p.data],
        borderColor: p.color,
        backgroundColor: alpha(p.color, 0.35),
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.25,
        fill: p.fill,
      })),
    },
    options: {
      maintainAspectRatio: false,
      scales: { y: { min: 0, max: 90 } },
      plugins: { legend: { display: !ctx.preview }, filler: { propagate } },
    },
  });

  // Each plan fills down to the one before it. Hiding 'Basic' (dataset 1) leaves 'Plus'
  // pointing at a hidden target: with propagate it fills on to 'Free', without it the
  // area disappears (area.md § propagate).
  const show = (basicHidden: boolean, p: boolean): void => {
    propagate = p;
    chart.options.plugins!.filler!.propagate = p;
    chart.setDatasetVisibility(1, !basicHidden);
    chart.update();
    label.textContent = `Basic ${basicHidden ? 'hidden' : 'shown'}, propagate: ${p}`;
  };
  show(true, true);

  if (bar) {
    toggle(bar, 'propagate', true, (v) => show(!chart.isDatasetVisible(1), v));
    button(bar, 'Hide / show Basic', () => show(chart.isDatasetVisible(1), propagate));
  }
  const steps: [boolean, boolean][] = [[true, true], [true, false], [false, true]];
  const stop = ctx.preview ? cycle(steps, 2300, ([h, p]) => show(h, p)) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
