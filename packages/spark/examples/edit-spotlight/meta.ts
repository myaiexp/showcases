// Spark example: INFINITE_CONE SDF spotlight sweeping a dimmed garden
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Edit spotlight',
  summary:
    'A spotlight made from an INFINITE_CONE SplatEditSdf in an ADD_RGBA edit, hung above a dimmed garden and re-aimed every frame with a quaternion so its beam sweeps across the ground. The radius slider sets the cone angle (half angle is PI/4 times radius) and softEdge feathers the beam.',
  section: 'Splat Editing',
  tags: ['SplatEdit', 'SplatEditSdf', 'INFINITE_CONE', 'ADD_RGBA', 'radius', 'softEdge'],
  docs: ['repo/docs/docs/splat-editing.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
