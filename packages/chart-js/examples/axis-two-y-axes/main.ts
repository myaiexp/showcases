// Temperature and rainfall in one chart: each dataset reads its own y axis via yAxisID
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select, toggle } from '../../shared/controls.ts';
import { C, MONTHS, alpha } from '../../shared/data.ts';
import { CITY_WEATHER } from '../../shared/axes-data.ts';

const CITIES = Object.keys(CITY_WEATHER);

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);

  const first = CITY_WEATHER[CITIES[0]!]!;
  const chart = new Chart(stage.canvas, {
    type: 'bar',
    data: {
      labels: MONTHS,
      datasets: [
        // axes/cartesian/index.md § Axis ID: yAxisID names the scale each dataset uses.
        { label: 'Rainfall (mm)', data: first.rain, yAxisID: 'mm', backgroundColor: alpha(C.blue, 0.5), order: 2 },
        { type: 'line', label: 'Temperature (°C)', data: first.temp, yAxisID: 'celsius', borderColor: C.orange, backgroundColor: C.orange, tension: 0.3, order: 1 },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        celsius: { type: 'linear', position: 'left', min: -10, max: 30, title: { display: true, text: '°C', color: C.orange } },
        mm: {
          type: 'linear',
          position: 'right',
          min: 0,
          max: 300,
          title: { display: true, text: 'mm', color: C.blue },
          grid: { drawOnChartArea: false },
        },
      },
      plugins: { legend: { display: !ctx.preview } },
    },
  });

  const show = (city: string): void => {
    const w = CITY_WEATHER[city]!;
    chart.data.datasets[0]!.data = w.rain;
    chart.data.datasets[1]!.data = w.temp;
    chart.update();
    label.textContent = city;
  };
  show(CITIES[0]!);

  if (bar) {
    select(bar, 'City', CITIES, CITIES[0]!, show);
    toggle(bar, 'Right axis draws grid lines', false, (v) => {
      chart.options.scales!.mm!.grid!.drawOnChartArea = v;
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
