// postprocessing example: SSAO: world proximity cutoff
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SSAO: world proximity cutoff',
  summary:
    "A depth sample only counts as an occluder when its depth is within worldProximityThreshold of the pixel's own, fading out over worldProximityFalloff. A small threshold keeps occlusion to tight creases; a large one lets boxes shade the floor from far above.",
  section: 'SSAO',
  tags: ['SSAOEffect', 'NormalPass', 'worldProximityThreshold', 'worldProximityFalloff'],
  docs: ['repo/README.md', 'repo/src/effects/SSAOEffect.js', 'repo/src/materials/SSAOMaterial.js', 'repo/src/passes/NormalPass.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
