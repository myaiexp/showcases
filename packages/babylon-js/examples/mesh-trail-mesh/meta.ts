// babylon-js example: Trail meshes behind moving objects
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Trail meshes behind moving objects',
  summary:
    'Three spinning cubes on looping paths, each followed by a TrailMesh built from it as the generator. The cubes’ scaling is baked into their vertices first so the trails aren’t stretched. diameter, length, sections and doNotTaper are creation options, so changing them rebuilds the trails; stop, start and reset control them live.',
  section: 'Mesh',
  tags: ['TrailMesh', 'bakeCurrentTransformIntoVertices', 'doNotTaper', 'reset'],
  docs: ['repo/content/features/featuresDeepDive/mesh/trailMesh.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
