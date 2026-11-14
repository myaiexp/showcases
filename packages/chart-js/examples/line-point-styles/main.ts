// Heart-rate readings with every marker shape: pointStyle, pointRadius, colours
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select, slider } from '../../shared/controls.ts';
import { C, alpha } from '../../shared/data.ts';

const STYLES = ['circle', 'cross', 'crossRot', 'dash', 'line', 'rect', 'rectRounded', 'rectRot', 'star', 'triangle'] as const;
type Style = (typeof STYLES)[number];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);
  let radius = 9;

  const chart = new Chart(stage.canvas, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Resting heart rate (bpm)',
          data: [62, 60, 64, 59, 61, 57, 58],
          borderColor: alpha(C.pink, 0.7),
          borderWidth: 1.5,
          // configuration/elements.md § Point Configuration: the point's look.
          pointStyle: 'circle',
          pointRadius: radius,
          pointBackgroundColor: alpha(C.pink, 0.45),
          pointBorderColor: C.pink,
          pointBorderWidth: 2,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      layout: { padding: 12 },
      scales: { y: { min: 50, max: 70 } },
      plugins: { legend: { display: false } },
    },
  });

  const apply = (style: Style, r: number): void => {
    const ds = chart.data.datasets[0]!;
    ds.pointStyle = style;
    ds.pointRadius = r;
    chart.update();
    label.textContent = `pointStyle: '${style}'`;
  };
  let style: Style = 'circle';
  apply(style, radius);

  if (bar) {
    select(bar, 'pointStyle', STYLES, style, (v) => apply((style = v), radius));
    slider(bar, 'pointRadius', [0, 20, 1], radius, (v) => apply(style, (radius = v)));
  }
  const stop = ctx.preview ? cycle(STYLES, 1300, (s) => apply((style = s), radius)) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
