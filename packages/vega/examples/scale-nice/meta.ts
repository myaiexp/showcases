// vega example: nice
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "nice",
  summary:
    "Values spread over 0.2014 to 0.9967, with dashed rules at the real minimum and maximum. Turning nice on, or giving it a tick count, stretches the axis to round bounds around them.",
  section: "Scales",
  tags: ['scale.nice','scale.domain.data','scale.zero'],
  docs: ['repo/docs/docs/scales.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
