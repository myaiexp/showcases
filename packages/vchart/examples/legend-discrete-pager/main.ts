// Discrete legend with more items than fit: autoPage, maxRow and the pager styles
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, controlBar, select, slider, every } from '../../shared/chart.ts';
import { rng } from '../../shared/components-data.ts';

const NAMES = Array.from({ length: 24 }, (_, i) => `Product ${String.fromCharCode(65 + (i % 26))}${i + 1}`);

const build = (pagerType: string, maxRow: number, autoPage: boolean, current = 1): ISpec => {
  const r = rng(5);
  return {
    type: 'bar',
    data: [{ id: 'items', values: NAMES.map((name) => ({ name, value: Math.round(10 + r() * 80) })) }],
    xField: 'name',
    yField: 'value',
    seriesField: 'name',
    axes: [{ orient: 'bottom', visible: false }, { orient: 'left' }],
    legends: {
      visible: true,
      orient: 'bottom',
      maxRow,
      autoPage,
      pager: {
        // 'scrollbar' swaps the arrow buttons for a scrollbar (legend-discrete.md § pager.type).
        type: pagerType === 'scrollbar' ? 'scrollbar' : undefined,
        defaultCurrent: current,
      },
    },
  };
};

const mount: Mount = (el, ctx) => {
  let pagerType = 'arrows';
  let maxRow = 1;
  let autoPage = true;
  const { vchart, release } = createChart(el, ctx, build(pagerType, maxRow, autoPage));
  let released = false;
  const apply = (current = 1): void => {
    if (!released) void vchart.updateSpec(build(pagerType, maxRow, autoPage, current));
  };

  let stop = (): void => {};
  if (ctx.preview) {
    // Flip between pages through pager.defaultCurrent.
    let page = 1;
    stop = every(1800, () => {
      page = page >= 4 ? 1 : page + 1;
      apply(page);
    });
  } else {
    const bar = controlBar(el);
    select(bar, 'pager', ['arrows', 'scrollbar'], (v) => ((pagerType = v), apply()));
    slider(bar, 'maxRow', [1, 4, 1], maxRow, (v) => ((maxRow = v), apply()));
    select(bar, 'autoPage', ['true', 'false'], (v) => ((autoPage = v === 'true'), apply()));
    el.prepend(bar);
  }

  return () => {
    stop();
    released = true;
    release();
  };
};

export default mount;
