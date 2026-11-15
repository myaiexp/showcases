// postprocessing example: TiltShiftBlurPass as a pass
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'TiltShiftBlurPass as a pass',
  summary:
    'The pass behind TiltShiftEffect, added to the composer by itself with the same offset, rotation, focusArea and feather options. It writes the finished frame, so no EffectPass is needed.',
  section: 'Blur',
  tags: ['TiltShiftBlurPass', 'offset', 'rotation', 'focusArea', 'feather'],
  docs: ['repo/README.md', 'repo/src/passes/TiltShiftBlurPass.js', 'repo/src/materials/TiltShiftBlurMaterial.js', 'repo/src/passes/KawaseBlurPass.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
