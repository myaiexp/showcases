// The getting-started bar chart: votes for six mug colours
import type { Mount } from '@/types.ts';
import { Chart, createStage, every } from '../../shared/stage.ts';
import { button, controlBar } from '../../shared/controls.ts';
import { seeded } from '../../shared/data.ts';

// The mug colours people can vote for, drawn in their own colour.
const COLOURS = [
  ['Red', '#ef4444'],
  ['Blue', '#58a6ff'],
  ['Yellow', '#e8a308'],
  ['Green', '#22c55e'],
  ['Purple', '#bc8cff'],
  ['Orange', '#f97316'],
] as const;

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx);
  const rand = seeded(5);

  // getting-started/index.md: a canvas, a chart type, labels, one dataset.
  const chart = new Chart(stage.canvas, {
    type: 'bar',
    data: {
      labels: COLOURS.map(([name]) => name),
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1,
          backgroundColor: COLOURS.map(([, c]) => `${c}99`),
          borderColor: COLOURS.map(([, c]) => c),
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: { y: { beginAtZero: true } },
    },
  });

  const votes = chart.data.datasets[0]!.data as number[];
  const vote = (i: number): void => {
    votes[i] = (votes[i] ?? 0) + 1;
    chart.update();
  };

  if (bar) COLOURS.forEach(([name], i) => button(bar, `Vote ${name}`, () => vote(i)));
  // A card has no buttons: votes arrive on their own.
  const stop = ctx.preview ? every(900, () => vote(Math.floor(rand() * COLOURS.length))) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
