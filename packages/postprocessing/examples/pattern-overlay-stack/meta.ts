// postprocessing example: scanlines and a grid blended together into a monitor look
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Patterns blended together',
  summary:
    'A ScanlineEffect and a GridEffect share one EffectPass and are both blended over the scene. The select changes the blendFunction of both patterns (OVERLAY, MULTIPLY, SOFT_LIGHT, SCREEN, DIFFERENCE), so the same lines and grid read very differently.',
  section: 'Pattern',
  tags: ['ScanlineEffect', 'GridEffect', 'BlendFunction', 'blendFunction', 'EffectPass'],
  docs: ['repo/README.md', 'repo/src/effects/ScanlineEffect.js', 'repo/src/effects/GridEffect.js', 'repo/src/enums/BlendFunction.js', 'repo/src/passes/EffectPass.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
