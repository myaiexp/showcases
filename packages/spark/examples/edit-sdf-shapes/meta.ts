// Spark example: all eight SplatEditSdfType shapes painted onto a splat garden
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Edit SDF shapes',
  summary:
    'One SET_RGB SplatEdit paints an orange region onto a splat garden, and its SplatEditSdf cycles through every SplatEditSdfType: SPHERE, BOX, ELLIPSOID, CYLINDER, CAPSULE, PLANE, INFINITE_CONE and ALL. The label says how each shape reads its position, rotation, scale and radius.',
  section: 'Splat Editing',
  tags: ['SplatEdit', 'SplatEditSdf', 'SplatEditSdfType', 'SET_RGB', 'softEdge', 'radius'],
  docs: ['repo/docs/docs/splat-editing.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
