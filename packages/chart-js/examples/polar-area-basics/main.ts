// Mean wind speed by compass direction: equal slice angles, the reach carries the value
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select, toggle } from '../../shared/controls.ts';
import { SLICE_BORDER, WIND, WIND_LABELS, sliceColors } from '../../shared/round-charts-data.ts';

const SEASONS = Object.keys(WIND);

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);

  const chart = new Chart(stage.canvas, {
    type: 'polarArea',
    data: {
      labels: WIND_LABELS,
      datasets: [
        {
          label: 'Wind speed (m/s)',
          data: WIND.Winter!,
          backgroundColor: sliceColors(WIND_LABELS.length, 0.7),
          borderColor: SLICE_BORDER,
          borderWidth: 1,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      // Every slice gets the same angle; the radial scale (scales.r) sets the reach.
      scales: { r: { suggestedMin: 0, suggestedMax: 8, ticks: { display: !ctx.preview } } },
      plugins: { legend: { display: false } },
    },
  });

  const show = (season: string): void => {
    chart.data.datasets[0]!.data = WIND[season]!;
    chart.update();
    label.textContent = `${season}: longest reach ${WIND_LABELS[WIND[season]!.indexOf(Math.max(...WIND[season]!))]}`;
  };
  show('Winter');

  if (bar) {
    select(bar, 'Season', SEASONS, 'Winter', show);
    toggle(bar, 'Scale numbers', true, (on) => {
      chart.options.scales!.r!.ticks!.display = on;
      chart.update();
    });
  }
  const stop = ctx.preview ? cycle(SEASONS, 2200, show) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
