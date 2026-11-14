// FAQ: from a click on one stacked bar, get every datum of the same x value
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, every, readout } from '../../shared/chart.ts';
import { pick, rng } from '../../shared/components-data.ts';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
const TEAMS = ['Red', 'Green', 'Blue'];
const r = rng(23);
const values = MONTHS.flatMap((month) => TEAMS.map((team) => ({ month, team, sales: Math.round(10 + r() * 40) })));

const spec: ISpec = {
  type: 'bar',
  data: [{ id: 'd', values }],
  xField: 'month',
  yField: 'sales',
  seriesField: 'team',
  stack: true,
  legends: { visible: true, orient: 'top' },
};

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, spec);
  const log = ctx.preview ? null : readout(el);
  if (log) log.textContent = 'Click any segment of a bar.';

  // The click carries the one clicked datum; filter the chart's own data on its x field for the rest.
  vchart.on('click', { level: 'mark', markName: 'bar' }, (e) => {
    const month = (e.datum as { month?: string } | undefined)?.month;
    if (!month || !log) return;
    const same = values.filter((d) => d.month === month);
    log.textContent = `clicked ${month}: ${same.map((d) => `${d.team} ${d.sales}`).join(', ')} (sum ${same.reduce((s, d) => s + d.sales, 0)})`;
  });

  // The card has no pointer, so the whole stack is selected by x value through the API instead.
  let i = 0;
  const stop = every(1300, () => {
    i += 1;
    const month = pick(MONTHS, i);
    vchart.setSelected({ month });
    if (log) log.textContent = `(demo) selected month ${month}: click a bar to replace this`;
  });
  return () => {
    stop();
    release();
  };
};

export default mount;
