// Zdog example: every shape class in turn, with size and stroke sliders
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Primitive explorer',
  summary:
    'The whole Zdog shape kit, one at a time: a dot that reads as a sphere, flat rectangles, circles and polygons, and the solids (dome, cone, can, box). Each is a single constructor call. Pick one and change its size and line thickness.',
  section: 'Shapes',
  tags: ['Shape', 'Rect', 'RoundedRect', 'Ellipse', 'Polygon', 'Hemisphere', 'Cone', 'Cylinder', 'Box', 'remove'],
  docs: ['repo/content/shapes.hbs', 'repo/modules/docs/shapes-basic.hbs', 'repo/modules/docs/shapes-composite.hbs', 'repo/modules/docs/api-anchor.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
