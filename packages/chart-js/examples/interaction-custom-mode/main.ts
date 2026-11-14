// A homemade interaction mode: hover a month and see only the drinks above a floor
import { Interaction } from 'chart.js';
import type { Chart as ChartType, InteractionItem, InteractionModeFunction } from 'chart.js';
import { getRelativePosition } from 'chart.js/helpers';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, every } from '../../shared/stage.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { drinkLines, ghostCursor, SALES_MONTHS } from '../../shared/config-data.ts';

// interactions.md § Custom Interaction Modes: TypeScript needs the new name declared.
declare module 'chart.js' {
  interface InteractionModeMap {
    showcaseAboveFloor: InteractionModeFunction;
  }
}

// The floor each chart uses; the mode below is shared by every mount, so it looks it up.
const floors = new WeakMap<ChartType, number>();

// Interaction.modes is page-wide: the name is unique to this gallery and stays registered.
Interaction.modes.showcaseAboveFloor = function (chart, e) {
  const position = getRelativePosition(e, chart);
  const floor = floors.get(chart) ?? 0;
  // Find the month column nearest to the pointer ...
  const found: { item: InteractionItem; gap: number; value: number }[] = [];
  Interaction.evaluateInteractionItems(chart, 'x', position, (element, datasetIndex, index) => {
    const value = Number(chart.data.datasets[datasetIndex]?.data[index]);
    found.push({ item: { element, datasetIndex, index }, gap: Math.abs(element.x - position.x), value });
  });
  const nearest = Math.min(...found.map((f) => f.gap));
  // ... and keep only the items in it that reach the floor.
  return found.filter((f) => f.gap - nearest < 1 && f.value >= floor).map((f) => f.item);
};

const CARD_FLOORS = [0, 350, 500] as const;

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 176 });
  const note = caption(el);
  const ghost = ghostCursor();

  const chart = new Chart(stage.canvas, {
    type: 'line',
    data: { labels: SALES_MONTHS, datasets: drinkLines(3).map((d) => ({ ...d, pointRadius: 4, pointHoverRadius: 8 })) },
    options: {
      maintainAspectRatio: false,
      scales: { y: { min: 0, max: 700 } },
      interaction: { mode: 'showcaseAboveFloor', intersect: false },
      plugins: { legend: { display: !ctx.preview } },
    },
    plugins: ctx.preview ? [ghost.plugin] : [],
  });

  const setFloor = (v: number): void => {
    floors.set(chart, v);
    note.textContent = `showcaseAboveFloor: ${v}+ cups`;
  };
  setFloor(0);
  if (bar) slider(bar, 'Floor (cups)', [0, 650, 10], 0, setFloor);

  // The card's pointer sweeps across the months, and the floor changes on each pass.
  let step = 0;
  const stop = ctx.preview
    ? every(900, () => {
        const n = step++;
        const month = n % 6;
        if (month === 0) setFloor(CARD_FLOORS[Math.floor(n / 6) % CARD_FLOORS.length]!);
        const p = chart.getDatasetMeta(0).data[month]!;
        ghost.move(chart, p.x, chart.chartArea.top + 30);
      })
    : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
