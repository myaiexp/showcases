// vega example: Threshold Scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Threshold Scale",
  summary:
    "Dots coloured by a threshold scale whose domain holds two cut points, so its three-colour range gets N+1 slices. The cut points open and close symmetrically around zero.",
  section: "Scales",
  tags: ['scale.type','scale.domain','scale.range'],
  docs: ['repo/docs/docs/scales.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
