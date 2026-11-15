// zephyr3d example: Subsurface glow on backlit wave crests
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Subsurface glow on backlit wave crests",
  summary:
    "subsurfaceIntensity, subsurfaceCrestHeight and subsurfaceTint control the glow of sunlight passing through the thin wall of a crest. The camera looks towards a low sun over taller waves.",
  section: "Environment",
  tags: ['subsurfaceIntensity', 'subsurfaceCrestHeight', 'subsurfaceTint', 'Water'],
  docs: ['repo/apps/doc/web/en/water.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
