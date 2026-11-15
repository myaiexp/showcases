// rollingWindow outputs: min, mean and max in one pass, drawn as a band and a line
import { areaY, defineChart, lineY, mountChart, rollingWindow } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { makeSeries } from '../../shared/xform-data.ts';
import { createStage } from '../../shared/stage.ts';

const series = makeSeries(80).filter((r) => r.series === 'alpha');

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover the mean line for the three outputs.' });

  const options = (size: number) => {
    const rows = rollingWindow(series, {
      orderBy: 'day',
      size,
      partial: false,
      outputs: { low: { value: 'value', reduce: 'min' }, mean: { value: 'value', reduce: 'mean' }, high: { value: 'value', reduce: 'max' } },
    });
    return {
      definition: defineChart({
        marks: [
          areaY(rows, { x: 'day', y1: 'low', y2: 'high', fill: '#60a5fa', fillOpacity: 0.25 }),
          lineY(rows, { x: 'day', y: 'mean', stroke: '#60a5fa', strokeWidth: 2.5 }),
        ],
        scales: { x: { scale: scaleLinear }, y: { scale: scaleLinear, nice: true, grid: true } },
        tooltip,
      }),
      height: stage.height,
      ariaLabel: 'Rolling minimum, mean and maximum',
    };
  };
  const host = stage.own(mountChart(stage.box, options(10)));
  const show = (n: number): void => {
    host.update(options(n));
    stage.say(`size ${n}: min, mean and max in one rollingWindow call`);
  };
  show(10);
  if (stage.bar) slider(stage.bar, 'size', 2, 30, 1, 10, show);
  else {
    stage.cycle([4, 10, 20], 1800, show);
    stage.ghost();
  }
  return () => stage.dispose();
};

export default mount;
