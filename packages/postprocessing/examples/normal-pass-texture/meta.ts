// postprocessing example: NormalPass: the normal texture
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'NormalPass: the normal texture',
  summary:
    "NormalPass draws the scene's view-space normals into a texture, which SSAOEffect reads. A TextureEffect shows it directly, and the pass's resolution scale decides how sharp it is.",
  section: 'SSAO',
  tags: ['NormalPass', 'texture', 'resolution.scale', 'TextureEffect', 'BlendFunction'],
  docs: ['repo/README.md', 'repo/src/passes/NormalPass.js', 'repo/src/effects/TextureEffect.js', 'repo/src/enums/BlendFunction.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
