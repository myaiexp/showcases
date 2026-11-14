// Athlete profile on a radar: angleLines are the spokes to each label
import type { RadialLinearScaleOptions } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select, slider, toggle } from '../../shared/controls.ts';
import { C, alpha } from '../../shared/data.ts';
import { SKILLS, SKILL_SCORES } from '../../shared/axes-data.ts';

interface Spokes {
  display: boolean;
  color: string;
  lineWidth: number;
  borderDash: number[];
}
const BASE: Spokes = { display: true, color: 'rgba(250, 250, 250, 0.09)', lineWidth: 1, borderDash: [] };
const STATES: Spokes[] = [
  BASE,
  { ...BASE, display: false },
  { ...BASE, color: C.amber, lineWidth: 2 },
  { ...BASE, color: C.pink, borderDash: [5, 5] },
];
const COLORS: Record<string, string> = { default: BASE.color, amber: C.amber, pink: C.pink, cyan: C.cyan };

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 164 });
  const label = caption(el);

  const chart = new Chart(stage.canvas, {
    type: 'radar',
    data: {
      labels: SKILLS,
      datasets: [{ label: 'Score', data: SKILL_SCORES, fill: true, borderColor: C.green, backgroundColor: alpha(C.green, 0.25), pointBackgroundColor: C.green }],
    },
    options: {
      maintainAspectRatio: false,
      scales: { r: { min: 0, max: 100, ticks: { display: false }, angleLines: {} } },
      plugins: { legend: { display: false } },
    },
  });
  const r = (): RadialLinearScaleOptions => chart.options.scales!.r as RadialLinearScaleOptions;

  // radial/linear.md § Angle Line Options.
  const apply = (s: Spokes): void => {
    Object.assign(r().angleLines, s);
    chart.update();
    label.textContent = s.display ? `angleLines: width ${s.lineWidth}, dash [${s.borderDash}]` : 'angleLines.display: false';
  };
  apply(BASE);

  if (bar) {
    const now: Spokes = { ...BASE, color: C.amber, lineWidth: 2 };
    apply(now);
    toggle(bar, 'display', true, (v) => ((now.display = v), apply(now)));
    select(bar, 'color', Object.keys(COLORS), 'amber', (v) => ((now.color = COLORS[v]!), apply(now)));
    slider(bar, 'lineWidth', [1, 8, 1], now.lineWidth, (v) => ((now.lineWidth = v), apply(now)));
    select(bar, 'borderDash', ['solid', 'dashed'] as const, 'solid', (v) => ((now.borderDash = v === 'solid' ? [] : [5, 5]), apply(now)));
  }
  const stop = ctx.preview ? cycle(STATES, 2200, apply) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
