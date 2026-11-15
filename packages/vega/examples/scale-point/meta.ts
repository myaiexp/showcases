// vega example: Point Scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Point Scale",
  summary:
    "Five categories on a point scale, drawn as dots over the shaded range. Padding is measured in steps, so growing it moves the end points away from the edges and squeezes the spacing between points.",
  section: "Scales",
  tags: ['scale.type','scale.padding','scale.paddingOuter'],
  docs: ['repo/docs/docs/scales.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
