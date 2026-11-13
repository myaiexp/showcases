// Overlapping scatter clouds with blendMode source-over versus lighter, set globally or per series
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, slider, every } from '../../shared/chart.ts';

// Deterministic pseudo-random numbers so the clouds stay put between redraws.
function rng(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}
function cloud(seed: number, cx: number, cy: number, n: number): [number, number][] {
  const r = rng(seed);
  // Sum of uniforms approximates a bell shape.
  const g = (): number => (r() + r() + r() - 1.5) * 2;
  return Array.from({ length: n }, () => [cx + g() * 14, cy + g() * 14]);
}

type Blend = 'source-over' | 'lighter';
type Scope = 'whole chart' | 'each series';

function build(blend: Blend, scope: Scope, spread: number): EChartsOption {
  const colours = ['#ff4d4d', '#4dff88', '#4d79ff'];
  const centres: [number, number][] = [[50 - spread, 55 - spread / 2], [50 + spread, 55 - spread / 2], [50, 50 + spread]];
  return {
    // blendMode on the root applies to everything; a series can set its own as well.
    blendMode: scope === 'whole chart' ? blend : undefined,
    xAxis: { type: 'value', min: 0, max: 100, show: false },
    yAxis: { type: 'value', min: 0, max: 100, show: false },
    grid: { top: 8, bottom: 8, left: 8, right: 8 },
    animationDuration: 600,
    series: centres.map((c, i) => ({
      type: 'scatter' as const,
      blendMode: scope === 'each series' ? blend : undefined,
      symbolSize: 18,
      silent: true,
      itemStyle: { color: colours[i]!, opacity: 0.25 },
      data: cloud(11 + i * 7, c[0], c[1], 700),
    })),
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let blend: Blend = 'lighter';
  let scope: Scope = 'whole chart';
  let spread = 14;
  const show = (): void => {
    chart.setOption(build(blend, scope, spread), true);
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    stop = every(1800, () => {
      i += 1;
      blend = i % 2 ? 'source-over' : 'lighter';
      spread = 6 + (i % 4) * 5;
      show();
    });
  } else {
    select(bar!, 'blendMode', ['lighter', 'source-over'], (v) => { blend = v as Blend; show(); });
    select(bar!, 'set on', ['whole chart', 'each series'], (v) => { scope = v as Scope; show(); });
    slider(bar!, 'cluster distance', [0, 25, 1], spread, (v) => { spread = v; show(); });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
