// Derived rows: binX turns raw observations into bins before the mark, and rect draws them
import { binX, defineChart, mountChart, rect } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { normal, rng } from '../../shared/random.ts';
import { createStage } from '../../shared/stage.ts';

const next = normal(rng(17), 120, 25);
const observations = Array.from({ length: 400 }, (_, i) => ({ id: `o${i}`, latency: Math.max(10, next()) }));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'More thresholds, narrower bins. The transform runs beside the definition, not inside the mark.' });

  const build = (thresholds: number) => {
    const bins = binX(observations, { value: 'latency', thresholds });
    return defineChart({
      marks: [rect(bins, { x1: 'x1', x2: 'x2', y1: () => 0, y2: 'value', fill: '#60a5fa', inset: 0.5 })],
      scales: {
        x: { scale: scaleLinear, nice: true, axis: { label: 'Latency (ms)' } },
        y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Requests' } },
      },
      tooltip,
    });
  };

  const options = (n: number) => ({ definition: build(n), height: stage.height, ariaLabel: 'Latency histogram' });
  const host = stage.own(mountChart(stage.box, options(20)));
  if (stage.bar) slider(stage.bar, 'thresholds', 5, 60, 1, 20, (n) => host.update(options(n)));
  else stage.cycle([8, 20, 45], 1800, (n) => host.update(options(n)));
  return () => stage.dispose();
};

export default mount;
