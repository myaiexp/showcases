// City populations from a village to Tokyo: a log axis keeps every bar readable
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { C, alpha } from '../../shared/data.ts';

type Kind = 'linear' | 'logarithmic';
const KINDS: Kind[] = ['linear', 'logarithmic'];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);

  const chart = new Chart(stage.canvas, {
    type: 'bar',
    data: {
      labels: ['Tokyo', 'Helsinki', 'Tampere', 'Kuopio', 'Hanko', 'Utsjoki'],
      datasets: [
        {
          label: 'Population',
          data: [37_000_000, 660_000, 260_000, 125_000, 8_800, 1_200],
          backgroundColor: alpha(C.purple, 0.7),
          borderColor: C.purple,
          borderWidth: 1,
        },
      ],
    },
    options: {
      indexAxis: 'y',
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
    },
  });

  // time.md § Changing the scale type: swap the whole scale object and update. The value
  // axis of a horizontal bar chart is 'x'. logarithmic.md: ticks.format takes Intl options.
  const apply = (type: Kind): void => {
    chart.options.scales = { x: { type, ticks: { format: { notation: 'compact' } } } };
    chart.update();
    label.textContent = `type: '${type}'`;
  };
  apply('linear');

  if (bar) select(bar, 'type', KINDS, 'linear', apply);
  const stop = ctx.preview ? cycle(KINDS, 2600, apply) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
