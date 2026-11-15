// vega example: UTC Scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "UTC Scale",
  summary:
    "Twelve-hourly events drawn on a utc scale (bottom axis) and the same span on a time scale (top axis). The ticks agree when the browser is on UTC and shift against each other everywhere else.",
  section: "Scales",
  tags: ['scale.type','scale.domain','transform.sequence'],
  docs: ['repo/docs/docs/scales.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
