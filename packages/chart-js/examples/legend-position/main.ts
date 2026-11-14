// The legend moves around the chart: position picks the side, align the end
import type { LayoutPosition } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { drinkLines, SALES_MONTHS } from '../../shared/config-data.ts';

// legend.md § Position and § Align.
const POSITIONS = ['top', 'left', 'bottom', 'right', 'chartArea'] as const satisfies readonly LayoutPosition[];
const ALIGNS = ['start', 'center', 'end'] as const;
type Position = (typeof POSITIONS)[number];
type Align = (typeof ALIGNS)[number];

const CARD_STATES: readonly [Position, Align][] = [
  ['top', 'center'],
  ['top', 'start'],
  ['right', 'center'],
  ['bottom', 'end'],
  ['left', 'center'],
  ['chartArea', 'center'],
];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 176 });
  const note = caption(el);

  const chart = new Chart(stage.canvas, {
    type: 'line',
    data: { labels: SALES_MONTHS, datasets: drinkLines(3) },
    options: {
      maintainAspectRatio: false,
      // A card is narrow, so its legend uses smaller boxes and text.
      plugins: { legend: { position: 'top', align: 'center', labels: ctx.preview ? { boxWidth: 18, padding: 8, font: { size: 10 } } : {} } },
    },
  });

  const legend = chart.options.plugins!.legend!;
  const apply = (position: Position, align: Align): void => {
    legend.position = position;
    legend.align = align;
    note.textContent = `position: '${position}', align: '${align}'`;
    chart.update();
  };

  let state: [Position, Align] = ['top', 'center'];
  if (bar) {
    select(bar, 'position', POSITIONS, 'top', (v) => apply(v, state[1]));
    select(bar, 'align', ALIGNS, 'center', (v) => apply(state[0], v));
  }
  const stop = ctx.preview
    ? cycle(CARD_STATES, 2000, (s) => {
        state = [...s];
        apply(...s);
      })
    : () => {};
  note.textContent = `position: 'top', align: 'center'`;

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
