// babylon-js example: Shape cast and proximity queries
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Shape cast and proximity queries',
  summary:
    'The Havok query API against five static bodies: shapeCast sweeps a sphere shape along a segment and reads the hit fraction, pointProximity finds the closest body within maxDistance of a point, and shapeProximity does the same with a whole shape. The card cycles through the three.',
  section: 'Physics',
  tags: ['HavokPlugin.shapeCast', 'pointProximity', 'shapeProximity', 'ShapeCastResult', 'ProximityCastResult'],
  docs: ['repo/content/features/featuresDeepDive/physics/v2/shapeCast.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
