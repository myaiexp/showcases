// Weekly profit and loss: grace adds room above and below so no bar touches the edge
import type { LinearScaleOptions } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { C } from '../../shared/data.ts';

// A string ending in % is a share of the range; a number is in data units.
const GRACES: (number | string)[] = [0, '10%', '25%', 40, 100];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);

  const profit = [120, -60, 90, 150, -30, 110];
  const chart = new Chart(stage.canvas, {
    type: 'bar',
    data: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
      datasets: [
        {
          label: 'Profit (€)',
          data: profit,
          backgroundColor: profit.map((v) => (v < 0 ? C.red : C.green)),
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      // linear.md § Grace: added to the data maximum and subtracted from the minimum.
      scales: { y: { grace: 0 } },
      plugins: { legend: { display: false } },
    },
  });
  const y = (): LinearScaleOptions => chart.options.scales!.y as LinearScaleOptions;

  const apply = (grace: number | string): void => {
    y().grace = grace;
    chart.update();
    label.textContent = `grace: ${typeof grace === 'string' ? `'${grace}'` : grace}`;
  };
  apply(GRACES[0]!);

  if (bar) {
    const names = GRACES.map(String);
    select(bar, 'grace', names, '0', (v) => apply(v.endsWith('%') ? v : Number(v)));
  }
  const stop = ctx.preview ? cycle(GRACES, 2000, apply) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
