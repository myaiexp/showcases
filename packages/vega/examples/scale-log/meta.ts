// vega example: Log Scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Log Scale",
  summary:
    "Values 1 to 9 at each power of ten sit closer together as they grow. The base signal changes only where the axis puts its ticks, not where the values land.",
  section: "Scales",
  tags: ['scale.type','scale.base','signal.bind'],
  docs: ['repo/docs/docs/scales.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
