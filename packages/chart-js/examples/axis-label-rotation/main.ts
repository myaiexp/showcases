// Long city names on a narrow axis: rotation limits and autoSkip decide
import type { CartesianScaleOptions } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, slider, toggle } from '../../shared/controls.ts';
import { C, alpha, numbers, seeded } from '../../shared/data.ts';

const CITIES = ['Helsinki', 'Espoo', 'Tampere', 'Vantaa', 'Oulu', 'Turku', 'Jyväskylä', 'Lahti', 'Kuopio', 'Pori', 'Kouvola', 'Joensuu', 'Lappeenranta', 'Hämeenlinna'];

interface Ticks {
  minRotation: number;
  maxRotation: number;
  autoSkip: boolean;
  autoSkipPadding: number;
}
const BASE: Ticks = { minRotation: 0, maxRotation: 50, autoSkip: true, autoSkipPadding: 3 };
const STATES: Ticks[] = [
  BASE,
  { ...BASE, minRotation: 90, maxRotation: 90 },
  { ...BASE, minRotation: 45, maxRotation: 45, autoSkip: false },
  { ...BASE, maxRotation: 0, autoSkipPadding: 24 },
];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 164 });
  const label = caption(el);

  const chart = new Chart(stage.canvas, {
    type: 'bar',
    data: {
      labels: CITIES,
      datasets: [{ label: 'Residents (thousands)', data: numbers(CITIES.length, 60, 650, seeded(4)), backgroundColor: alpha(C.cyan, 0.6) }],
    },
    options: { maintainAspectRatio: false, scales: { x: { ticks: {} } }, plugins: { legend: { display: false } } },
  });
  const x = (): CartesianScaleOptions => chart.options.scales!.x as CartesianScaleOptions;

  // cartesian/index.md § Common tick options: rotation limits, autoSkip and its padding.
  const apply = (t: Ticks): void => {
    Object.assign(x().ticks, t);
    chart.update();
    label.textContent = `rotation ${t.minRotation}–${t.maxRotation}°, autoSkip ${t.autoSkip}${t.autoSkipPadding > 3 ? `, pad ${t.autoSkipPadding}` : ''}`;
  };
  apply(BASE);

  if (bar) {
    const now: Ticks = { ...BASE };
    // Moves a slider's thumb and the number printed after it.
    const show = (input: HTMLInputElement, v: number): void => {
      input.value = String(v);
      if (input.nextElementSibling) input.nextElementSibling.textContent = String(v);
    };
    // The two limits push each other, so each slider moves the other's thumb too.
    const minIn = slider(bar, 'minRotation', [0, 90, 5], now.minRotation, (v) => {
      now.minRotation = v;
      now.maxRotation = Math.max(v, now.maxRotation);
      show(maxIn, now.maxRotation);
      apply(now);
    });
    const maxIn = slider(bar, 'maxRotation', [0, 90, 5], now.maxRotation, (v) => {
      now.maxRotation = v;
      now.minRotation = Math.min(v, now.minRotation);
      show(minIn, now.minRotation);
      apply(now);
    });
    toggle(bar, 'autoSkip', true, (v) => ((now.autoSkip = v), apply(now)));
    slider(bar, 'autoSkipPadding', [0, 40, 1], now.autoSkipPadding, (v) => ((now.autoSkipPadding = v), apply(now)));
  }
  const stop = ctx.preview ? cycle(STATES, 2400, apply) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
