// postprocessing example: SSAO: occlusion colour
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SSAO: occlusion colour',
  summary:
    "By default the occlusion darkens towards black. Giving SSAOEffect a color tints the shaded areas with it, like colour bleeding in the creases; setting it back to null returns to plain darkening.",
  section: 'SSAO',
  tags: ['SSAOEffect', 'NormalPass', 'color'],
  docs: ['repo/README.md', 'repo/src/effects/SSAOEffect.js', 'repo/src/materials/SSAOMaterial.js', 'repo/src/passes/NormalPass.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
