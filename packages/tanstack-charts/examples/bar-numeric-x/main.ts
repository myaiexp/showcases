// barY on a linear x scale: width comes from the smallest gap between positions
import { barY, defineChart, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const all = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021].map((year, i) => ({ year, units: [12, 18, 15, 26, 31, 22, 40, 37][i]! }));
const sparse = all.filter((r) => ![2016, 2017].includes(r.year));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const chart = (rows: typeof all) =>
    defineChart({
      svgAnimation: true,
      marks: [barY(rows, { x: 'year', y: 'units', key: 'year' })],
      scales: {
        x: { scale: scaleLinear, nice: false, axis: { label: 'Year' } },
        y: { scale: scaleLinear, nice: true, grid: true },
      },
    });

  const options = { definition: chart(all), height: stage.height, initialWidth: 640, ariaLabel: 'Units by year on a numeric axis' };
  const host = stage.own(mountChart(stage.box, options));
  const show = (thin: boolean): void => host.update({ ...options, definition: chart(thin ? sparse : all) });

  if (stage.bar) checkbox(stage.bar, 'drop 2016 and 2017', false, show);
  else stage.cycle([false, true], 2400, show);
  return () => stage.dispose();
};

export default mount;
