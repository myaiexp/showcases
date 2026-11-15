// postprocessing example: fading a LUT in with BlendFunction.NORMAL and blendMode.opacity
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'LUT strength',
  summary:
    'LUT3DEffect defaults to BlendFunction.SRC, which ignores opacity. Passing BlendFunction.NORMAL as blendFunction makes blendMode.opacity a strength slider between the original colours and the graded ones.',
  section: 'Color Grading',
  tags: ['LUT3DEffect', 'BlendFunction', 'blendFunction', 'blendMode', 'opacity'],
  docs: ['repo/README.md', 'repo/src/effects/LUT3DEffect.js', 'repo/src/textures/lut/LookupTexture.js', 'repo/src/enums/BlendFunction.js', 'repo/src/effects/blending/BlendMode.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
