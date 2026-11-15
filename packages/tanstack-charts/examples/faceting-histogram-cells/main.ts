// facetChart where every cell runs binX on its own rows over one shared bin domain
import { binX, facetChart, mountChart, rect } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { makeLatencies } from '../../shared/xform-data.ts';
import { createStage } from '../../shared/stage.ts';

const latencies = makeLatencies(500).map((l, i) => ({ ...l, service: ['auth', 'search', 'media'][i % 3]! }));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const options = (thresholds: number) => ({
    definition: facetChart(latencies, {
      by: 'service',
      columns: 3,
      chart: (data) => ({
        marks: [rect(binX(data, { value: 'latency', thresholds, domain: [0, 400] }), { x1: 'x1', x2: 'x2', y1: () => 0, y2: 'value', fill: '#60a5fa', inset: 0.5 })],
        scales: { x: { scale: scaleLinear().domain([0, 400]) }, y: { scale: scaleLinear().domain([0, 60]), grid: true } },
      }),
    }),
    height: stage.height,
    ariaLabel: 'Latency histogram per service',
  });
  const host = stage.own(mountChart(stage.box, options(16)));
  const show = (n: number): void => {
    host.update(options(n));
    stage.say(`${n} bins per cell, domain [0, 400] everywhere`);
  };
  show(16);
  if (stage.bar) slider(stage.bar, 'bins', 4, 40, 1, 16, show);
  else stage.cycle([8, 16, 32], 1800, show);
  return () => stage.dispose();
};

export default mount;
