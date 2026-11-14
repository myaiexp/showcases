// Correlation startAngle / endAngle: nodes on an arc instead of the full ring
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { asSpec, relatedWords } from '../../shared/flow-data.ts';

type S = { start: number; end: number };
const STEPS: S[] = [
  { start: -90, end: 270 },
  { start: -90, end: 90 },
  { start: 0, end: 180 },
  { start: -135, end: 135 },
];

const mount: Mount = (el, ctx) =>
  mountLive<S>(el, ctx, {
    initial: STEPS[0] as S,
    build: ({ start, end }, preview) =>
      asSpec({
        type: 'correlation',
        data: [{ id: 'data', values: relatedWords() }],
        categoryField: 'word',
        valueField: 'sim',
        sizeField: 'pv',
        sizeRange: preview ? [5, 14] : [10, 26],
        innerRadius: '25%',
        outerRadius: '90%',
        startAngle: start,
        endAngle: end,
        centerLabel: { visible: true, style: { fill: '#fff', text: 'coffee', fontSize: preview ? 10 : 14 } },
        label: { visible: false },
        title: { visible: true, text: `${start} to ${end} degrees`, textStyle: { fontSize: preview ? 11 : 15 } },
      }),
    controls: (bar, live) => {
      slider(bar, 'startAngle', [-360, 360, 5], -90, (v) => live.set({ start: v }));
      slider(bar, 'endAngle', [-360, 360, 5], 270, (v) => live.set({ end: v }));
    },
    step: (_s, i) => STEPS[i % STEPS.length] as S,
    previewMs: 2000,
  });

export default mount;
