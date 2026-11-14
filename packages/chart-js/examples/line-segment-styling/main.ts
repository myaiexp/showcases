// Revenue solid, forecast dashed: `segment` styles each piece of line
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { C, MONTHS } from '../../shared/data.ts';

const REVENUE = [41, 44, 43, 49, 53, 52, 58, 61, 60, 66, 69, 74];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);
  let lastActual = 7; // index of the last month with real figures

  // line.md § Segment: these functions run once per piece of line between two points.
  // p1DataIndex is the point the piece ends at; pieces ending after the last real
  // month are forecast.
  const forecast = <T>(then: T) => (c: { p1DataIndex: number }): T | undefined => (c.p1DataIndex > lastActual ? then : undefined);
  const chart = new Chart(stage.canvas, {
    type: 'line',
    data: {
      labels: MONTHS,
      datasets: [
        {
          label: 'Revenue (k€)',
          data: REVENUE,
          borderColor: C.green,
          borderWidth: 2.5,
          pointRadius: 3,
          pointBackgroundColor: C.green,
          segment: {
            borderDash: forecast([7, 5]),
            borderColor: forecast(C.amber),
          },
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: { y: { min: 30, max: 80 } },
      plugins: { legend: { display: false } },
    },
  });

  const setSplit = (i: number): void => {
    lastActual = i;
    chart.update();
    label.textContent = `solid up to ${MONTHS[i]}, dashed after`;
  };
  setSplit(lastActual);

  if (bar) slider(bar, 'Last month of real figures (0 = Jan)', [0, 11, 1], lastActual, setSplit);
  const stop = ctx.preview ? cycle([4, 7, 9, 11, 2], 1800, setSplit) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
