// Correlation innerRadius / outerRadius: the ring that holds the nodes
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { asSpec, relatedWords } from '../../shared/flow-data.ts';

type S = { inner: number; outer: number };
const STEPS: S[] = [
  { inner: 25, outer: 90 },
  { inner: 50, outer: 95 },
  { inner: 10, outer: 50 },
  { inner: 60, outer: 70 },
];

const mount: Mount = (el, ctx) =>
  mountLive<S>(el, ctx, {
    initial: { inner: 25, outer: 90 },
    build: ({ inner, outer }, preview) =>
      asSpec({
        type: 'correlation',
        data: [{ id: 'data', values: relatedWords() }],
        categoryField: 'word',
        valueField: 'sim',
        sizeField: 'pv',
        sizeRange: preview ? [5, 14] : [10, 26],
        innerRadius: `${inner}%`,
        outerRadius: `${outer}%`,
        centerLabel: { visible: true, style: { fill: '#fff', text: 'coffee', fontSize: preview ? 10 : 14 } },
        label: { visible: false },
        title: { visible: true, text: `innerRadius ${inner}%, outerRadius ${outer}%`, textStyle: { fontSize: preview ? 11 : 15 } },
      }),
    controls: (bar, live) => {
      slider(bar, 'innerRadius %', [0, 90, 1], 25, (v) => live.set({ inner: Math.min(v, live.state.outer - 5) }));
      slider(bar, 'outerRadius %', [10, 100, 1], 90, (v) => live.set({ outer: Math.max(v, live.state.inner + 5) }));
    },
    step: (_s, i) => STEPS[i % STEPS.length] as S,
    previewMs: 1800,
  });

export default mount;
