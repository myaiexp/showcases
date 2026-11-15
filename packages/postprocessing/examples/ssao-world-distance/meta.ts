// postprocessing example: SSAO: world distance cutoff
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SSAO: world distance cutoff',
  summary:
    "Past worldDistanceThreshold from the camera the occlusion fades out, over worldDistanceFalloff. The far end of the room loses its contact shadows first as the threshold slides in. Both are in world units.",
  section: 'SSAO',
  tags: ['SSAOEffect', 'NormalPass', 'worldDistanceThreshold', 'worldDistanceFalloff'],
  docs: ['repo/README.md', 'repo/src/effects/SSAOEffect.js', 'repo/src/materials/SSAOMaterial.js', 'repo/src/passes/NormalPass.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
