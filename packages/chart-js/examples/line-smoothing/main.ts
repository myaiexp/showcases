// CPU load drawn straight, curved by tension, or monotone
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select, slider } from '../../shared/controls.ts';
import { C } from '../../shared/data.ts';

// Flat stretches next to sudden jumps are where plain smoothing overshoots.
const LOAD = [12, 12, 14, 13, 78, 80, 79, 81, 22, 20, 21, 55, 56, 54];
const MODES = ['default', 'monotone'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);
  let tension = 0;
  let mode: Mode = 'default';

  const chart = new Chart(stage.canvas, {
    type: 'line',
    data: {
      labels: LOAD.map((_, i) => `${i + 8}:00`),
      datasets: [{ label: 'CPU load (%)', data: LOAD, borderColor: C.cyan, borderWidth: 2, pointRadius: 3, pointBackgroundColor: C.cyan }],
    },
    options: {
      maintainAspectRatio: false,
      scales: { y: { min: 0, max: 100 } },
      plugins: { legend: { display: false } },
    },
  });

  // line.md: tension 0 draws straight segments, higher values curve them. 'monotone'
  // ignores tension and never overshoots between points.
  const apply = (): void => {
    const ds = chart.data.datasets[0]!;
    ds.tension = tension;
    ds.cubicInterpolationMode = mode;
    chart.update();
    label.textContent = mode === 'monotone' ? "cubicInterpolationMode: 'monotone'" : `tension: ${tension}`;
  };
  apply();

  if (bar) {
    slider(bar, 'tension', [0, 0.8, 0.05], tension, (v) => ((tension = v), apply()));
    select(bar, 'cubicInterpolationMode', MODES, mode, (v) => ((mode = v), apply()));
  }
  const steps: [number, Mode][] = [[0, 'default'], [0.4, 'default'], [0.8, 'default'], [0.4, 'monotone']];
  const stop = ctx.preview ? cycle(steps, 2000, ([t, m]) => ((tension = t), (mode = m), apply())) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
