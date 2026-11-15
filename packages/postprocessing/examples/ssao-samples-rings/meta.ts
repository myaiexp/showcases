// postprocessing example: SSAO: samples and rings
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SSAO: samples and rings',
  summary:
    "Each pixel takes a number of depth samples along a spiral. More samples remove the noisy grain; rings sets how many turns the spiral makes, and the docs advise a prime number that does not divide the sample count.",
  section: 'SSAO',
  tags: ['SSAOEffect', 'NormalPass', 'samples', 'rings'],
  docs: ['repo/README.md', 'repo/src/effects/SSAOEffect.js', 'repo/src/materials/SSAOMaterial.js', 'repo/src/passes/NormalPass.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
