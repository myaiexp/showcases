// postprocessing example: MaskPass and ClearMaskPass stencil masking
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'MaskPass and ClearMaskPass',
  summary:
    'A MaskPass renders a sphere into the stencil buffer, so the PixelationEffect after it only touches pixels inside the sphere; a ClearMaskPass ends the masked section. Needs a stencil buffer on both the renderer and the composer; inverted flips the mask.',
  section: 'Passes',
  tags: ['MaskPass', 'ClearMaskPass', 'inverted', 'stencilBuffer', 'PixelationEffect', 'EffectComposer', 'CopyPass'],
  docs: ['repo/README.md', 'repo/src/passes/MaskPass.js', 'repo/src/passes/ClearMaskPass.js', 'repo/src/core/EffectComposer.js', 'repo/src/effects/PixelationEffect.js', 'repo/src/passes/CopyPass.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
