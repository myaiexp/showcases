// Tooltip modes: which points light up together when the pointer is near a line
import type { InteractionMode } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage } from '../../shared/stage.ts';
import { autoHover } from '../../shared/hover.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { drinkLines, SALES_MONTHS } from '../../shared/config-data.ts';

// interactions.md § Modes. x and y match by one coordinate only.
const MODES = ['nearest', 'point', 'index', 'dataset', 'x', 'y'] as const satisfies readonly InteractionMode[];
const CARD_MODES = ['nearest', 'index', 'dataset', 'x'] as const;

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 176 });
  const note = caption(el, "interaction.mode: 'nearest'");

  const chart = new Chart(stage.canvas, {
    type: 'line',
    data: { labels: SALES_MONTHS, datasets: drinkLines(3).map((d) => ({ ...d, pointRadius: 4, pointHoverRadius: 8 })) },
    options: {
      maintainAspectRatio: false,
      // The tooltip and the hover highlight both read options.interaction.
      interaction: { mode: 'nearest', intersect: false },
      plugins: { legend: { display: !ctx.preview } },
    },
  });

  if (bar) {
    select(bar, 'interaction.mode', MODES, 'nearest', (mode) => {
      Object.assign(chart.options.interaction!, { mode, intersect: mode === 'point' });
      chart.update();
    });
  }

  // A card has no pointer, so it activates the points each mode would pick for a hover.
  const stop = ctx.preview
    ? autoHover(chart, 1000, (s) => {
        const mode = CARD_MODES[Math.floor(s / 3) % CARD_MODES.length]!;
        const i = (s * 2 + 1) % SALES_MONTHS.length;
        note.textContent = `interaction.mode: '${mode}'`;
        const ds = s % 3 === 0 ? 1 : 2;
        const all = [0, 1, 2];
        if (mode === 'nearest') return [{ datasetIndex: ds, index: i }];
        if (mode === 'dataset') return SALES_MONTHS.map((_, index) => ({ datasetIndex: ds, index }));
        return all.map((datasetIndex) => ({ datasetIndex, index: i })); // index and x
      })
    : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
