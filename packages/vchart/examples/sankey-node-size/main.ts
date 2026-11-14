// Sankey nodeWidth / nodeGap: how thick the nodes are and how far apart
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { asSpec, sankeyBase } from '../../shared/flow-data.ts';

type S = { width: number; gap: number };
const STEPS: S[] = [
  { width: 12, gap: 10 },
  { width: 40, gap: 10 },
  { width: 12, gap: 30 },
  { width: 30, gap: 3 },
];

const mount: Mount = (el, ctx) =>
  mountLive<S>(el, ctx, {
    initial: { width: 12, gap: 10 },
    build: ({ width, gap }, preview) =>
      asSpec({
        ...sankeyBase(preview),
        nodeWidth: width,
        nodeGap: preview ? gap / 2 : gap,
        title: { visible: true, text: `nodeWidth ${width}, nodeGap ${gap}`, textStyle: { fontSize: preview ? 11 : 15 } },
      }),
    controls: (bar, live) => {
      slider(bar, 'nodeWidth', [4, 60, 2], 12, (v) => live.set({ width: v }));
      slider(bar, 'nodeGap', [0, 40, 1], 10, (v) => live.set({ gap: v }));
    },
    step: (_s, i) => STEPS[i % STEPS.length] as S,
    previewMs: 1800,
  });

export default mount;
