// Large time range with a viewport: the envelope is built from the visible slice only
import { areaY, defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { rng, walk } from '../../shared/random.ts';
import { createStage } from '../../shared/stage.ts';

const N = 200_000;
const values = Float64Array.from(walk(rng(8), N, 0, 1.1), (v, i) => v + 20 * Math.sin(i / 9000) + 4 * Math.sin(i / 300));
const BUCKETS = 180;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide the window and change its size: each view is 180 buckets from only the rows inside it.' });
  if (stage.preview) stage.height -= 34;
  const readout = stage.preview ? null : stage.readout();
  const state = { start: 0.3, size: 0.2 };

  const options = () => {
    const from = Math.floor(state.start * (N - 1));
    const to = Math.min(N, from + Math.max(BUCKETS, Math.floor(state.size * N)));
    const rows = Array.from({ length: BUCKETS }, (_, b) => {
      const i0 = from + Math.floor(((to - from) * b) / BUCKETS);
      const i1 = from + Math.floor(((to - from) * (b + 1)) / BUCKETS);
      let min = Infinity;
      let max = -Infinity;
      for (let i = i0; i < i1; i++) {
        const v = values[i]!;
        if (v < min) min = v;
        if (v > max) max = v;
      }
      return { id: `b${b}`, x: (i0 + i1) / 2, min, max, first: values[i0]! };
    });
    const slice = values.subarray(from, to);
    const text = `window rows ${from} to ${to} (${to - from} rows), buckets ${BUCKETS}\nwindow min ${Math.min(...slice).toFixed(2)}, envelope min ${Math.min(...rows.map((r) => r.min)).toFixed(2)}\nwindow max ${Math.max(...slice).toFixed(2)}, envelope max ${Math.max(...rows.map((r) => r.max)).toFixed(2)}`;
    if (readout) readout.textContent = text;
    else stage.say(`rows ${from} to ${to}`);
    return {
      definition: defineChart({
        marks: [
          areaY(rows, { x: 'x', y1: 'min', y2: 'max', key: 'id', fill: '#4ade80', fillOpacity: 0.35 }),
          lineY(rows, { x: 'x', y: 'first', key: 'id', stroke: '#4ade80', strokeWidth: 1 }),
        ],
        scales: { x: { scale: scaleLinear, nice: true }, y: { scale: scaleLinear, nice: true, grid: true } },
      }),
      height: stage.height,
      initialWidth: 640,
      ariaLabel: 'Windowed envelope',
    };
  };
  const host = stage.own(mountChart(stage.box, options()));
  if (stage.bar) {
    slider(stage.bar, 'start', 0, 0.9, 0.01, state.start, (v) => { state.start = v; host.update(options()); }, (v) => `${(v * 100).toFixed(0)}%`);
    slider(stage.bar, 'size', 0.01, 0.5, 0.01, state.size, (v) => { state.size = v; host.update(options()); }, (v) => `${(v * 100).toFixed(0)}%`);
  } else {
    const frames: [number, number][] = [[0, 0.5], [0.2, 0.2], [0.35, 0.05], [0.6, 0.3]];
    stage.cycle(frames, 1500, ([s, z]) => { state.start = s; state.size = z; host.update(options()); });
  }
  return () => stage.dispose();
};

export default mount;
