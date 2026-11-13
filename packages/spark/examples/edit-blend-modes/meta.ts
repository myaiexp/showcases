// Spark example: MULTIPLY, SET_RGB and ADD_RGBA SplatEdit blend modes compared
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Edit blend modes',
  summary:
    'Three torus knots, each with a SplatEdit child using a different rgbaBlendMode and a sphere SplatEditSdf circling through it: MULTIPLY darkens the splats inside the sphere to a moving shadow, SET_RGB paints them yellow, ADD_RGBA adds blue light with zero opacity so faint splats stay faint. Sliders change the sphere radius and the soft edge.',
  section: 'Splat Editing',
  tags: ['SplatEdit', 'SplatEditSdf', 'SplatEditRgbaBlendMode', 'softEdge', 'SPHERE'],
  docs: ['repo/docs/docs/splat-editing.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
