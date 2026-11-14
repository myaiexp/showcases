// Scatter point labels resolved with labelLayout: hideOverlap, moveOverlap 'shiftY', and a right-aligned label column
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, every } from '../../shared/chart.ts';
import { rng, gauss } from '../../shared/scatter-data.ts';

function points(seed: number): { name: string; value: number[] }[] {
  const r = rng(seed);
  return Array.from({ length: 26 }, (_, i) => ({
    name: `Item ${String(i + 1).padStart(2, '0')}`,
    value: [+(45 + gauss(r) * 14).toFixed(1), +(50 + gauss(r) * 14).toFixed(1)],
  }));
}

type Params = { rect: { x: number; y: number; width: number; height: number } };

// Each mode is a labelLayout: an object, or a function of the label and its point's rect.
const LAYOUTS: Record<string, unknown> = {
  'none (labels overlap)': {},
  'hideOverlap: true': { hideOverlap: true },
  "moveOverlap: 'shiftY'": { moveOverlap: 'shiftY' },
  // The function returns where to put each label: a column right of the points, stacked
  // with moveOverlap so no two labels collide, and joined to its point by labelLine.
  'right column + shiftY': (p: Params) => ({
    x: '86%',
    y: p.rect.y + p.rect.height / 2,
    align: 'left',
    verticalAlign: 'middle',
    moveOverlap: 'shiftY',
  }),
};
const names = Object.keys(LAYOUTS);

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 480 });
  let seed = 4;
  let mode = ctx.preview ? names[2]! : names[0]!;

  const show = (): void => {
    chart.setOption(
      {
        grid: { top: 16, left: 40, right: 16, bottom: 28 },
        xAxis: { type: 'value', min: 0, max: 100 },
        yAxis: { type: 'value', min: 0, max: 100 },
        series: [
          {
            type: 'scatter',
            data: points(seed),
            symbolSize: 8,
            itemStyle: { opacity: 0.85 },
            label: { show: true, formatter: '{b}', position: 'right', fontSize: 11 },
            // labelLine joins a moved label to its point; it only shows once a layout moves the label.
            labelLine: { show: true, lineStyle: { opacity: 0.5 } },
            labelLayout: LAYOUTS[mode] as never,
            animationDurationUpdate: 600,
          },
        ],
      },
      true,
    );
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    // Step through the layouts to show what each does to the same cloud.
    let i = 0;
    stop = every(1800, () => {
      mode = names[++i % names.length]!;
      show();
    });
  } else {
    select(bar!, 'labelLayout', names, (v) => {
      mode = v;
      show();
    });
    select(bar!, 'data', ['set A', 'set B', 'set C'], (v) => {
      seed = 4 + (v.charCodeAt(4) - 65) * 9;
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
