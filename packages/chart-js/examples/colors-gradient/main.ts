// A day of temperatures filled with a gradient rebuilt from the chart area
import type { ChartArea, ScriptableContext } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select, toggle } from '../../shared/controls.ts';
import { C, alpha } from '../../shared/data.ts';

const PALETTES = {
  sunrise: [C.amber, C.red],
  ocean: [C.cyan, C.blue],
  forest: [C.green, C.cyan],
} as const;
type Palette = keyof typeof PALETTES;

const HOURS = ['00', '03', '06', '09', '12', '15', '18', '21'];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);
  let palette: Palette = 'sunrise';
  let filled = true;

  // A gradient is built for a pixel rectangle, so it is cached per chart-area size.
  let cached: { key: string; fill: CanvasGradient; line: CanvasGradient } | null = null;
  const gradients = (c: ChartArea): NonNullable<typeof cached> => {
    const key = `${palette}:${c.left}:${c.top}:${c.right}:${c.bottom}`;
    if (cached?.key === key) return cached;
    const [from, to] = PALETTES[palette];
    const g = stage.canvas.getContext('2d')!;
    // colors.md: a CanvasGradient can be used wherever a colour string can.
    const fill = g.createLinearGradient(0, c.top, 0, c.bottom);
    fill.addColorStop(0, alpha(to, 0.75));
    fill.addColorStop(1, alpha(from, 0));
    const line = g.createLinearGradient(c.left, 0, c.right, 0);
    line.addColorStop(0, from);
    line.addColorStop(1, to);
    return (cached = { key, fill, line });
  };

  const chart = new Chart(stage.canvas, {
    type: 'line',
    data: {
      labels: HOURS,
      datasets: [
        {
          label: 'Temperature (°C)',
          data: [6, 4, 5, 11, 17, 21, 15, 9],
          tension: 0.4,
          borderWidth: 3,
          pointRadius: 0,
          fill: true,
          // Scriptable options (options.md) run on every draw, once chartArea exists.
          backgroundColor: (c: ScriptableContext<'line'>) =>
            filled && c.chart.chartArea ? gradients(c.chart.chartArea).fill : alpha(C.amber, 0.25),
          borderColor: (c: ScriptableContext<'line'>) =>
            c.chart.chartArea ? gradients(c.chart.chartArea).line : C.amber,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: { y: { min: 0, max: 25 } },
      plugins: { legend: { display: false } },
    },
  });

  const apply = (p: Palette): void => {
    palette = p; // the functions above read this variable, so the chart must redraw
    chart.update();
    label.textContent = `gradient: ${PALETTES[p].join(' → ')}`;
  };
  apply(palette);

  if (bar) {
    select(bar, 'colours', Object.keys(PALETTES) as Palette[], palette, apply);
    toggle(bar, 'Gradient under the line', filled, (v) => {
      filled = v;
      chart.update();
    });
  }
  const stop = ctx.preview ? cycle(Object.keys(PALETTES) as Palette[], 2000, (p) => apply(p)) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
