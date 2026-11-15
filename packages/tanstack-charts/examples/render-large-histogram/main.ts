// A histogram with fixed edges: output size follows the bins, not the 30,000 samples
import { defineChart, mountChart, rect } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { normal, rng } from '../../shared/random.ts';
import { createStage } from '../../shared/stage.ts';

const next = normal(rng(12), 50, 14);
const samples = Float64Array.from({ length: 30000 }, () => next());

function histogram(bins: number) {
  const lo = 0;
  const hi = 100;
  const width = (hi - lo) / bins;
  const counts = new Array<number>(bins).fill(0);
  for (const v of samples) counts[Math.min(bins - 1, Math.max(0, Math.floor((v - lo) / width)))]!++;
  return counts.map((count, i) => ({ id: `bin${i}`, x1: lo + i * width, x2: lo + (i + 1) * width, count }));
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change the bin count: the samples are counted again, and the totals still match.' });
  if (stage.preview) stage.height -= 34;
  const readout = stage.preview ? null : stage.readout();

  const options = (bins: number) => {
    const rows = histogram(bins);
    const text = `source ${samples.length} samples, bins ${rows.length}, sum of bin counts ${rows.reduce((s, r) => s + r.count, 0)}`;
    if (readout) readout.textContent = text;
    else stage.say(text);
    return {
      definition: defineChart({
        marks: [rect(rows, { x1: 'x1', x2: 'x2', y1: () => 0, y2: 'count', key: 'id', inset: 0.5, fill: '#60a5fa' })],
        scales: { x: { scale: scaleLinear, nice: true }, y: { scale: scaleLinear, nice: true, grid: true } },
        tooltip,
      }),
      height: stage.height,
      initialWidth: 640,
      ariaLabel: 'Histogram of 30,000 samples',
    };
  };
  const host = stage.own(mountChart(stage.box, options(25)));
  if (stage.bar) slider(stage.bar, 'bins', 5, 80, 1, 25, (v) => host.update(options(v)));
  else {
    stage.cycle([10, 25, 60], 1800, (v) => host.update(options(v)));
    stage.ghost();
  }
  return () => stage.dispose();
};

export default mount;
