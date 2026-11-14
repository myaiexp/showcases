// Energy mix as horizontal bars: ticks.align and crossAlign move the labels
import type { CartesianScaleOptions } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { C, alpha } from '../../shared/data.ts';

type Align = 'start' | 'center' | 'end' | 'inner';
type Cross = 'near' | 'center' | 'far';
const STATES: [Align, Cross][] = [
  ['center', 'near'],
  ['center', 'center'],
  ['center', 'far'],
  ['start', 'near'],
  ['end', 'near'],
  ['inner', 'near'],
];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 164 });
  const label = caption(el);

  const chart = new Chart(stage.canvas, {
    type: 'bar',
    data: {
      labels: ['Hydro', 'Wind power', 'Solar', 'Natural gas', 'Nuclear'],
      datasets: [{ label: 'Share (%)', data: [32, 24, 11, 19, 14], backgroundColor: alpha(C.green, 0.6), borderColor: C.green, borderWidth: 1 }],
    },
    options: {
      indexAxis: 'y',
      maintainAspectRatio: false,
      scales: { x: { min: 0, max: 40, ticks: { stepSize: 10 } }, y: {} },
      plugins: { legend: { display: false } },
    },
  });
  const x = (): CartesianScaleOptions => chart.options.scales!.x as CartesianScaleOptions;
  const y = (): CartesianScaleOptions => chart.options.scales!.y as CartesianScaleOptions;

  // cartesian/index.md § Tick Alignment: align runs along the axis, crossAlign across it
  // (crossAlign needs rotation 0 and an axis at an edge).
  const apply = ([align, cross]: [Align, Cross]): void => {
    x().ticks.align = align;
    y().ticks.crossAlign = cross;
    chart.update();
    label.textContent = `x align '${align}' · y crossAlign '${cross}'`;
  };
  apply(STATES[0]!);

  if (bar) {
    const now: [Align, Cross] = [...STATES[0]!];
    select(bar, 'x ticks.align', ['start', 'center', 'end', 'inner'] as const, now[0], (v) => ((now[0] = v), apply(now)));
    select(bar, 'y ticks.crossAlign', ['near', 'center', 'far'] as const, now[1], (v) => ((now[1] = v), apply(now)));
  }
  const stop = ctx.preview ? cycle(STATES, 2000, apply) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
