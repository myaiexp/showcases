// Circle packing layoutPadding: the room inside each level of circles
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { asSpec, salesRoot, pathOf } from '../../shared/hierarchy-data.ts';

type S = { p0: number; p1: number; p2: number };
const STEPS: S[] = [
  { p0: 0, p1: 0, p2: 0 },
  { p0: 0, p1: 10, p2: 10 },
  { p0: 20, p1: 6, p2: 2 },
  { p0: 0, p1: 20, p2: 0 },
];

const mount: Mount = (el, ctx) =>
  mountLive<S>(el, ctx, {
    initial: { p0: 0, p1: 10, p2: 10 },
    build: ({ p0, p1, p2 }, preview) =>
      asSpec({
        type: 'circlePacking',
        data: [{ id: 'data', values: salesRoot() }],
        categoryField: 'name',
        valueField: 'value',
        circlePacking: { style: { fillOpacity: (d: { isLeaf?: boolean }) => (d.isLeaf ? 0.75 : 0.25) } },
        // Labels only on the country and region circles; the leaves are too small for text.
        label: { visible: !preview, style: { fontSize: 11, fill: '#fff', visible: (d: { depth: number }) => d.depth <= 2 } },
        tooltip: { mark: { title: { value: pathOf } } },
        layoutPadding: [p0, p1, p2],
        title: { visible: true, text: `layoutPadding: [${p0}, ${p1}, ${p2}]`, textStyle: { fontSize: preview ? 11 : 15 } },
      }),
    controls: (bar, live) => {
      slider(bar, 'level 0', [0, 30, 1], 0, (v) => live.set({ p0: v }));
      slider(bar, 'level 1', [0, 30, 1], 10, (v) => live.set({ p1: v }));
      slider(bar, 'level 2', [0, 30, 1], 10, (v) => live.set({ p2: v }));
    },
    step: (_s, i) => STEPS[i % STEPS.length] as S,
    previewMs: 1800,
  });

export default mount;
