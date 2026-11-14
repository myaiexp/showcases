// vchart example: Funnel shape, isCone and gap
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Funnel shape, isCone and gap",
  summary:
    "Layers are trapezoids by default or rectangles with shape: 'rect'; isCone controls whether the last trapezoid ends in a sharp point and gap leaves pixels between layers. Two selects and a slider set them.",
  section: "Funnel",
  tags: ['funnel', 'shape', 'isCone', 'gap'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Funnel.md',
    'repo/docs/assets/option/en/series/funnel.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
