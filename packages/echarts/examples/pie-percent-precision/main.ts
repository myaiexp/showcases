// percentPrecision: how many decimals {d} and params.percent carry in a label formatter
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select, slider } from '../../shared/chart.ts';

// Values chosen so the shares are long fractions (1/3, 2/7, ...).
const data = [
  { name: 'Alpha', value: 1 },
  { name: 'Beta', value: 2 },
  { name: 'Gamma', value: 3 },
  { name: 'Delta', value: 7 },
  { name: 'Epsilon', value: 11 },
];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);

  const look = { precision: 2, format: 'callback' };
  const apply = (): void => {
    chart.setOption({
      tooltip: { trigger: 'item', formatter: '{b}: {d}%' },
      series: [
        {
          type: 'pie',
          radius: ctx.preview ? '60%' : '58%',
          center: ['50%', ctx.preview ? '50%' : '52%'],
          // Decimals kept in the percentage handed to formatters and tooltips (default 2).
          percentPrecision: look.precision,
          label: {
            fontSize: ctx.preview ? 11 : 13,
            // A string template uses {d} for the percentage; a callback gets it as params.percent.
            formatter:
              look.format === 'callback'
                ? (p: { name: string; percent?: number }) => `${p.name}\n${p.percent}%`
                : '{b}\n{d}%',
          },
          data,
        },
      ],
    });
  };
  apply();

  let stop = (): void => {};
  if (ctx.preview) {
    let n = 0;
    stop = every(1200, () => {
      n += 1;
      look.precision = n % 5;
      apply();
    });
  } else {
    slider(bar!, 'percentPrecision', [0, 6, 1], look.precision, (v) => { look.precision = v; apply(); });
    select(bar!, 'formatter', ['callback', 'template'], (v) => { look.format = v; apply(); });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
