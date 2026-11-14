// Legend lazyload with a scrollbar pager over sixty items
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { rng } from '../../shared/components-data.ts';

const r = rng(21);
const ITEMS = Array.from({ length: 60 }, (_, i) => ({ name: `Series ${i + 1}`, value: Math.round(5 + r() * 40) }));

const mount: Mount = (el, ctx) =>
  mountLive<{ lazy: boolean; page: number }>(el, ctx, {
    initial: { lazy: true, page: 1 },
    mode: 'rebuild',
    previewMs: 1500,
    step: (s) => ({ page: (s.page % 4) + 1 }),
    build: (s, preview) => ({
      type: 'bar',
      data: [{ id: 'd', values: ITEMS }],
      xField: 'name',
      yField: 'value',
      seriesField: 'name',
      axes: [{ orient: 'bottom', visible: false }, { orient: 'left' }],
      legends: {
        visible: true,
        orient: 'right',
        maxHeight: preview ? 150 : 280,
        lazyload: s.lazy,
        pager: { type: 'scrollbar', defaultCurrent: s.page },
        item: { label: { style: { fontSize: 11 } } },
      },
    }),
    controls: (bar, live) => {
      select(bar, 'lazyload', ['true', 'false'], (v) => live.set({ lazy: v === 'true' }));
    },
  });

export default mount;
