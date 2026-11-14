// Sunburst startAngle / endAngle: draw only part of the circle
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { asSpec, sunburstBase } from '../../shared/hierarchy-data.ts';

type S = { start: number; end: number };
const RANGES: S[] = [
  { start: -90, end: 270 },
  { start: -90, end: 90 },
  { start: -180, end: 0 },
  { start: -45, end: 135 },
];

const mount: Mount = (el, ctx) =>
  mountLive<S>(el, ctx, {
    initial: RANGES[0] as S,
    build: ({ start, end }, preview) =>
      asSpec({
        ...sunburstBase(preview),
        startAngle: start,
        endAngle: end,
        title: { visible: true, text: `${start} to ${end} degrees`, textStyle: { fontSize: preview ? 11 : 15 } },
      }),
    controls: (bar, live) => {
      slider(bar, 'startAngle', [-360, 360, 5], -90, (v) => live.set({ start: v }));
      slider(bar, 'endAngle', [-360, 360, 5], 270, (v) => live.set({ end: v }));
    },
    step: (_s, i) => RANGES[i % RANGES.length] as S,
    previewMs: 2000,
  });

export default mount;
