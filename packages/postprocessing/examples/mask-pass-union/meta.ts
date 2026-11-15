// postprocessing example: combining two stencil masks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'MaskPass: union of two masks',
  summary:
    'Two MaskPasses each draw one shape into the stencil, a sphere and a box. When the second pass has its clearPass disabled, the stencil keeps the first shape and the pixelation covers both; with it enabled, only the box survives.',
  section: 'Passes',
  tags: ['MaskPass', 'clearPass', 'ClearMaskPass', 'stencilBuffer', 'PixelationEffect'],
  docs: ['repo/README.md', 'repo/src/passes/CopyPass.js', 'repo/src/passes/MaskPass.js', 'repo/src/passes/ClearMaskPass.js', 'repo/src/passes/ClearPass.js', 'repo/src/effects/PixelationEffect.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
