// Formatter plugin: {variable} templates in labels and tooltips
import type { Mount } from '@/types.ts';
import { createChart, every } from '../../shared/chart.ts';
import { dimensionTour } from '../../shared/components-data.ts';

const YEARS = ['2016', '2017', '2018', '2019', '2020'];
const rows = YEARS.map((year, i) => ({ year, population: 899447 + i * 61234 + ((i * 7919) % 5000), city: 'Springfield' }));

const mount: Mount = (el, ctx) => {
  const build = (shift: number): never =>
    ({
      type: 'bar',
      data: [{ id: 'pop', values: rows.map((r, i) => ({ ...r, population: r.population + shift * ((i % 3) - 1) * 4000 })) }],
      xField: 'year',
      yField: 'population',
      // Several fields in one string: every {name} is replaced from the datum.
      label: { visible: true, formatter: '{year}: {population:,.0f}', position: 'top', style: { fill: '#E6E9F2', fontSize: ctx.preview ? 8 : 12 } },
      tooltip: {
        dimension: {
          title: { value: '{city}, year {year}' },
          content: [{ key: 'population', keyFormatter: 'The population in {year} year is', value: '{population}', valueFormatter: '{population:,.0f}' }],
        },
      },
      axes: [
        { orient: 'bottom', type: 'band' },
        { orient: 'left', type: 'linear', label: { formatter: '{label:~s}' } },
      ],
    }) as never;

  const { vchart, release } = createChart(el, ctx, build(0));
  let released = false;
  let k = 0;
  const stopData = every(2600, () => {
    if (released) return;
    k += 1;
    void vchart.updateSpec(build(k % 3));
  });
  // The tooltip text shows the template output too; walk it across the years.
  const stopTour = dimensionTour(vchart, YEARS, 1400);

  return () => {
    released = true;
    stopData();
    stopTour();
    release();
  };
};

export default mount;
