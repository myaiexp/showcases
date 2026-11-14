// How people get to work, drawn with pattern fills instead of flat colour
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select, slider } from '../../shared/controls.ts';
import { C, alpha } from '../../shared/data.ts';
import { TILE_NAMES, tile } from './tiles.ts';

const MODES = ['flat colour', 'patterns'] as const;
type Mode = (typeof MODES)[number];

const MODES_DATA: readonly (readonly [string, number, string])[] = [
  ['Walk', 14, C.green],
  ['Bike', 22, C.cyan],
  ['Bus', 31, C.amber],
  ['Car', 33, C.red],
];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);
  const g = stage.canvas.getContext('2d')!;

  const chart = new Chart(stage.canvas, {
    type: 'bar',
    data: {
      labels: MODES_DATA.map(([name]) => name),
      datasets: [{ label: 'Share of commuters (%)', data: MODES_DATA.map(([, v]) => v), borderWidth: 2 }],
    },
    options: {
      maintainAspectRatio: false,
      scales: { y: { beginAtZero: true, max: 40 } },
      plugins: { legend: { display: false } },
    },
  });

  const apply = (mode: Mode, size: number): void => {
    const ds = chart.data.datasets[0]!;
    ds.borderColor = MODES_DATA.map(([, , color]) => color);
    ds.backgroundColor = MODES_DATA.map(([, , color], i) =>
      mode === 'patterns'
        ? // colors.md § Patterns and Gradients: createPattern() returns a CanvasPattern
          (g.createPattern(tile(TILE_NAMES[i % TILE_NAMES.length]!, color, alpha(color, 0.18), size), 'repeat') ?? color)
        : alpha(color, 0.55),
    );
    chart.update();
    label.textContent = mode === 'patterns' ? 'backgroundColor: CanvasPattern' : 'backgroundColor: string';
  };
  let mode: Mode = MODES[1];
  let size = 12;
  apply(mode, size);

  if (bar) {
    select(bar, 'fill', MODES, mode, (v) => apply((mode = v), size));
    slider(bar, 'tile size', [6, 28, 1], size, (v) => apply(mode, (size = v)));
  }
  const stop = ctx.preview ? cycle(MODES, 2000, (m) => apply((mode = m), size)) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
