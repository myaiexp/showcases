// postprocessing example: SSAO: bias and fade
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SSAO: bias and fade',
  summary:
    "bias is how far a sample must rise above the surface plane before it counts as an occluder, so raising it removes grain on flat walls. fade sits in the denominator of each sample's contribution: lower values give harder, higher-contrast shadows.",
  section: 'SSAO',
  tags: ['SSAOEffect', 'NormalPass', 'bias', 'fade'],
  docs: ['repo/README.md', 'repo/src/effects/SSAOEffect.js', 'repo/src/materials/SSAOMaterial.js', 'repo/src/passes/NormalPass.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
