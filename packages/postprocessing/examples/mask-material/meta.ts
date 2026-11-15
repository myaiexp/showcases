// postprocessing example: MaskMaterial, MaskFunction and ColorChannel
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'MaskMaterial and MaskFunction',
  summary:
    'A ShaderPass running a MaskMaterial applies a generated texture as a mask to the scene. maskFunction picks how (DISCARD cuts a hard edge, the MULTIPLY variants fade), colorChannel picks which channel of the mask is read, and inverted and strength shape it.',
  section: 'Passes',
  tags: ['MaskMaterial', 'MaskFunction', 'ColorChannel', 'maskTexture', 'inverted', 'strength', 'ShaderPass'],
  docs: ['repo/README.md', 'repo/src/materials/MaskMaterial.js', 'repo/src/enums/MaskFunction.js', 'repo/src/enums/ColorChannel.js', 'repo/src/materials/glsl/mask.frag', 'repo/src/passes/ShaderPass.js', 'repo/src/passes/CopyPass.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
