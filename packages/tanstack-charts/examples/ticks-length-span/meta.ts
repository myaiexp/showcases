// tanstack-charts example: Tick length, span and inset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Tick length, span and inset",
  summary:
    "tickY marks a median per team. span sizes the tick in category-step units so it follows the band width, length sizes it in pixels, and inset trims pixels from both ends. The two size options cannot be used together, so the select switches between them.",
  section: "Rules, Links, Arrows, Vectors, and Ticks",
  tags: ['tickY', 'length', 'span', 'inset', 'scaleBand'],
  docs: ['repo/docs/reference/marks/rules-links-arrows-vectors-and-ticks.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
