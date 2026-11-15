// postprocessing example: SSAO: intensity and radius
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SSAO: intensity and radius',
  summary:
    "intensity multiplies how dark the occlusion is, and radius sets how far around each pixel the effect looks for blockers, as a fraction of the screen height. The creases and contact points under the boxes darken and spread.",
  section: 'SSAO',
  tags: ['SSAOEffect', 'NormalPass', 'intensity', 'radius'],
  docs: ['repo/README.md', 'repo/src/effects/SSAOEffect.js', 'repo/src/materials/SSAOMaterial.js', 'repo/src/passes/NormalPass.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
