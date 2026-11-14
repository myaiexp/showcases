// Stepped colour policies: quantize splits the range evenly, quantile splits the data evenly, threshold uses your cut points
import { colorLegend, defineChart, dot, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleQuantile, scaleQuantize, scaleThreshold } from 'd3-scale';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { clusters } from '../../shared/concepts-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = clusters(14, 30);
const steps = ['#93c5fd', '#60a5fa', '#2563eb', '#1e3a8a'];
type Kind = 'quantize' | 'quantile' | 'threshold';
const kinds: readonly (readonly [Kind, string])[] = [['quantize', 'scaleQuantize'], ['quantile', 'scaleQuantile'], ['threshold', 'scaleThreshold at 3500, 4200, 5000']];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const build = (kind: Kind) =>
    defineChart({
      marks: [dot(rows, { x: 'x', y: 'y', color: 'size', r: 5 })],
      scales: {
        x: { scale: scaleLinear, nice: true, grid: true },
        y: { scale: scaleLinear, nice: true, grid: true },
      },
      color: {
        scale: kind === 'quantize' ? () => scaleQuantize<string>().range(steps) : kind === 'quantile' ? () => scaleQuantile<string>().range(steps) : scaleThreshold<number, string>([3500, 4200, 5000], steps),
        legend: colorLegend({ label: 'Body mass' }),
      },
    });

  const options = (kind: Kind) => ({ definition: build(kind), height: stage.height, ariaLabel: 'Scatter with stepped colours' });
  const host = stage.own(mountChart(stage.box, options('quantize')));
  const show = (kind: Kind, label: string): void => {
    host.update(options(kind));
    stage.say(label);
  };
  if (stage.bar) select(stage.bar, 'policy', kinds, (k) => show(k, ''));
  else stage.cycle(kinds, 1900, ([k, label]) => show(k, label));
  return () => stage.dispose();
};

export default mount;
