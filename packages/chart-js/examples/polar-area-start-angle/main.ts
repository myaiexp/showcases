// Turn a polar area chart by changing where its radial scale starts (startAngle)
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, slider, toggle } from '../../shared/controls.ts';
import { ACTIVITY, ACTIVITY_LABELS, SLICE_BORDER, sliceColors } from '../../shared/round-charts-data.ts';

const ANGLES = [0, 60, 120, 200, 300];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);

  const chart = new Chart(stage.canvas, {
    type: 'polarArea',
    data: {
      labels: ACTIVITY_LABELS,
      datasets: [
        {
          label: 'Minutes a week',
          data: ACTIVITY,
          backgroundColor: sliceColors(ACTIVITY_LABELS.length, 0.7),
          borderColor: SLICE_BORDER,
          borderWidth: 1,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        r: {
          // Degrees; 0 puts the first slice's edge at the top (axes/radial/linear.md).
          startAngle: 0,
          angleLines: { display: true },
          ticks: { display: !ctx.preview },
        },
      },
      plugins: { legend: { display: !ctx.preview, position: 'right' } },
    },
  });
  // Read scales.r on every change: update() re-merges the scale options into new objects.
  const r = (): object => chart.options.scales!.r!;

  const setAngle = (deg: number): void => {
    // The shared scale type has no startAngle in its union; the radial scale does.
    (r() as { startAngle?: number }).startAngle = deg;
    chart.update();
    label.textContent = `scales.r.startAngle: ${deg}`;
  };
  setAngle(0);

  if (bar) {
    slider(bar, 'startAngle (°)', [0, 360, 5], 0, setAngle);
    toggle(bar, 'Angle lines', true, (on) => {
      (r() as { angleLines?: { display: boolean } }).angleLines = { display: on };
      chart.update();
    });
  }
  const stop = ctx.preview ? cycle(ANGLES, 1800, setAngle) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
