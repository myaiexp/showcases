// vchart example: FAQ: linked hover across two charts
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: linked hover across two charts",
  summary:
    "The dimensionHover event of one chart gives the category under the pointer, and setDimensionIndex on the other chart shows its tooltip and crosshair at the same category. Hover either chart in the full view.",
  section: 'FAQ',
  tags: ["dimensionHover","setDimensionIndex","crosshair"],
  docs: [
    "repo/docs/assets/faq/en/79- How to achieve coordinated display of positions in other charts when moving the mouse in the vchart library.md",
    "repo/docs/assets/api/en/API/event.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
