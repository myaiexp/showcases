// Datasets with no colours: the Colors plugin picks a palette, or is off
import type { ChartData, ChartType } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { button, controlBar, select, toggle } from '../../shared/controls.ts';
import { MONTHS } from '../../shared/data.ts';
import { DRINK_SETS } from '../../shared/general-data.ts';

type Kind = 'bar' | 'line' | 'doughnut';

/** Datasets with no backgroundColor or borderColor at all: that is the point. */
function plainData(kind: Kind, sets: number): ChartData {
  if (kind === 'doughnut') {
    return {
      labels: DRINK_SETS.map(([name]) => name),
      datasets: [{ label: 'Cups sold in June', data: DRINK_SETS.map(([, v]) => v[5] ?? 0) }],
    };
  }
  return {
    labels: MONTHS.slice(0, 6),
    datasets: DRINK_SETS.slice(0, sets).map(([label, v]) => ({ label, data: [...v] })),
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);
  let kind: Kind = 'bar';
  let enabled = true;
  let sets = 3;
  let chart: Chart | null = null;

  const build = (): void => {
    chart?.destroy();
    chart = new Chart(stage.canvas, {
      type: kind as ChartType,
      data: plainData(kind, sets),
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: { display: !ctx.preview },
          // general/colors.md: the plugin colours datasets that name no colour, and
          // forceOverride makes it colour them even when the chart has a colour set
          // somewhere (this gallery changes Chart.defaults, which counts as one).
          colors: { enabled, forceOverride: true },
        },
      },
    });
    label.textContent = `plugins.colors.enabled: ${enabled}`;
  };
  build();

  if (bar) {
    select(bar, 'chart type', ['bar', 'line', 'doughnut'] as const, kind, (v) => {
      kind = v;
      build();
    });
    toggle(bar, 'Colors plugin enabled', enabled, (v) => {
      enabled = v;
      build();
    });
    // Dynamic datasets: the plugin colours the new one too, because forceOverride is on.
    button(bar, 'Add a dataset', () => {
      if (kind === 'doughnut' || !chart || sets >= DRINK_SETS.length) return;
      const [name, figures] = DRINK_SETS[sets++]!;
      chart.data.datasets.push({ label: name, data: [...figures] });
      chart.update();
    });
  }

  const stop = ctx.preview
    ? cycle([true, false], 2000, (v) => {
        enabled = v;
        build();
      })
    : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
