// vega example: Time nice Intervals
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Time nice Intervals",
  summary:
    "A date domain from mid-February 2001 to late May 2002, with dashed rules at the raw ends. Each interval snaps the ends outward to day, week, month or year boundaries; \"quarter\" is month with step 3.",
  section: "Scales",
  tags: ['scale.nice','scale.type','scale.domain'],
  docs: ['repo/docs/docs/scales.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
