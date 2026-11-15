// postprocessing example: SSAO: occlusion only
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SSAO: occlusion only',
  summary:
    "The SSAOEffect output is white where nothing blocks the light and darker where something does. BlendFunction.SRC shows that buffer on its own; the default MULTIPLY lays it over the render.",
  section: 'SSAO',
  tags: ['SSAOEffect', 'NormalPass', 'BlendFunction', 'blendMode'],
  docs: ['repo/README.md', 'repo/src/effects/SSAOEffect.js', 'repo/src/materials/SSAOMaterial.js', 'repo/src/passes/NormalPass.js', 'repo/src/enums/BlendFunction.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
