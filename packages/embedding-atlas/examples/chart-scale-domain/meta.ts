// embedding-atlas example: scale domain on x and y
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Scale domain",
  summary:
    "A histogram whose x scale domain is cut to [0, 500], then one with a y domain of [0, 1200] that leaves headroom, then both together. Rows outside the domain are clipped, not removed from the counts.",
  section: "Charts",
  tags: ['scale', 'domain', 'mark: bar'],
  docs: [
    'repo/packages/viewer/src/charts/spec/spec.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
