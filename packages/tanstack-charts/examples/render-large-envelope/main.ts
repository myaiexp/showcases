// A width-dependent envelope: first, min, max and last values per bucket of the source
import { areaY, defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { rng, walk } from '../../shared/random.ts';
import { createStage } from '../../shared/stage.ts';

const N = 40000;
const values = walk(rng(2), N, 0, 1.2).map((v, i) => v + 14 * Math.sin(i / 2500));

interface Bucket {
  id: string;
  x: number;
  min: number;
  max: number;
  first: number;
}

function envelope(buckets: number): Bucket[] {
  return Array.from({ length: buckets }, (_, b) => {
    const from = Math.floor((b * N) / buckets);
    const to = Math.floor(((b + 1) * N) / buckets);
    let min = Infinity;
    let max = -Infinity;
    for (let i = from; i < to; i++) {
      const v = values[i]!;
      if (v < min) min = v;
      if (v > max) max = v;
    }
    return { id: `b${b}`, x: (from + to) / 2, min, max, first: values[from]! };
  });
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Resize the window: the bucket count follows the chart width.' });
  if (stage.preview) stage.height -= 34;
  const readout = stage.preview ? null : stage.readout();

  const definition = defineChart(({ width }) => {
    // One bucket per three pixels of scene width.
    const buckets = Math.max(20, Math.floor(width / 3));
    const rows = envelope(buckets);
    const sourceMin = Math.min(...values);
    const sourceMax = Math.max(...values);
    const kept = rows.every((r) => r.min >= sourceMin) && Math.min(...rows.map((r) => r.min)) === sourceMin && Math.max(...rows.map((r) => r.max)) === sourceMax;
    const text = `source ${N} rows, ${buckets} buckets of about ${Math.round(N / buckets)} rows\nglobal extrema survive: ${kept ? 'yes' : 'NO'}`;
    if (readout) readout.textContent = text;
    else stage.say(`${buckets} buckets: ${kept ? 'extrema kept' : 'extrema lost'}`);
    return {
      marks: [
        areaY(rows, { x: 'x', y1: 'min', y2: 'max', key: 'id', fill: '#60a5fa', fillOpacity: 0.35 }),
        lineY(rows, { x: 'x', y: 'first', key: 'id', stroke: '#60a5fa', strokeWidth: 1 }),
      ],
      scales: { x: { scale: scaleLinear }, y: { scale: scaleLinear, nice: true, grid: true } },
    };
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Envelope of a 40,000 sample signal' }));
  return () => stage.dispose();
};

export default mount;
