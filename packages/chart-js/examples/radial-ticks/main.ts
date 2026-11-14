// Athlete profile on a radar: how many rings, their numbers and backdrops
import type { RadialLinearScaleOptions } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, slider, toggle } from '../../shared/controls.ts';
import { C, alpha } from '../../shared/data.ts';
import { SKILLS, SKILL_SCORES } from '../../shared/axes-data.ts';

interface Rings {
  count: number;
  backdrop: boolean;
  padding: number;
  grid: string;
}
const GRID = 'rgba(250, 250, 250, 0.15)';
const STATES: Rings[] = [
  { count: 6, backdrop: false, padding: 2, grid: GRID },
  { count: 3, backdrop: false, padding: 2, grid: GRID },
  { count: 6, backdrop: true, padding: 2, grid: GRID },
  { count: 6, backdrop: true, padding: 8, grid: GRID },
  { count: 5, backdrop: false, padding: 2, grid: C.amber },
];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 164 });
  const label = caption(el);

  const chart = new Chart(stage.canvas, {
    type: 'radar',
    data: {
      labels: SKILLS,
      datasets: [{ label: 'Score', data: SKILL_SCORES, fill: true, borderColor: C.cyan, backgroundColor: alpha(C.cyan, 0.2), pointBackgroundColor: C.cyan }],
    },
    options: {
      maintainAspectRatio: false,
      scales: { r: { min: 0, max: 100, ticks: { backdropColor: alpha(C.purple, 0.5) }, grid: {} } },
      plugins: { legend: { display: false } },
    },
  });
  const r = (): RadialLinearScaleOptions => chart.options.scales!.r as RadialLinearScaleOptions;

  // radial/linear.md § Tick Configuration (count) and axes/_common_ticks.md (backdrop).
  const apply = (s: Rings): void => {
    r().ticks.count = s.count;
    r().ticks.showLabelBackdrop = s.backdrop;
    r().ticks.backdropPadding = s.padding;
    r().grid.color = s.grid;
    chart.update();
    label.textContent = `count ${s.count}, backdrop ${s.backdrop ? `on (pad ${s.padding})` : 'off'}`;
  };
  apply(STATES[0]!);

  if (bar) {
    const now: Rings = { ...STATES[0]! };
    slider(bar, 'ticks.count', [2, 11, 1], now.count, (v) => ((now.count = v), apply(now)));
    toggle(bar, 'showLabelBackdrop', false, (v) => ((now.backdrop = v), apply(now)));
    slider(bar, 'backdropPadding', [0, 12, 1], now.padding, (v) => ((now.padding = v), apply(now)));
    toggle(bar, 'amber grid', false, (v) => ((now.grid = v ? C.amber : GRID), apply(now)));
  }
  const stop = ctx.preview ? cycle(STATES, 2200, apply) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
