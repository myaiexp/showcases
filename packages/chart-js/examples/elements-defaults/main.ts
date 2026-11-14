// One options.elements block restyles every bar, line, point and slice of a chart
import type { PointStyle } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select, slider } from '../../shared/controls.ts';
import { C, MONTHS, alpha } from '../../shared/data.ts';

interface Look {
  radius: number;
  tension: number;
  lineWidth: number;
  barRadius: number;
  arcWidth: number;
  pointStyle: PointStyle;
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const row = document.createElement('div');
  row.style.cssText = 'display:flex;gap:16px;width:100%;align-items:center';
  el.append(row);
  const left = document.createElement('div');
  left.style.cssText = 'flex:3;min-width:0';
  row.append(left);
  const right = ctx.preview ? null : document.createElement('div');
  if (right) {
    right.style.cssText = 'flex:1;min-width:0';
    row.append(right);
  }
  const stage = createStage(el, ctx, { previewHeight: 160, height: 300, parent: left });
  const stage2 = right ? createStage(el, ctx, { height: 300, parent: right }) : null;
  const label = caption(el);
  const look: Look = { radius: 5, tension: 0.4, lineWidth: 3, barRadius: 6, arcWidth: 2, pointStyle: 'circle' };

  // Neither dataset below sets a point, line or bar option of its own, so all of
  // them come from options.elements (configuration/elements.md).
  const chart = new Chart(stage.canvas, {
    type: 'bar',
    data: {
      labels: MONTHS.slice(0, 6),
      datasets: [
        { label: 'Revenue', order: 1, data: [42, 51, 48, 63, 70, 82], backgroundColor: alpha(C.blue, 0.6), borderColor: C.blue },
        { type: 'line', order: 0, label: 'Target', data: [40, 48, 55, 60, 68, 75], backgroundColor: alpha(C.amber, 0.8), borderColor: C.amber },
      ],
    },
    options: {
      maintainAspectRatio: false,
      elements: {
        bar: { borderRadius: look.barRadius, borderWidth: 1 },
        line: { tension: look.tension, borderWidth: look.lineWidth },
        point: { radius: look.radius, pointStyle: look.pointStyle },
      },
      plugins: { legend: { display: !ctx.preview } },
    },
  });
  const donut = stage2
    ? new Chart(stage2.canvas, {
        type: 'doughnut',
        data: {
          labels: ['Rent', 'Staff', 'Beans', 'Other'],
          datasets: [{ data: [30, 40, 20, 10], backgroundColor: [C.blue, C.amber, C.green, C.purple].map((c) => alpha(c, 0.7)), borderColor: '#0b0b0f' }],
        },
        options: {
          maintainAspectRatio: false,
          elements: { arc: { borderWidth: look.arcWidth } },
          plugins: { legend: { display: false } },
        },
      })
    : null;

  const apply = (): void => {
    const e = chart.options.elements!; // read again after every update
    e.point!.radius = look.radius;
    e.point!.pointStyle = look.pointStyle;
    e.line!.tension = look.tension;
    e.line!.borderWidth = look.lineWidth;
    e.bar!.borderRadius = look.barRadius;
    chart.update();
    if (donut) {
      donut.options.elements!.arc!.borderWidth = look.arcWidth;
      donut.update();
    }
    label.textContent = `point.radius ${look.radius} · line.tension ${look.tension} · bar.borderRadius ${look.barRadius}`;
  };
  apply();

  if (bar) {
    slider(bar, 'point.radius', [0, 14, 1], look.radius, (v) => ((look.radius = v), apply()));
    select(bar, 'point.pointStyle', ['circle', 'rect', 'triangle', 'star', 'rectRot'] as const, 'circle', (v) => ((look.pointStyle = v), apply()));
    slider(bar, 'line.tension', [0, 0.8, 0.05], look.tension, (v) => ((look.tension = v), apply()));
    slider(bar, 'line.borderWidth', [1, 10, 1], look.lineWidth, (v) => ((look.lineWidth = v), apply()));
    slider(bar, 'bar.borderRadius', [0, 20, 1], look.barRadius, (v) => ((look.barRadius = v), apply()));
    slider(bar, 'arc.borderWidth', [0, 12, 1], look.arcWidth, (v) => ((look.arcWidth = v), apply()));
  }
  const presets: Partial<Look>[] = [
    { radius: 2, tension: 0, lineWidth: 2, barRadius: 0 },
    { radius: 8, tension: 0.5, lineWidth: 5, barRadius: 14, pointStyle: 'rectRot' },
    { radius: 5, tension: 0.4, lineWidth: 3, barRadius: 6, pointStyle: 'circle' },
  ];
  const stop = ctx.preview ? cycle(presets, 1900, (p) => (Object.assign(look, p), apply())) : () => {};

  return () => {
    stop();
    stage.release(chart);
    if (donut && stage2) stage2.release(donut);
  };
};

export default mount;
