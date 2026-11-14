// A right-hand legend: maxCol caps the columns, maxHeight wraps items into columns
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { rng } from '../../shared/components-data.ts';

const r = rng(9);
const ITEMS = Array.from({ length: 14 }, (_, i) => ({ name: `Item ${i + 1}`, value: Math.round(10 + r() * 60) }));

const mount: Mount = (el, ctx) =>
  mountLive<{ cols: number }>(el, ctx, {
    initial: { cols: 2 },
    previewMs: 1500,
    step: (s) => ({ cols: s.cols >= 3 ? 1 : s.cols + 1 }),
    build: (s, preview) => ({
      type: 'pie',
      data: [{ id: 'd', values: ITEMS }],
      categoryField: 'name',
      valueField: 'value',
      outerRadius: 0.85,
      legends: {
        visible: true,
        orient: 'right',
        // Items wrap into columns once the legend is taller than maxHeight; maxCol hides the surplus columns.
        maxHeight: preview ? 150 : 260,
        maxCol: s.cols,
        autoPage: false,
        item: { spaceCol: 14, spaceRow: 4, label: { style: { fontSize: preview ? 10 : 12 } } },
      },
    }),
    controls: (bar, live) => {
      slider(bar, 'maxCol', [1, 4, 1], live.state.cols, (v) => live.set({ cols: v }));
    },
  });

export default mount;
