// postprocessing example: Depth of field: focus distance
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Depth of field: focus distance',
  summary:
    "DepthOfFieldEffect keeps one distance from the camera sharp and blurs the columns and balls on either side. The focusDistance, in world units, sits on the circle of confusion material and slides the sharp plane down the corridor.",
  section: 'Depth of Field',
  tags: ['DepthOfFieldEffect', 'cocMaterial', 'focusDistance'],
  docs: ['repo/README.md', 'repo/src/effects/DepthOfFieldEffect.js', 'repo/src/materials/CircleOfConfusionMaterial.js', 'repo/src/materials/glsl/circle-of-confusion.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
