// A custom layout that tiles regions into a matrix whose column count comes from a slider
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, controlBar, slider } from '../../shared/chart.ts';
import { rng } from '../../shared/components-data.ts';
import { every } from '../../shared/chart.ts';

const N = 6;

const mount: Mount = (el, ctx) => {
  const r = rng(42);
  const values = () => Array.from({ length: N }, (_, i) => Array.from({ length: 4 }, (_, k) => ({ k: `k${k}`, v: Math.round(10 + r() * 60), g: `g${i}` })));
  const build = (vals: ReturnType<typeof values>): ISpec =>
    ({
      type: 'common',
      padding: 6,
      region: vals.map((_, i) => ({ id: `r${i}` })),
      series: vals.map((v, i) => ({ type: 'pie', regionId: `r${i}`, data: { id: `s${i}`, values: v }, categoryField: 'k', valueField: 'v', outerRadius: 0.95, innerRadius: i % 2 ? 0.5 : 0, label: { visible: false } })),
      legends: { visible: false },
      tooltip: { visible: false },
    }) as ISpec;
  let cols = ctx.preview ? 3 : 3;
  let relayout: () => void = () => {};
  const chart = createChart(el, ctx, build(values()), {
    init: {
      layout: (_chart, all, rect) => {
        // Only the regions are placed: they are the layout items with layoutType 'region'.
        const items = all.filter((item) => item.layoutType === 'region');
        const rowsCount = Math.ceil(items.length / cols);
        const w = rect.width / cols;
        const h = rect.height / rowsCount;
        items.forEach((item, i) => {
          item.setLayoutStartPosition({ x: (i % cols) * w + 4, y: Math.floor(i / cols) * h + 4 });
          item.setLayoutRect({ width: w - 8, height: h - 8 });
          (item as { updateLayoutAttribute?: () => void }).updateLayoutAttribute?.();
        });
      },
    },
  });
  relayout = () => void chart.vchart.resize(chart.container.clientWidth, chart.container.clientHeight);
  let alive = true;
  let i = 0;
  const stop = every(2200, () => {
    if (!alive) return;
    for (let k = 0; k < N; k++) void chart.vchart.updateData(`s${k}`, values()[k] ?? []);
    if (ctx.preview) {
      cols = [3, 2, 6, 1][++i % 4] ?? 3;
      relayout();
    }
  });
  if (!ctx.preview) {
    const bar = controlBar(el);
    el.insertBefore(bar, chart.container);
    slider(bar, 'columns', [1, 6, 1], cols, (v) => {
      cols = v;
      relayout();
    });
  }
  return () => {
    alive = false;
    stop();
    chart.release();
  };
};

export default mount;
