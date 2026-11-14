// Monthly rainfall bars and a temperature line, each on its own axis
import type { ChartDataset } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select, toggle } from '../../shared/controls.ts';
import { C, MONTHS, alpha } from '../../shared/data.ts';
import { CLIMATES } from '../../shared/round-charts-data.ts';

const CITIES = Object.keys(CLIMATES);

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);
  const first = CLIMATES.Helsinki!;

  // No chart-level `type`: each dataset names its own (mixed.md), so one chart can hold both.
  const chart = new Chart(stage.canvas, {
    data: {
      labels: MONTHS,
      datasets: [
        {
          type: 'bar',
          label: 'Rain (mm)',
          data: first.rain,
          backgroundColor: alpha(C.blue, 0.6),
          borderRadius: 3,
          yAxisID: 'rain',
        },
        {
          type: 'line',
          label: 'Temperature (°C)',
          data: first.temp,
          borderColor: C.orange,
          backgroundColor: C.orange,
          tension: 0.35,
          pointRadius: ctx.preview ? 2 : 4,
          yAxisID: 'temp',
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      // Two value axes: the dataset's yAxisID picks which one it is read against.
      scales: {
        rain: { type: 'linear', position: 'left', beginAtZero: true, title: { display: !ctx.preview, text: 'Rain (mm)' } },
        temp: {
          type: 'linear',
          position: 'right',
          suggestedMin: -10,
          suggestedMax: 35,
          grid: { drawOnChartArea: false },
          title: { display: !ctx.preview, text: 'Temperature (°C)' },
        },
      },
      plugins: { legend: { display: !ctx.preview } },
    },
  });

  const show = (city: string): void => {
    const c = CLIMATES[city]!;
    chart.data.datasets[0]!.data = c.rain;
    chart.data.datasets[1]!.data = c.temp;
    chart.update();
    label.textContent = `${city}: rain bars, temp line`;
  };
  show('Helsinki');

  if (bar) {
    select(bar, 'City', CITIES, 'Helsinki', show);
    toggle(bar, 'Smooth line', true, (on) => {
      (chart.data.datasets[1] as ChartDataset<'line'>).tension = on ? 0.35 : 0;
      chart.update();
    });
  }
  const stop = ctx.preview ? cycle(CITIES, 2400, show) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
