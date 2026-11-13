// Scatter on a category axis: no jitter, random jitter, then a non-overlapping beeswarm
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select, slider } from '../../shared/chart.ts';

const groups = ['Morning', 'Noon', 'Evening', 'Night'];

/** A small seeded PRNG so the sample is the same on every load. */
function prng(seed: number): () => number {
  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
}

/** Points per group, piled up around a few integer values so they overlap without jitter. */
function sample(perGroup: number): [string, number][] {
  const rand = prng(7);
  const centres = [6, 7.5, 5, 3];
  return groups.flatMap((g, i) =>
    Array.from({ length: perGroup }, (): [string, number] => {
      const spread = (rand() + rand() + rand() - 1.5) * 3;
      return [g, Math.round(Math.max(0, centres[i]! + spread) * 2) / 2];
    }),
  );
}

const MODES = ['none', 'jitter', 'beeswarm'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const data = sample(ctx.preview ? 40 : 90);

  const render = (mode: Mode, width: number): void => {
    chart.setOption({
      grid: ctx.preview ? { top: 16, bottom: 24, left: 36, right: 12 } : { top: 40 },
      title: ctx.preview ? undefined : { text: `mode: ${mode}`, left: 'center', textStyle: { fontSize: 13 } },
      xAxis: {
        type: 'category',
        data: groups,
        // xAxis.jitter: random offset in pixels across the category band (0 = none).
        jitter: mode === 'none' ? 0 : width,
        // jitterOverlap false makes ECharts search for a free spot: the beeswarm layout.
        jitterOverlap: mode !== 'beeswarm',
        // The minimum gap between beeswarm points.
        jitterMargin: 2,
      },
      yAxis: { type: 'value', name: ctx.preview ? undefined : 'hours slept' },
      series: [{ type: 'scatter', symbolSize: ctx.preview ? 5 : 8, data, itemStyle: { opacity: 0.8 } }],
    });
  };

  let mode: Mode = 'beeswarm';
  let width = 60;
  render(mode, width);

  if (ctx.preview) {
    let i = MODES.indexOf(mode);
    const stop = every(2200, () => {
      i = (i + 1) % MODES.length;
      render(MODES[i]!, 40);
    });
    return () => {
      stop();
      dispose();
    };
  }

  select(bar!, 'mode', MODES, (v) => {
    mode = v as Mode;
    render(mode, width);
  }).value = mode;
  slider(bar!, 'jitter (px)', [10, 120, 5], width, (v) => {
    width = v;
    render(mode, width);
  });

  return dispose;
};

export default mount;
