// embedding-atlas example: scale.size with range and type on a bubble chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Size scale range",
  summary:
    "The size encoding of a bubble chart is mapped by scale.size. The variants set the [min, max] size range, then switch the scale type to log, which compresses the gap between large and small topics.",
  section: "Charts",
  tags: ['scale', 'size', 'range', 'type: log', 'mark: point'],
  docs: [
    'repo/packages/viewer/src/charts/spec/spec.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
