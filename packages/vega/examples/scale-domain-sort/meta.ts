// vega example: Sorted Domain
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sorted Domain",
  summary:
    "Dots for repeated measures per category, with the band domain sorted by an aggregate of the value field. The aggregate and the order switch, and the categories reshuffle along the axis.",
  section: "Scales",
  tags: ['scale.domain.sort','scale.domain.data','scale.type'],
  docs: ['repo/docs/docs/scales.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
