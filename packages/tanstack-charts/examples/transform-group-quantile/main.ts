// quantile(p): a reducer factory, so one slider value gives the median or a tail percentile
import { barY, defineChart, groupBy, mountChart, quantile } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { makeLatencies } from '../../shared/xform-data.ts';
import { createStage } from '../../shared/stage.ts';

const latencies = makeLatencies();

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const options = (p: number) => {
    const rows = groupBy(latencies, { by: 'service', outputs: { q: { value: 'latency', reduce: quantile(p) } } });
    return {
      definition: defineChart({
        marks: [barY(rows, { x: 'service', y: 'q', fill: '#fb923c' })],
        scales: {
          x: { scale: () => scaleBand<string>().padding(0.4) },
          y: { scale: scaleLinear().domain([0, 400]), grid: true, axis: { label: 'Latency (ms)' } },
        },
      }),
      height: stage.height,
      ariaLabel: 'Latency quantile per service',
    };
  };
  const host = stage.own(mountChart(stage.box, options(0.5)));
  const show = (p: number): void => {
    host.update(options(p));
    stage.say(`quantile(${p.toFixed(2)}) of latency per service`);
  };
  show(0.5);
  if (stage.bar) slider(stage.bar, 'p', 0, 1, 0.05, 0.5, show, (p) => p.toFixed(2));
  else stage.cycle([0.1, 0.5, 0.9, 0.99], 1600, show);
  return () => stage.dispose();
};

export default mount;
