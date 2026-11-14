// Sunburst offsetX / offsetY: move the centre point
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { asSpec, salesTree, pathOf } from '../../shared/hierarchy-data.ts';

type S = { x: number; y: number };
const DRIFT: S[] = [
  { x: 0, y: 0 },
  { x: -60, y: -20 },
  { x: 0, y: 20 },
  { x: 60, y: -20 },
];

const mount: Mount = (el, ctx) =>
  mountLive<S>(el, ctx, {
    initial: { x: 0, y: 0 },
    build: ({ x, y }, preview) =>
      asSpec({
        type: 'sunburst',
        data: [{ id: 'data', values: salesTree() }],
        categoryField: 'name',
        valueField: 'value',
        sunburst: { style: { fillOpacity: (d: { isLeaf?: boolean }) => (d.isLeaf ? 0.45 : 0.85) } },
        // Cards are too small for arc labels.
        label: { visible: !preview, style: { fontSize: 11 } },
        tooltip: { mark: { title: { value: pathOf } } },
        outerRadius: preview ? 0.6 : 0.8,
        offsetX: x,
        offsetY: y,
      }),
    controls: (bar, live) => {
      slider(bar, 'offsetX', [-300, 300, 10], 0, (v) => live.set({ x: v }));
      slider(bar, 'offsetY', [-150, 150, 10], 0, (v) => live.set({ y: v }));
    },
    step: (_s, i) => DRIFT[i % DRIFT.length] as S,
    previewMs: 1500,
  });

export default mount;
