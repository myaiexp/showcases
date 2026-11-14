// vchart example: Liquid reverse and indicatorSmartInvert
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Liquid reverse and indicatorSmartInvert",
  summary:
    "reverse: true fills the liquid from the top down, and indicatorSmartInvert flips the colour of the indicator text where the water covers it. A half-full circle puts the text right across the water line to show the difference.",
  section: "Gauge, Progress and Liquid",
  tags: ['liquid', 'reverse', 'indicatorSmartInvert', 'indicator'],
  docs: [
    'repo/docs/assets/option/en/series/liquid.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
