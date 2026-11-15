// postprocessing example: SSAO: min radius scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SSAO: min radius scale',
  summary:
    "The sampling radius shrinks with distance from the camera, down to minRadiusScale of its full size. A low value keeps distant occlusion tight; 1 turns the distance scaling off so far and near pixels use the same radius.",
  section: 'SSAO',
  tags: ['SSAOEffect', 'NormalPass', 'minRadiusScale'],
  docs: ['repo/README.md', 'repo/src/effects/SSAOEffect.js', 'repo/src/materials/SSAOMaterial.js', 'repo/src/passes/NormalPass.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
