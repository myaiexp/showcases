// tanstack-charts example: Radial area band
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Radial area band",
  summary:
    "radialArea with radius1 fills the band between each month's low and high temperature instead of a shape down to zero, with a radialLine for the mean on top. Both use a closed curve, switched here between straight and cardinal segments.",
  section: "Polar Marks",
  tags: ['radialArea', 'radius1', 'radialLine', 'curveLinearClosed', 'curveCardinalClosed', 'polar'],
  docs: ['repo/docs/reference/marks/polar.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
