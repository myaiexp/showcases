// Stock closes skip weekends: 'time' leaves gaps, 'timeseries' packs them
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { C, days, seeded } from '../../shared/data.ts';

type Kind = 'time' | 'timeseries';
const KINDS: Kind[] = ['time', 'timeseries'];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);

  // Closing prices on weekdays only, three weeks starting Monday 5 January 2026.
  const rand = seeded(3);
  let price = 100;
  const closes = days(21, '2026-01-05')
    .filter((t) => ![0, 6].includes(new Date(t).getUTCDay()))
    .map((x) => ({ x, y: Math.round((price += (rand() - 0.45) * 4) * 10) / 10 }));

  const chart = new Chart(stage.canvas, {
    type: 'line',
    data: { datasets: [{ label: 'Close (€)', data: closes, borderColor: C.amber, backgroundColor: C.amber, pointRadius: 3 }] },
    options: { maintainAspectRatio: false, plugins: { legend: { display: !ctx.preview } } },
  });

  // timeseries.md: same options as time, but each data point gets an equal slot.
  const apply = (type: Kind): void => {
    chart.options.scales = {
      x: { type, time: { unit: 'day', displayFormats: { day: 'EEE d' } }, ticks: { source: 'data', maxRotation: 60 } },
    };
    chart.update();
    label.textContent = `type: '${type}'`;
  };
  apply('time');

  if (bar) select(bar, 'type', KINDS, 'time', apply);
  const stop = ctx.preview ? cycle(KINDS, 2600, apply) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
