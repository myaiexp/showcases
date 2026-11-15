// vega example: Scale bins
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Scale bins",
  summary:
    "A linear scale told that its domain is cut into bins of a given step. The axis puts ticks and grid lines on those boundaries instead of picking its own round numbers.",
  section: "Scales",
  tags: ['scale.bins','axis.grid','signal.bind'],
  docs: ['repo/docs/docs/scales.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
