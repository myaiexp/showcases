// A doughnut whose hole grows from nothing (a pie) to a thin ring
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select, slider } from '../../shared/controls.ts';
import { BUDGET, BUDGET_LABELS, SLICE_BORDER, sliceColors } from '../../shared/round-charts-data.ts';

const STEPS = ['0%', '25%', '50%', '75%', '90%', '60px'];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);

  const chart = new Chart(stage.canvas, {
    type: 'doughnut',
    data: {
      labels: BUDGET_LABELS,
      datasets: [
        {
          label: '% of pay',
          data: BUDGET.January!,
          backgroundColor: sliceColors(BUDGET_LABELS.length),
          borderColor: SLICE_BORDER,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      // cutout: a string ending in % is a share of the radius, a number is pixels.
      cutout: '50%',
      plugins: { legend: { display: !ctx.preview, position: 'right' } },
    },
  });

  const setCutout = (value: string | number): void => {
    chart.options.cutout = value;
    chart.update();
    label.textContent = `cutout: ${typeof value === 'number' ? value : `'${value}'`}`;
  };
  setCutout('50%');

  if (bar) {
    let unit: 'percent' | 'pixels' = 'percent';
    let percent = 50;
    let pixels = 60;
    const apply = (): void => setCutout(unit === 'percent' ? `${percent}%` : pixels);
    select(bar, 'Unit', ['percent', 'pixels'] as const, unit, (v) => {
      unit = v;
      apply();
    });
    slider(bar, 'Percent', [0, 95, 5], percent, (v) => {
      percent = v;
      if (unit === 'percent') apply();
    });
    slider(bar, 'Pixels', [0, 160, 5], pixels, (v) => {
      pixels = v;
      if (unit === 'pixels') apply();
    });
  }
  const stop = ctx.preview ? cycle(STEPS, 1800, (s) => setCutout(s.endsWith('px') ? parseInt(s, 10) : s)) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
