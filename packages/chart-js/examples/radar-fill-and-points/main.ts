// How a radar profile is drawn: fill, line joins, tension, point shapes
import type { PointStyle } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select, slider, toggle } from '../../shared/controls.ts';
import { C, alpha } from '../../shared/data.ts';
import { SKILL_LABELS } from '../../shared/round-charts-data.ts';

const STYLES = ['circle', 'triangle', 'rect', 'rectRot', 'star', 'cross'] as const satisfies readonly PointStyle[];
const JOINS = ['miter', 'bevel', 'round'] as const;

interface Look {
  fill: boolean;
  pointStyle: (typeof STYLES)[number];
  borderJoinStyle: (typeof JOINS)[number];
  tension: number;
}
const LOOKS: Look[] = [
  { fill: false, pointStyle: 'circle', borderJoinStyle: 'miter', tension: 0 },
  { fill: true, pointStyle: 'triangle', borderJoinStyle: 'bevel', tension: 0 },
  { fill: true, pointStyle: 'rectRot', borderJoinStyle: 'round', tension: 0.3 },
  { fill: false, pointStyle: 'star', borderJoinStyle: 'round', tension: 0.5 },
];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 164 });
  const label = caption(el);

  const chart = new Chart(stage.canvas, {
    type: 'radar',
    data: {
      labels: SKILL_LABELS,
      datasets: [
        {
          label: 'Dev',
          data: [95, 40, 55, 60, 91, 35],
          borderColor: C.pink,
          backgroundColor: alpha(C.pink, 0.3),
          borderWidth: 6,
          pointBackgroundColor: C.pink,
          pointBorderColor: '#fafafa',
          pointRadius: 7,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: { r: { min: 0, max: 100, ticks: { display: false } } },
      plugins: { legend: { display: false } },
    },
  });

  const apply = (look: Look): void => {
    const ds = chart.data.datasets[0]!;
    ds.fill = look.fill;
    ds.pointStyle = look.pointStyle;
    ds.borderJoinStyle = look.borderJoinStyle;
    ds.tension = look.tension;
    chart.update();
    label.textContent = `fill: ${look.fill}, pointStyle: '${look.pointStyle}', ${look.borderJoinStyle}, tension: ${look.tension}`;
  };
  apply(LOOKS[0]!);

  if (bar) {
    const now = { ...LOOKS[1]! };
    toggle(bar, 'fill', now.fill, (v) => {
      now.fill = v;
      apply(now);
    });
    select(bar, 'pointStyle', STYLES, now.pointStyle, (v) => {
      now.pointStyle = v;
      apply(now);
    });
    select(bar, 'borderJoinStyle', JOINS, now.borderJoinStyle, (v) => {
      now.borderJoinStyle = v;
      apply(now);
    });
    slider(bar, 'tension', [0, 0.6, 0.05], now.tension, (v) => {
      now.tension = v;
      apply(now);
    });
    apply(now);
  }
  const stop = ctx.preview ? cycle(LOOKS, 2200, apply) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
