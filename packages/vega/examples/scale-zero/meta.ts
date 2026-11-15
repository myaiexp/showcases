// vega example: zero
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "zero",
  summary:
    "Prices between 40 and 60 on a linear scale. With zero on, the y domain reaches down to 0 and the wobble flattens out; with it off, the domain hugs the data.",
  section: "Scales",
  tags: ['scale.zero','scale.type','signal.bind'],
  docs: ['repo/docs/docs/scales.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
