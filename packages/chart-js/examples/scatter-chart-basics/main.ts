// Height against weight for two groups: each dot one person
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, every } from '../../shared/stage.ts';
import { button, controlBar } from '../../shared/controls.ts';
import { C, alpha, seeded } from '../../shared/data.ts';

const START = 12;
const MAX = 80;

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);
  const rand = seeded(11);

  // Roughly normal noise: the sum of three uniform numbers, centred on zero.
  const noise = (): number => rand() + rand() + rand() - 1.5;
  const person = (height: number, kg: number, spread: number) => {
    const h = Math.round(height + noise() * 9);
    return { x: h, y: Math.round((kg + (h - height) * 0.85 + noise() * spread) * 10) / 10 };
  };

  // Scatter data is a list of {x, y} points; each dataset is one colour and one legend entry.
  const chart = new Chart(stage.canvas, {
    type: 'scatter',
    data: {
      datasets: [
        { label: 'Group A', data: [], backgroundColor: alpha(C.blue, 0.7), pointRadius: ctx.preview ? 3 : 4 },
        { label: 'Group B', data: [], backgroundColor: alpha(C.amber, 0.7), pointRadius: ctx.preview ? 3 : 4 },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        x: { min: 145, max: 200, title: { display: !ctx.preview, text: 'Height (cm)' } },
        y: { min: 40, max: 110, title: { display: !ctx.preview, text: 'Weight (kg)' } },
      },
      plugins: { legend: { display: !ctx.preview } },
    },
  });

  let total = 0;
  const addPeople = (n: number): void => {
    for (let i = 0; i < n; i++) {
      const a = i % 2 === 0;
      const ds = chart.data.datasets[a ? 0 : 1]!;
      (ds.data as { x: number; y: number }[]).push(a ? person(168, 64, 5) : person(180, 80, 6));
    }
    total += n;
    chart.update();
    label.textContent = `${total} people measured`;
  };
  const reset = (): void => {
    for (const ds of chart.data.datasets) ds.data = [];
    total = 0;
    addPeople(START);
  };
  addPeople(START);

  if (bar) {
    button(bar, 'Measure 10 more', () => addPeople(10));
    button(bar, 'Start over', reset);
  }
  // A card measures a few more people every moment, then starts over.
  const stop = ctx.preview ? every(700, () => (total >= MAX ? reset() : addPeople(4))) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
